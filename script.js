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
  closeMenu.style.display = navLinks.classList.contains('active') ? 'block' : 'none'; n
});

// HAMBURGER MENU CLOSE BUTTON
closeMenu.addEventListener('click', () => {
  navLinks.classList.remove('active');
  hamburger.classList.remove('active');
  closeMenu.style.display = 'none'; 
});
