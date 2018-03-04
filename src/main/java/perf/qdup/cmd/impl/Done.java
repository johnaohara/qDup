package perf.qdup.cmd.impl;

import perf.qdup.cmd.Cmd;
import perf.qdup.cmd.CommandResult;
import perf.qdup.cmd.Context;

public class Done extends Cmd {
    @Override
    protected void run(String input, Context context, CommandResult result) {
        context.getRunLogger().info("done");
        context.done();
    }

    @Override
    protected Cmd clone() {
        return new Done();
    }
}