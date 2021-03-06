package io.hyperfoil.tools.qdup.cmd;

import io.hyperfoil.tools.qdup.Run;
import io.hyperfoil.tools.qdup.SshTestBase;
import io.hyperfoil.tools.qdup.State;
import io.hyperfoil.tools.qdup.config.RunConfig;
import io.hyperfoil.tools.qdup.config.RunConfigBuilder;
import io.hyperfoil.tools.qdup.config.yaml.Parser;
import org.junit.Test;

import java.util.stream.Collectors;

import static org.junit.Assert.*;

/**
 * Test for the Dispatcher nanny task
 */
public class NannyTest extends SshTestBase {



   @Test(timeout = 120_000)//2 minutes
   public void idle_wait_for(){
      Parser parser = Parser.getInstance();
      RunConfigBuilder builder = getBuilder();
      builder.loadYaml(parser.loadFile("pwd", stream("" +
         "scripts:",
         "  foo:",
         "    - sh: echo \"pwd is $(pwd)\"",
         "      watch:",
         "      - regex: \"missingValue\"",
         "        then:",
         "        - signal: MISSING",
         "    - set-state: RUN.done true",
         "  bar:",
         "    - wait-for: MISSING",
         "    - set-state: RUN.never true",
         "hosts:",
         "  local: " + getHost(),
         "roles:",
         "  doit:",
         "    hosts: [local]",
         "    run-scripts:",
         "    - foo:",
         "    - bar:"
      )));
      RunConfig config = builder.buildConfig(parser);
      assertFalse("runConfig errors:\n" + config.getErrorStrings().stream().collect(Collectors.joining("\n")), config.hasErrors());
      Dispatcher dispatcher = new Dispatcher();
      Run doit = new Run(tmpDir.toString(), config, dispatcher);

      doit.run();

      State state = config.getState();

      assertTrue("state should have done",state.has("done"));
      assertFalse("state should not have never",state.has("never"));
   }

   @Test(timeout = 120_000)//2 minutes
   public void idle_repeat_until(){
      Parser parser = Parser.getInstance();
      RunConfigBuilder builder = getBuilder();
      builder.loadYaml(parser.loadFile("pwd", stream(
         "" +
         "scripts:",
         "  foo:",
         "    - sh: echo \"pwd is $(pwd)\"",
         "      watch:",
         "      - regex: \"missingValue\"",
         "        then:",
         "        - signal: MISSING",
         "    - set-state: RUN.done true",
         "  bar:",
         "    - repeat-until: MISSING",
         "      then:",
         "      - set-state: RUN.count ${{= 1 + ${{RUN.count:0}} }}",
         "      - sleep: 10s",
         "    - set-state: RUN.never true",
         "hosts:",
         "  local: " + getHost(),
         "roles:",
         "  doit:",
         "    hosts: [local]",
         "    run-scripts:",
         "    - foo:",
         "    - bar:"
      )));
      RunConfig config = builder.buildConfig(parser);
      assertFalse("runConfig errors:\n" + config.getErrorStrings().stream().collect(Collectors.joining("\n")), config.hasErrors());
      Dispatcher dispatcher = new Dispatcher();
      Run doit = new Run(tmpDir.toString(), config, dispatcher);

      doit.run();

      State state = config.getState();

      assertTrue("state should have done",state.has("done"));
      assertFalse("state should not have never",state.has("never"));
   }
   @Test(timeout = 120_000)//2 minutes
   public void self_finishing_repeat_until(){
      Parser parser = Parser.getInstance();
      RunConfigBuilder builder = getBuilder();
      builder.loadYaml(parser.loadFile("pwd", stream(
         "" +
            "scripts:",
         "  foo:",
         "    - sh: echo \"pwd is $(pwd)\"",
         "      watch:",
         "      - regex: \"missingValue\"",
         "        then:",
         "        - signal: MISSING",
         "    - set-state: RUN.done true",
         "  bar:",
         "    - repeat-until: NOT_MISSING",
         "      then:",
         "      - set-state: RUN.count ${{= 1 + ${{RUN.count:0}} }}",
         "      - read-state: ${{RUN.count}}",
         "      - regex: 4",
         "        then:",
         "        - signal: NOT_MISSING",
         "      - sleep: 10s",
         "    - set-state: RUN.reached true",
         "hosts:",
         "  local: " + getHost(),
         "roles:",
         "  doit:",
         "    hosts: [local]",
         "    run-scripts:",
         "    - foo:",
         "    - bar:"
      )));
      RunConfig config = builder.buildConfig(parser);
      assertFalse("runConfig errors:\n" + config.getErrorStrings().stream().collect(Collectors.joining("\n")), config.hasErrors());
      Dispatcher dispatcher = new Dispatcher();
      Run doit = new Run(tmpDir.toString(), config, dispatcher);

      doit.run();

      State state = config.getState();

      assertTrue("state should have done",state.has("done"));
      assertTrue("state should have reached",state.has("reached"));
      assertTrue("state should have count",state.has("count"));
      assertEquals("count should be 4",4,Integer.parseInt(state.get("count").toString()));
   }
}
