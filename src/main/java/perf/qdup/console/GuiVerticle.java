package perf.qdup.console;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.HttpServerOptions;
import io.vertx.core.net.PemKeyCertOptions;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.StaticHandler;

public class GuiVerticle extends AbstractVerticle {

    private static final int port = 31339;
    private String host = "localhost";
    private HttpServer httpServer;

    @Override
    public void start(Future<Void> future) {

        httpServer = vertx.createHttpServer(createOptions(false));
        httpServer.requestHandler(createRouter()::accept);
        httpServer.listen(port, res2 -> {
            if (res2.failed()) {
                if (!(res2.cause() instanceof IllegalStateException)) {
                    future.fail(res2.cause());
                }
                // else do nothing, netty executor was not in state to accept tasks
            } else {
                future.complete();
                System.out.println("web gui listening on: http://" + host + ":" + res2.result().actualPort() + "/");
            }
        });
    }

    @Override
    public void stop(Future<Void> future) {
        httpServer.close(future.completer());
    }

    private HttpServerOptions createOptions(boolean http2) {
        HttpServerOptions serverOptions = new HttpServerOptions()
                .setPort(port)
                .setHost(host);
        if (http2) {
            serverOptions.setSsl(true)
                    .setKeyCertOptions(new PemKeyCertOptions().setCertPath("tls/server-cert.pem").setKeyPath("tls/server-key.pem"))
                    .setUseAlpn(true);
        }
        return serverOptions;
    }

    private Router createRouter() {
        Router router = Router.router(vertx);
        router.get("/*").handler(StaticHandler.create().setWebRoot("webroot/public"));
        return router;
    }
}
