const toggleButton = document.getElementById("toggleButton");
const navList = document.getElementById("navList");

toggleButton.addEventListener("click", () => {
    navList.classList.toggle("active");
})

const navbar = document.querySelector('.navbar-fixed');
window.onscroll = () => {
    if (window.scrollY > 100) {
        navbar.classList.add('navbar-active');
    } else {
        navbar.classList.remove('navbar-active');
    }
};