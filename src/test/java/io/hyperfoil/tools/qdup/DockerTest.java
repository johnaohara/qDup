package io.hyperfoil.tools.qdup;

import io.hyperfoil.tools.qdup.cmd.*;
import io.hyperfoil.tools.qdup.config.ContainerConfiguration;
import io.hyperfoil.tools.qdup.config.RunConfig;
import io.hyperfoil.tools.qdup.config.RunConfigBuilder;
import io.hyperfoil.tools.qdup.config.yaml.Parser;
import org.junit.Test;

import java.util.HashMap;
import java.util.stream.Collectors;

import static org.junit.Assert.*;


public class DockerTest extends SshTestBase {

    @Test
    public void run_script_in_docker() {

        Script runScript = new Script("localScript")
                .then(Cmd.sh("pwd"))
                .then(Cmd.sh("uname -a"))
                .then(Cmd.sh("cat /etc/lsb-release"));

        RunConfigBuilder builder = getBuilder();
        builder.addHostAlias("local", getHost().toString());
        builder.addScript(runScript);
        builder.addHostToRole("role", "local");
        builder.addContainerConfigToRole("role", new ContainerConfiguration("ubuntu:16.04", "roleContainer"));
        builder.addRoleRun("role", "localScript", new HashMap<>());

        RunConfig config = builder.buildConfig();
        Dispatcher dispatcher = new Dispatcher();
        Run doit = new Run(tmpDir.toString(), config, dispatcher);

        doit.run();

    }

    @Test
    public void run_yaml_in_docker() {
        Parser parser = Parser.getInstance();
        RunConfigBuilder builder = getBuilder();
        builder.loadYaml(parser.loadFile("pwd", stream("" +
                        "scripts:",
                "  foo:",
                "    - sh: echo \"pwd is $(pwd)\"",
                "    - echo:",
                "hosts:",
                "  local: " + getHost(),
                "roles:",
                "  doit:",
                "    hosts: [local]",
                "    container:",
                "      - image: \"ubuntu:16.04\"",
                "      - name: doItContainer",
                "    run-scripts: [foo]"
        ), false));
        RunConfig config = builder.buildConfig();
        assertFalse("runConfig errors:\n" + config.getErrors().stream().collect(Collectors.joining("\n")), config.hasErrors());
        Dispatcher dispatcher = new Dispatcher();
        Run doit = new Run(tmpDir.toString(), config, dispatcher);

        doit.run();
    }


}
