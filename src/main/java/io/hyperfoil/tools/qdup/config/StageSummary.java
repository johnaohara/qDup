package io.hyperfoil.tools.qdup.config;

import io.hyperfoil.tools.qdup.cmd.CommandSummary;
import io.hyperfoil.tools.yaup.Counters;

import java.util.*;
import java.util.function.BiConsumer;

/**
 * @arthur wreicher
 * Stores the results of validating the RunConfig
 */
public class StageSummary {

    private List<String> errors;
    private Counters<String> signalCounters;
    private HashSet<String> waiters;
    private HashSet<String> signals;

    public StageSummary(){
        errors = new LinkedList<>();
        signalCounters = new Counters<>();
        waiters = new HashSet<>();
        signals = new HashSet<>();
    }

    public void add(CommandSummary summary){
        summary.getWarnings().forEach(this::addError);
        summary.getSignals().forEach(this::addSignal);
        summary.getWaits().forEach(this::addWait);
    }

    protected void addError(String message){
        errors.add(message);
    }

    public List<String> getErrors(){
        return Collections.unmodifiableList(errors);
    }
    public boolean hasErrors(){return !errors.isEmpty();}

    protected void addSignal(String name,long amount){
        signalCounters.add(name,amount);
        signals.add(name);
    }
    public Set<String> getSignals(){
        return Collections.unmodifiableSet(signals);
    }
    public long getSignalCount(String name){
        return signalCounters.count(name);
    }

    protected void addWait(String name){
        waiters.add(name);
    }
    public Set<String> getWaiters(){
        return Collections.unmodifiableSet(waiters);
    }

    public void forEach(BiConsumer<String,Long> consumer){
        signalCounters.entries().forEach(name->consumer.accept(name,signalCounters.count(name)));
    }
}