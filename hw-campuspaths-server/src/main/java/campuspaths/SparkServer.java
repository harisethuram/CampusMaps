/*
 * Copyright (C) 2023 Hal Perkins.  All rights reserved.  Permission is
 * hereby granted to students registered for University of Washington
 * CSE 331 for use solely during Winter Quarter 2023 for purposes of
 * the course.  No other use, copying, distribution, or modification
 * is permitted without prior written consent. Copyrights for
 * third-party components of this work must be honored.  Instructors
 * interested in reusing these course materials should contact the
 * author.
 */

package campuspaths;

import campuspaths.utils.CORSFilter;
import com.google.gson.Gson;
import pathfinder.CampusMap;
import pathfinder.ModelAPI;
import pathfinder.datastructures.*;
//import pathfinder.datastructures.Point;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;


import java.util.Set;
import java.util.TreeSet;

public class SparkServer {

    public static void main(String[] args) {
        CORSFilter corsFilter = new CORSFilter();
        corsFilter.apply();
        ModelAPI c = new CampusMap();
        // The above two lines help set up some settings that allow the
        // React application to make requests to the Spark server, even though it
        // comes from a different server.
        // You should leave these two lines at the very beginning of main().

        // Route to get the shortest path
        Spark.get("/find-path", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                String start = request.queryParams("start");
                String end = request.queryParams("end");
                if (start == null || end == null) {
                    System.out.println("ye");
                    throw new IllegalStateException("ye");
                }
                //Path<Point> p = new Path<>(new Point(0,0));
                try {
                    Path<Point> p = c.findShortestPath(start, end);
                    Gson g = new Gson();
                    return g.toJson(p);
                } catch (IllegalArgumentException e) {
                    Spark.halt(400, "start and end must be valid locations");
                    return null;
                }
            }
        });

        // Route to get the locations for the drop down
        Spark.get("/locations", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                String loc = request.queryParams("loc");
                if (loc.length() == 0)
                    return (new Gson()).toJson(c.buildingNames().keySet());
                Set<String> locNames = new TreeSet<>();
                for (String s : c.buildingNames().keySet()) {
                    if (hasString(loc, s))
                        locNames.add(s);
                }
                Gson g = new Gson();
                return g.toJson(locNames);
            }

            // check if s2 starts with s1
            private boolean hasString (String s1, String s2) {
                if (s1.length() > s2.length())
                    return false;
                for (int i = 0; i < s1.length(); i++) {
                    if (s1.toUpperCase().charAt(i) != s2.toUpperCase().charAt(i))
                        return false;
                }
                return true;
            }
        });
    }

}
