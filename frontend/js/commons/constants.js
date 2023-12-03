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
  

//Canvas Constants
const C_WIDTH = 400;
const C_HEIGHT = 300;

const LINE_SIZE = [1 , 2 , 4 , 8];
