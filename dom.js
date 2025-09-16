const btn = document.getElementById("theme-button");
const heading = document.getElementById("heading");

btn.addEventListener("click", function () {
  console.log(document.body.style);
  // document.body.style.backgroundColor = 'black'
  const currentColor = document.body.style.backgroundColor;

  if (currentColor === "black") {
    document.body.style.backgroundColor = "white";
    heading.style.color = "black";
  } else {
    document.body.style.backgroundColor = "black";
    heading.style.color = "white";
  }
  console.log(currentColor);
});




















// const toggleTheme = (color) => {
//   document.body.style.backgroundColor = color;
// };

// const btn = document.getElementById("theme-button");
// const heading = document.getElementById("heading");

// btn.addEventListener("click", function () {
//   console.log(document.body.style);
//   // toggleTheme("black")
//   const currentColor = document.body.style.backgroundColor;
//   if (currentColor === "black") {
//     toggleTheme("white");
//     heading.style.color = "black";
//   } else {
//     toggleTheme("black");
//     heading.style.color = "white";
//   }
//   console.log(currentColor);
// });
