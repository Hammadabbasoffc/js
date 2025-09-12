const inputField = document.getElementById("userInput");
const saveBtn = document.getElementById("saveBtn");
const inputList = document.getElementById("inputList");

// Load stored inputs from localStorage
function loadInputs() {
  inputList.innerHTML = ""; // clear list
  const inputs = JSON.parse(localStorage.getItem("userInputs")) || [];

  inputs.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    inputList.appendChild(li);
  });
}

// Save new input
function saveInput() {
  const value = inputField.value.trim();
  if (value === "") {
    alert("Please enter something!");
    return;
  }

  // Get existing inputs or create new array
  const inputs = JSON.parse(localStorage.getItem("userInputs")) || [];

  console.log(inputs);
  

  // Add new input
  inputs.push(value);

  // Save updated array to localStorage
  localStorage.setItem("userInputs", JSON.stringify(inputs));

  // Clear input field
  inputField.value = "";

  // Refresh displayed list
  loadInputs();
}

// Event listener
saveBtn.addEventListener("click", saveInput);

// Load saved inputs when page refreshes
window.onload = loadInputs;
