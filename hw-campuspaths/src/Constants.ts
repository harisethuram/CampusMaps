/*
 * Copyright (C) 2022 Kevin Zatloukal and James Wilcox.  All rights reserved.  Permission is
 * hereby granted to students registered for University of Washington
 * CSE 331 for use solely during Autumn Quarter 2022 for purposes of
 * the course.  No other use, copying, distribution, or modification
 * is permitted without prior written consent. Copyrights for
 * third-party components of this work must be honored.  Instructors
 * interested in reusing these course materials should contact the
 * author.
 */

// Latitude of the UW Seattle campus
import exp from "constants";

export const UW_LATITUDE : number = 47.65878405511131;

// Offset to translate coordinate system
export const UW_LATITUDE_OFFSET : number = 807.35188;

// Scale to translate coordinate system
export const UW_LATITUDE_SCALE : number = -0.00000576766;

// Longitude of the UW Seattle campus
export const UW_LONGITUDE : number = -122.31305164734569;

// Offset to translate coordinate system
export const UW_LONGITUDE_OFFSET : number = 1370.6408;

// Scale to translate coordinate system
export const UW_LONGITUDE_SCALE : number = 0.00000848028;

// Map center
export const UW_LATITUDE_CENTER = 47.65440627742146;

// Map center
export const UW_LONGITUDE_CENTER = -122.30476957834502;

// List of all locations
export const LOCS = ['BAG', 'BAG (NE)', 'BGR', 'CHL', 'CHL (NE)', 'CHL (SE)', 'CMU', 'CS2', 'CSE',
    'DEN', 'EEB', 'EEB (S)', 'FSH', 'GWN', 'HUB', 'HUB (South Food)', 'HUB (West Food)', 'IMA', 'KNE',
    'KNE (E)', 'KNE (S)', 'KNE (SE)', 'KNE (SW)', 'LOW', 'MCC', 'MCC (S)', 'MCM', 'MCM (SW)', 'MGH', 'MGH (E)',
    'MGH (S)', 'MGH (SW)', 'MLR', 'MNY', 'MNY (NW)', 'MOR', 'MUS', 'MUS (E)', 'MUS (S)', 'MUS (SW)', 'OUG',
    'PAA', 'PAB', 'PAR', 'RAI', 'RAI (E)', 'ROB', 'SAV', 'SUZ', 'T65', 'UBS', 'UBS (Secret)'];

// A few colors
export const COLORS = ["maroon", "red", "fuchsia", "lime",
                       "yellow", "navy", "blue", "teal", "aqua", "blueviolet", "cadetblue", "chartreuse",
                       "chocolate", "coral", "cornflowerblue", "crimson", "cyan",
                       "darkturquoise", "magenta", "seagreen",
                       "springgreen", "tomato"];
