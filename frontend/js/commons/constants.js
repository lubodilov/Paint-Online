//Commections
let socket = io();
const URL = 'http://localhost:3000';

//Party Configuration
const MIN_PLAYER_NUMBER = 2;
const MAX_PLAYER_NUMBER = 10;

//Colors Configuration
const STARTING_COLORS = [
    "#800080",
    "#0000FF",
    "#FFC0CB",
    "#FF0000",
    "#FFA500",
    "#FFFF00",
    "#008000",
    "#A52A2A",
    "#000000",
    "#FFFFFF",
    "transparent",
    "transparent",
    "transparent",
    "transparent",
    "transparent",
  ];
  
// //
// const NONE = 0;
// const LINE = 1;
// const CIRCLE = 2;
// const TRIANGLE = 3;
// const RECTANGLE = 4;
// const CURVED_LINE = 5;
// const CUSTOM_SHAPE = 6;
