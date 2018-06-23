package perf.qdup.console;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Vertx;
import org.jboss.resteasy.plugins.server.vertx.VertxRequestHandler;
import org.jboss.resteasy.plugins.server.vertx.VertxResteasyDeployment;
import perf.qdup.Coordinator;
import perf.qdup.Run;
import perf.qdup.cmd.CommandDispatcher;

public class WebConsole extends AbstractVerticle {


    public static final int WEB_CONSOLE_PORT = 31338;
    private int port;
    public static Run run;
    public static CommandDispatcher dispatcher;
    public static Coordinator coordinator;
    private final Vertx vertx = Vertx.vertx();


    public WebConsole(Run run, CommandDispatcher dispatcher, Coordinator coordinator){
        this(run,dispatcher,coordinator,WEB_CONSOLE_PORT);
    }
    public WebConsole(Run run, CommandDispatcher dispatcher,Coordinator coordinator,int port){
        this.run = run;
        this.dispatcher = dispatcher;
        this.coordinator = coordinator;
        this.port = port;
    }


    @Override
    public void start() throws Exception {

        VertxResteasyDeployment deployment = new VertxResteasyDeployment();
        deployment.start();
        deployment.getRegistry().addPerInstanceResource(StatsEndpoint.class);

        // Start the front end server using the Jax-RS controller
        vertx.createHttpServer()
                .requestHandler(new VertxRequestHandler(vertx, deployment))
                .listen(this.port, ar -> {
                    if ( ar.cause() != null) {
                        ar.cause().printStackTrace();
                        vertx.close();
                    }
                    else {
                        System.out.println("Server started on port " + ar.result().actualPort());
                    }
                });

    }

    public void stop(){
        if(vertx!=null){
            vertx.close();
        }
    }
}
