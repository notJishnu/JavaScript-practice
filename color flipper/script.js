// Step 1: Get references to the elements we need
const body = document.body;
const colorDisplay = document.getElementById('colorDisplay');
const flipBtn = document.getElementById('flipBtn');

// Step 2: A simple array of named colors (easy mode)
const colors = ['red', 'blue', 'green', 'orange', 'purple', 'teal', 'crimson', 'navy'];

// Step 3: Function to generate a RANDOM HEX color (harder mode)
function getRandomHexColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Step 4: Function to pick a random item from the named colors array
function getRandomNamedColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// Step 5: Toggle between hex mode and named-color mode (extra practice)
let useHex = true;

flipBtn.addEventListener('click', function () {
  const newColor = useHex ? getRandomHexColor() : getRandomNamedColor();

  body.style.backgroundColor = newColor;
  colorDisplay.textContent = newColor;

  // alternate mode each click, just for variety/practice
  useHex = !useHex;
});