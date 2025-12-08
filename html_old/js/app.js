const toggle = document.querySelector('.menu');
const menuMobile = document.querySelector('.mobile');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('active');
  menuMobile.classList.toggle('active');
});

function toggleMenu() {
  toggle.classList.toggle('active');
  menuMobile.classList.toggle('active');
}