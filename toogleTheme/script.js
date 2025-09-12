const togglebtn = document.getElementById("toggleTheme");
const htmlTag = document.documentElement;
console.log(htmlTag.classList.contains("dark"));

if (localStorage.getItem("theme") === "dark") {
  htmlTag.classList.add("dark");
} else {
  htmlTag.classList.add("light");
}
console.log(localStorage.getItem("theme"));


togglebtn.addEventListener("click", () => {
  console.log(htmlTag.classList.contains("dark"));

  if (htmlTag.classList.contains("dark")) {
    htmlTag.classList.remove("dark");
    htmlTag.classList.add("light");
    localStorage.setItem("theme", "light");
  } else {
    htmlTag.classList.remove("light");
    htmlTag.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
});
