package io.hyperfoil.tools.qdup;

import io.hyperfoil.tools.qdup.config.log4j.QdupConfigurationFactory;
import org.apache.logging.log4j.core.config.ConfigurationFactory;

public class QDupWrapper {

    private static QDup qDup;

    public static void main(String[] args) {
        ConfigurationFactory.setConfigurationFactory(new QdupConfigurationFactory());
        //pick reasonable defaults

        //configure logging

        //enable extensions on classpath

        qDup = new QDup(args);
        boolean ok = qDup.run();
        if(!ok){
            System.exit(1);
        } else {
            //validate output

            //move output to current dir
        }
    }

}
