// LOADING SCREEN
window.addEventListener('load', function() {
  setTimeout(function() {
      document.getElementById('loading').style.display = 'none';
      document.getElementById('content').style.display = 'block';
  }, 3000);
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const closeMenu = document.getElementById('close-menu');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
  closeMenu.style.display = navLinks.classList.contains('active') ? 'block' : 'none';
});

closeMenu.addEventListener('click', () => {
  navLinks.classList.remove('active');
  hamburger.classList.remove('active');
  closeMenu.style.display = 'none'; 
});

// SEARCH BAR TYPEWRITER EFFECT
const searchInput = document.getElementById('dynamic-word');
const words = ["Biriyani", "Shawarma", "Pizza", "Burger", "Milkshake"];
let wordIndex = 0;
let letterIndex = 0;
let currentWord = "";
let isDeleting = false;

function typeEffect() {
    if (!isDeleting && letterIndex <= words[wordIndex].length) {
        currentWord = words[wordIndex].slice(0, letterIndex);
        searchInput.setAttribute("placeholder", `Search for '${currentWord}'...`);
        letterIndex++;
        setTimeout(typeEffect, 200);
    } else if (isDeleting && letterIndex > 0) {
        currentWord = words[wordIndex].slice(0, letterIndex);
        searchInput.setAttribute("placeholder", `Search for '${currentWord}'...`);
        letterIndex--;
        setTimeout(typeEffect, 100);
    } else if (!isDeleting && letterIndex === words[wordIndex].length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000);
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 200);
    }
}

typeEffect();

// MODAL FUNCTIONALITY
const modal = document.getElementById("modal");
const signInBtn = document.getElementById("signInBtn");
const closeModal = document.querySelector(".modal .close");
const loginToggle = document.getElementById("loginToggle");
const registerToggle = document.getElementById("registerToggle");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

signInBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});

loginToggle.addEventListener('click', () => {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    loginToggle.classList.add('active');
    registerToggle.classList.remove('active');
});

registerToggle.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    registerToggle.classList.add('active');
    loginToggle.classList.remove('active');
});
