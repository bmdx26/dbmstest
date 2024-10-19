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

// Register Form Submission
registerForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Collect form data
  const formData = new FormData(registerForm);
  const data = {};
  formData.forEach((value, key) => {
      data[key] = value;
  });

  // Send the data to Django
  fetch("/your-register-url/", {  // Replace with your actual URL
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken") // Include CSRF token if required
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
      // Handle success response
      console.log("Success:", data);
      // Optionally, close the modal or reset the form
      modal.style.display = 'none';
      registerForm.reset();
  })
  .catch((error) => {
      console.error("Error:", error);
  });
});

// Function to get CSRF token
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Check if this cookie string begins with the given name
          if (cookie.substring(0, name.length + 1) === (name + "=")) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

// Modal control
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

// Login Form Submission
loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Collect form data
  const formData = new FormData(loginForm);
  
  // Send the data to Django
  fetch("/your-login-url/", { // Replace with your actual login URL
      method: "POST",
      headers: {
          "X-CSRFToken": getCookie("csrftoken") // Include CSRF token if required
      },
      body: formData,
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          console.log("Login Success:", data.message);
          modal.style.display = 'none'; // Close modal on success
          loginForm.reset(); // Reset form
          // Optionally redirect or update UI
      } else {
          console.error("Login Error:", data.message);
          alert(data.message); // Alert user on failure
      }
  })
  .catch((error) => {
      console.error("Error:", error);
  });
});
