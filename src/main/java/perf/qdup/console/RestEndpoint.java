package perf.qdup.console;

import perf.yaup.StringUtil;
import perf.yaup.json.Json;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;


@Path("/")
public class RestEndpoint {

    @GET
    @Path("/active")
    @Produces("application/json")
    public Response activeCommand() {
        return Response.status(200).entity(WebConsole.dispatcher.getActiveJson().toString(2)).build();
    }

    @GET
    @Path("/latches")
    @Produces("application/json")
    public Response latches() {
        Json json = new Json();
        long now = System.currentTimeMillis();
        WebConsole.coordinator.getLatchTimes().forEach((key,value)-> json.set(key,StringUtil.durationToString(now-((Long)value))));
        return Response.status(200).entity(json.toString(2)).build();
    }

    @GET
    @Path("/counters")
    @Produces("application/json")
    public Response counters() {
        Json json = new Json();
        WebConsole.coordinator.getCounters().forEach((key,value)->json.set(key,value));
        return Response.status(200).entity(json.toString(2)).build();
    }

    @GET
    @Path("/pendingDownloads")
    @Produces("application/json")
    public Response pendingDownloads() {
        Json json = WebConsole.run.pendingDownloadJson();
        return Response.status(200).entity(json.toString(2)).build();
    }

}
