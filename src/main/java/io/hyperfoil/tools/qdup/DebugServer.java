package io.hyperfoil.tools.qdup;

import io.hyperfoil.tools.qdup.cmd.Cmd;
import io.hyperfoil.tools.qdup.cmd.Context;
import io.hyperfoil.tools.qdup.cmd.ContextObserver;
import io.hyperfoil.tools.qdup.cmd.Dispatcher;
import io.hyperfoil.tools.yaup.json.Json;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServer;
import io.vertx.ext.bridge.PermittedOptions;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.sockjs.BridgeOptions;
import io.vertx.ext.web.handler.sockjs.SockJSHandler;
import org.slf4j.ext.XLogger;
import org.slf4j.ext.XLoggerFactory;

import java.io.IOException;
import java.lang.invoke.MethodHandles;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.Phaser;
import java.util.stream.Collectors;

public class DebugServer implements RunObserver, ContextObserver {

    final static XLogger logger = XLoggerFactory.getXLogger(MethodHandles.lookup().lookupClass());

    public static int DEFAULT_PORT = 21337;

    private final int port;
    private Run run;
    private final Vertx vertx;
    private HttpServer server;
    private Dispatcher dispatcher;
    private Coordinator coordinator;

    private final Phaser resumePhaser = new Phaser(1);

    private List<Integer> breakpoints = new ArrayList<>();

    public DebugServer(Run run){
        this(run,DEFAULT_PORT);
    }
    public DebugServer(Run run, int port){
        this.port = port;
        this.vertx = Vertx.vertx();
        setRun(run);
    }
    public void setRun(Run run){
        if(run!=null) {
            this.run = run;
            this.dispatcher = run.getDispatcher();
            this.coordinator = run.getCoordinator();
            this.run.addRunObserver(this);
            this.dispatcher.addContextObserver(this);
        }
    }

    private String filter(Object o){
       if(o!=null && run!=null){
          String rtrn = run.getConfig().getState().getSecretFilter().filter(o.toString());
          return rtrn;
       }
       return "";
    }

    @Override
    public void preStart(Context context, Cmd command){
        if(breakpoints.size() > 0) {
            Optional<Integer> optionalBreakpoint = breakpoints.stream().filter(line -> line.equals(command.getSourceLineNumber())).findFirst();
            if(optionalBreakpoint.isPresent()){ //breakpoint is set
                resumePhaser.register();
                logger.info("Breakpoint hit on line: " + optionalBreakpoint.get());
                resumePhaser.arriveAndAwaitAdvance();
                resumePhaser.arriveAndDeregister();
            }
        }
    }
    @Override
    public void preStop(Context context,Cmd command,String output){
        System.out.println("preStop: " + command.getClass().getName());
    }
    @Override
    public void preStage(Stage stage){
        System.out.println("preStage: " + stage.getClass().getName());
    }
    @Override
    public void postStage(Stage stage){
        System.out.println("postStage: " + stage.getClass().getName());
    }

    public int getPort(int startingPort){
       int currentPort = startingPort > 0 && startingPort < 65535 ? startingPort : 31337;
       boolean available = true;
       do {
          try (ServerSocket ss = new ServerSocket(currentPort) ; DatagramSocket ds = new DatagramSocket(currentPort)){
             ss.setReuseAddress(true);
             ds.setReuseAddress(true);
             available = true;
          } catch (IOException e) {
             available = false;
             currentPort++;
          }
       }while (!available && currentPort < 65535);
       return currentPort;
    }

    public void start(){

        server = vertx.createHttpServer();

        Router router = Router.router(vertx);
        router.route().handler(BodyHandler.create());
        router.route("/").produces("application/json").handler(rc->{
            Json rtrn = new Json();
            rtrn.set("GET /breakpoints","current set breakpoints");
            rtrn.set("DEL /breakpoints","delete all breakpoints");
            rtrn.set("GET /start","start run with debug enabled");
            rtrn.set("GET /resume","resume run after breakpoint has been hit");
            rtrn.set("POST /breakpoint/:line","set breakpoint by line number");
            rtrn.set("DEL /breakpoint/:line","delete breakpoint by line number");
//            rtrn.set("GET /state/:stateVariable","get value of stateVariable");
//            rtrn.set("GET /expression/:expression","evaluate state expression");

            rc.response().end(rtrn.toString(2));
        });
        router.route("/breakpoints").produces("application/json").handler(rc->{
            Json rtrn = new Json();
            if(this.run!=null){
                rtrn.set("breakpoints", breakpoints.stream().collect(Collectors.toList()));
            }
            rc.response().end(rtrn.toString(2));
        });
        router.delete("/breakpoints").produces("application/json").handler(rc->{
            Json rtrn = new Json();
            if(this.run!=null){
                breakpoints.clear();
                rtrn.set("result","OK");
            }
            rc.response().end(rtrn.toString(2));
        });
        router.route("/start").produces("application/json").handler(rc->{
            Json rtrn = new Json();
            if(this.run!=null){
                this.run.startDebugRun();
                rtrn.set("result","OK");
            }
            rc.response().end(rtrn.toString(2));
        });
        router.route("/resume").produces("application/json").handler(rc->{
            Json rtrn = new Json();
            if(this.run!=null){
                resumePhaser.arriveAndAwaitAdvance();
                rtrn.set("result","OK");
            }
            rc.response().end(rtrn.toString(2));
        });
        router.post("/breakpoint/:line").handler(rc->{

            String lineNumber = rc.request().getParam("line");

            if(lineNumber != null) {
                logger.info("Setting debug breakpoint at line: " + lineNumber);
                breakpoints.add(Integer.parseInt(lineNumber));
                rc.response().end("ok");
            } else {
                rc.response().setStatusCode(400).end("missing line number");
            }

        });
        router.delete("/breakpoint/:line").handler(rc->{

            String lineNumber = rc.request().getParam("line");

            if(lineNumber != null) {
                logger.info("Setting debug breakpoint at line: " + lineNumber);
                List<Integer> clearBreakpoints = breakpoints.stream().filter(line -> line.equals(Integer.parseInt(lineNumber))).collect(Collectors.toList());
                breakpoints.retainAll(clearBreakpoints);
                rc.response().end("ok");
            } else {
                rc.response().setStatusCode(400).end("missing line number");
            }

        });
        int foundPort = getPort(port);
        try {
            logger.info("listening at {}:{}", InetAddress.getLocalHost().getHostName()
                    ,foundPort);
        } catch (UnknownHostException e) {
            logger.info("listening at localhost:{}", foundPort);
        }

        server.requestHandler(router::accept).listen(foundPort/*, InetAddress.getLocalHost().getHostName()*/);

    }

    public void stop(){
        if(server!=null){
            server.close();
        }
        vertx.close();
    }



}
