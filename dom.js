const toggleTheme = (color) => {
    document.body.style.backgroundColor = color
}

const btn = document.getElementById("clickbtn");


btn.addEventListener("click", () => {
    console.log(document.body.style);
    
    toggleTheme("black")

});
