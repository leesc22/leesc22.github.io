document.addEventListener('DOMContentLoaded', function() {
  window.onscroll = function() {
    const header = document.querySelector('header');
    header.classList.toggle("scrolled", document.documentElement.scrollTop > header.offsetHeight * 2);
  };
});