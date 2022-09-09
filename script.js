"use strict";

// Improved Color Selector !!!

//Global Variavle to be defined.
let inputColor;
let hexValue;
let rgbValue;
let hslValue;

//When load initiate !
document.addEventListener("DOMContentLoaded", init);

function init() {
  //When initiate call the function to define the input value.
  document.querySelector("input").addEventListener("input", defineValues);
}

//Define Input Value (Color)
function defineValues() {
  inputColor = document.querySelector("input").value; //Getting the color from the input.
  hexValue = inputColor;
  rgbValue = hexToRgb(inputColor); //This call functions use the input as argument/parameter in the function later to convert and return the right value, than the will be used for the display functions !!!
  hslValue = rgbToHsl(inputColor); //This call functions use the input as argument/parameter in the function later to convert and return the right value, than the will be used for the display functions !!!

  //Callback the display function delegator
  showColor();
}

function showColor() {
  displayHex(hexValue); // display functions use the value returned but need to convert as well to show propertly in the DOM.
  displayRgb(rgbValue); // display functions use the value returned but need to convert as well to show propertly in the DOM.
  displayHsl(hslValue); // display functions use the value returned but need to convert as well to show propertly in the DOM.
  console.log(hslValue);
}

// 1 . Function to Convert that value /HEX) to RGB.
//Here we define r, g, and b variables that would be used later in the function rgbToHsl
function hexToRgb(inputColor) {
  //Cleaning the string
  const number = inputColor.substring("1");

  // Divide the inputColor (HEX) in three pars of numbers/letters
  const ab = number.substring(0, 2);
  const cd = number.substring(2, 4);
  const ef = number.substring(4, 6);

  //Use those 3 values and convert them to 3 numbers for the RGB with parseInt
  const r = parseInt(ab, 16);
  const g = parseInt(cd, 16);
  const b = parseInt(ef, 16);

  //Return
  return `rgb(${r}, ${g}, ${b})`;
}

// 2 . Function to Convert the second value (RGB) to HSL
function rgbToHsl(inputColor) {
  //Define the variables r, g, b too use in the conversion.
  let r;
  let g;
  let b;
  // As they use the inputColor (HEX) I need to parseInt to NUMBERS !!
  r = parseInt(inputColor.substring(1, 3));
  g = parseInt(inputColor.substring(3, 6));
  b = parseInt(inputColor.substring(6, 8));

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  // console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing

  return `hsl(${h}, ${s}, ${l})`;
}

// 3 . Function to display those values in the DOM.
function displayRgb(rgbValue) {
  const part = rgbValue.slice(4, -1); //Slice to keep the part of the RGB that I want (Just numbers from the String)
  const rgb = part.replace(/,/g, ""); //Removes commas from slice.
  const spaces = rgb.split(" "); //Split all the spaces

  //Convert the substring to numbers.
  const rStr = spaces[0]; //From cero to first spaces.
  const gStr = spaces[1]; //From first to second spaces.
  const bStr = spaces[2]; //From second to thirht spaces.

  //the param one, two, three are references to r, g, b variables that the callbak function uses.
  document.querySelector(".r").textContent = rStr;
  document.querySelector(".g").textContent = gStr;
  document.querySelector(".b").textContent = bStr;
}

function displayHex(hexValue) {
  //HEX is equal to inputColor
  document.querySelector(".hex").textContent = hexValue;
}

function displayHsl(hslValue) {
  const part = hslValue.slice(4, -1); //Slice to keep the part I want from string (Just numbers) "-1" is the last parentesis.
  const hsl = part.replace(/,/g, ""); //Removes commas from slice.
  const spaces = hsl.split(" "); //Split all the spaces

  //Convert the substring to numbers.(??)
  const hStr = spaces[0]; //From cero to first spaces.
  const sStr = spaces[1]; //From first to second spaces.
  const lStr = spaces[2]; //From second to thirht spaces.

  document.querySelector(".h").textContent = hStr;
  document.querySelector(".s").textContent = sStr;
  document.querySelector(".l").textContent = lStr;
}
