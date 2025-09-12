const toggleTheme = (color) => {
  document.body.style.backgroundColor = color;
};

const btn = document.getElementById("theme-button");
const heading = document.getElementById("heading");

btn.addEventListener("click", function () {
  console.log(document.body.style);
  // toggleTheme("black")
  const currentColor = document.body.style.backgroundColor;
  if (currentColor === "black") {
    toggleTheme("white");
    heading.style.color = "black";
  } else {
    toggleTheme("black");
    heading.style.color = "white";
  }
  console.log(currentColor);
});
