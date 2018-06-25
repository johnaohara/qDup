package perf.qdup.console;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import org.jboss.resteasy.plugins.server.vertx.VertxRequestHandler;
import org.jboss.resteasy.plugins.server.vertx.VertxResteasyDeployment;

public class JsonVerticle extends AbstractVerticle {
    private static final int port = 31338;

    @Override
    public void start(Future<Void> future) {
        VertxResteasyDeployment deployment = new VertxResteasyDeployment();
        deployment.start();
        deployment.getRegistry().addPerInstanceResource(StatsEndpoint.class);

        // Start the front end server using the Jax-RS controller
        vertx.createHttpServer()
                .requestHandler(new VertxRequestHandler(vertx, deployment))
                .listen(this.port, ar -> {
                    if ( ar.failed()) {
                        future.fail(ar.cause());
                    }
                    else {
                        System.out.println("REST server started on port " + ar.result().actualPort());
                    }
                });

    }
}
