package perf.qdup.cmd.impl;

import perf.qdup.cmd.Cmd;
import perf.qdup.cmd.Context;

public class ReadState extends Cmd {

    private String key;
    private String populatedKey;
    public ReadState(String key){
        this.key = key;
    }

    public String getKey(){return key;}

    @Override
    public String toString(){
        return "read-state: "+key;
    }

    @Override
    public void run(String input, Context context) {
        //use getStateValue in case it is in WITH or contest
        Object value = Cmd.getStateValue(key, this, context.getState(), null);
        populatedKey = value == null ? "" : value.toString();
        if(populatedKey == null || populatedKey.isEmpty()){
            context.skip(input);
        }else{
            context.next(populatedKey);
        }
    }

    @Override
    public Cmd copy() {
        return new ReadState(key);
    }

    @Override
    public String getLogOutput(String output,Context context){
        return "read-state: "+ populatedKey == null ? key : populatedKey;
    }
}
