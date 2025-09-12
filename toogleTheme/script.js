const togglebtn = document.getElementById("toggleTheme");
const htmlTag = document.documentElement;

togglebtn.addEventListener("click", () => {
  console.log(htmlTag.classList.contains("dark"));

  if (htmlTag.classList.contains("dark")) {
    htmlTag.classList.remove("dark");
    htmlTag.classList.add("light");
  } else {
    htmlTag.classList.remove("light");
    htmlTag.classList.add("dark");
  }
});
