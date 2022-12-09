package io.hyperfoil.tools.qdup.cmd.impl;

import io.hyperfoil.tools.qdup.Host;
import io.hyperfoil.tools.qdup.Run;
import io.hyperfoil.tools.qdup.SshTestBase;
import io.hyperfoil.tools.qdup.State;
import io.hyperfoil.tools.qdup.cmd.Dispatcher;
import io.hyperfoil.tools.qdup.cmd.SpyContext;
import io.hyperfoil.tools.qdup.config.RunConfig;
import io.hyperfoil.tools.qdup.config.RunConfigBuilder;
import io.hyperfoil.tools.qdup.config.yaml.Parser;
import io.hyperfoil.tools.yaup.json.Json;
import org.junit.Test;

import static org.junit.Assert.*;

public class GitBisectTest extends SshTestBase {

    @Test
    public void git_init_repo() {

        final String repoURL = "https://github.com/Hyperfoil/qDup.git"; //TODO:: this should  not be ephemeral
        final String goodCommitHash = "e92a5f8a1a319959b8d19a28cfede58ccd45f325";
        final String badCommitHash = "d73b5a510531bf2bf2de3594d5d4a252ee826356";


        GitBisect.GitBisectInitCmd gitBisectInit = new GitBisect.GitBisectInitCmd(repoURL, goodCommitHash, badCommitHash);

        SpyContext context = new SpyContext();

        gitBisectInit.run(null, context);

        assertNull(context.getNext());
    }

    @Test
    public void git_bisect_init() {
        Parser parser = Parser.getInstance();
        RunConfigBuilder builder = getBuilder();

        Host host = getHost();

        builder.loadYaml(parser.loadFile("", stream("" +
                        "scripts:",
                "  init-git-bisect:",
                "  - git-bisect-init:",
                "      remote-repo: ${{INPUT.project.repoUrl}}",
                "      bad-commit-hash: ${{INPUT.project.badCommitHash}}",
                "      good-commit-hash: ${{INPUT.project.goodCommitHash}}",
                "",
                "  run-git-bisect:",
                "  - log: starting test",
                "  - set-signal: BISECT_DONE 1",
                "  - repeat-until: BISECT_DONE",
                "    then: ",
                "    - git-bisect:",
                "      with:",
                "        completeSignal: BISECT_DONE",
                "    - json: $.commitHash",
                "    - set-state: RUN.commitHash",
                "    - log: run test with ${{RUN.commitHash}}",
                "    - qdup-process:",
                "        scriptUrl: ${{INPUT.qDup.scriptFile}}",
                "        commitParam: ${{INPUT.qDup.commitParam}}",
                "        commitValue: ${{RUN.commitHash}}",
                "    - scalar-file-limit-validator:",
                "        filename: localhost/result.out",
                "        limit: 12",
                "    - git-bisect-update",
                "  - log: bad commit - ${{gitBisect.badCommit:}}",
                "  - set-state: RUN.output.bad-commit ${{gitBisect.badCommit:}}",
                "  - sh: echo '${{RUN.output:}}' > result.json",
                "  - queue-download: result.json",
                "hosts:",
                "  local: " + host,
                "roles:",
                "  perf-bisect:",
                "    hosts: [local]",
                "    setup-scripts: [init-git-bisect]",
                "    run-scripts: [run-git-bisect]",
                "states:",
//                TODO: define schema for input states
                "  INPUT: { ",
                "  \"project\": {",
                "    \"repoUrl\": \"https://github.com/johnaohara/demo-repo.git\",",
                "    \"badCommitHash\": \"ae9bc2cb4984e0865b649b8b19743eee05451acf\",",
                "    \"goodCommitHash\": \"c15c9c6378ecd82b3b0df0334ef1941cbb6a2fe1\"",
                "  },",
//                  TODO:define validator and configuration
//                        "  \"validator\": {",
//                        "    \"ScalarFileLimitValidator\": {",
//                        "      \"filePath\": \"localhost/result.out\",",
//                        "      \"limit\": \"12\"",
//                        "    }",
//                        "  },",
                "  \"qDup\": {",
                "    \"scriptFile\": \"https://raw.githubusercontent.com/johnaohara/perf-bisect-qDup-scripts/main/test-script.yaml\",",
                "    \"commitParam\": \"WORKLOAD_COMMIT\",",
//                  TODO:define param-override's
//                        "    \"param-override\": [",
//                        "      \"HOST\": \"localhost\",",
//                        "      \"USER\": \"johara\"",
//                        "    ]",
                "  }",
                "}"
        )));

        RunConfig config = builder.buildConfig(parser);
        Dispatcher dispatcher = new Dispatcher();

        Run doit = new Run(tmpDir.toString(), config, dispatcher);
        doit.run();
        dispatcher.shutdown();

        State state = config.getState();

        assertTrue(state.has("output"));

        Json output = ((Json) state.get("output"));
        assertTrue(output.has("bad-commit"));
        assertEquals("d4b9d6a49972817b4acd8dfce00872aafe1721e3", output.getString("bad-commit"));
//        assertTrue("state should have results\n"+state.tree(), state.has("results"));

    }
}
