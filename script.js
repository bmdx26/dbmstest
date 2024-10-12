//LOADING SCREEN


window.addEventListener('load', function() {
  
  setTimeout(function() {
      
      document.getElementById('loading').style.display = 'none';
      
      document.getElementById('content').style.display = 'block';
  }, 3000); 
});



//HAMBURGER MENU

const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active'); 
});
