package perf.qdup.console;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import org.jboss.resteasy.plugins.interceptors.CorsFilter;
import org.jboss.resteasy.plugins.server.vertx.VertxRequestHandler;
import org.jboss.resteasy.plugins.server.vertx.VertxResteasyDeployment;

public class JsonVerticle extends AbstractVerticle {
    private static final int port = 31337;

    @Override
    public void start(Future<Void> future) {

        CorsFilter corsFilter = new CorsFilter();
        corsFilter.setAllowedMethods("GET, POST, PUT, DELETE, OPTIONS");
        corsFilter.getAllowedOrigins().add("*");

        VertxResteasyDeployment deployment = new VertxResteasyDeployment();
        deployment.start();
        deployment.getRegistry().addPerInstanceResource(RestEndpoint.class);
        deployment.getProviderFactory().register(corsFilter);

        // Start the front end server using the Jax-RS controller
        vertx.createHttpServer()
                .requestHandler(new VertxRequestHandler(vertx, deployment))
                .listen(this.port, ar -> {
                    if ( ar.failed()) {
                        if (!(ar.cause() instanceof IllegalStateException)) {
                            future.fail(ar.cause());
                        }
                        // else do nothing, netty executor was not in state to accept tasks
                    }
                    else {
                        System.out.println("REST server started on port " + ar.result().actualPort());
                    }
                });

    }
}
