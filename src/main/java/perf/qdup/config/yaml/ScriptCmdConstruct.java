package perf.qdup.config.yaml;

import org.yaml.snakeyaml.error.YAMLException;
import org.yaml.snakeyaml.nodes.MappingNode;
import org.yaml.snakeyaml.nodes.Node;
import org.yaml.snakeyaml.nodes.NodeTuple;
import org.yaml.snakeyaml.nodes.ScalarNode;
import perf.qdup.cmd.impl.ScriptCmd;
import perf.yaup.Sets;

import java.util.Set;

import static perf.yaup.yaml.OverloadConstructor.keys;

public class ScriptCmdConstruct extends CmdConstruct {

    public static CmdEncoder<ScriptCmd> ENCODER = (scriptCmd)->{
        return scriptCmd.getName();
    };

    public ScriptCmdConstruct(){
        super("",null,null);
    }

    @Override
    public void validate(){}

    @Override
    public Object construct(Node node) {
        ScriptCmd rtrn = null;
        if(node instanceof ScalarNode){
            rtrn = new ScriptCmd(((ScalarNode)node).getValue());
        }else if (node instanceof MappingNode){
            MappingNode scriptMapping = (MappingNode)node;
            Set<String> keys = keys(scriptMapping);
            Set<String> nonCmdKeys = Sets.unique(keys,CmdMapping.COMMAND_KEYS);
            if(nonCmdKeys.size()==1){
                setTag(nonCmdKeys.iterator().next());
                rtrn = new ScriptCmd(getTag());
                populate(rtrn,scriptMapping);//will load any peer keys, what about child keys?
            }else{
                throw new YAMLException("cannot create scripCmd, too many unknown keys "+nonCmdKeys+scriptMapping.getStartMark());
            }
            NodeTuple tagTuple = scriptMapping.getValue().stream().filter(tuple->tuple.getKeyNode() instanceof ScalarNode && getTag().equalsIgnoreCase(((ScalarNode)tuple.getKeyNode()).getValue())).findFirst().orElse(null);
            if(tagTuple!=null){
                if(tagTuple.getValueNode() instanceof MappingNode){
                    populate(rtrn,(MappingNode)tagTuple.getValueNode());
                }else if(tagTuple.getValueNode() instanceof ScalarNode && ((ScalarNode)tagTuple.getValueNode()).getValue().trim().isEmpty()){
                    //not a problem
                }else {
                    throw new YAMLException("unexpected script settings value"+scriptMapping.getValue().get(0).getValueNode().getStartMark());
                }
            }
        }else{
            throw new YAMLException("script must be the name of script or a mapping of script name to script settings"+node.getStartMark());
        }
        return rtrn;
    }
}
