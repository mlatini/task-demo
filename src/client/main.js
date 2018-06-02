import './style.css';

// document.getElementById('nav-user-dropdown').onclick = function() {
//   console.log('nav-user-dropdown');

//   let content = document.getElementById('nav-user-dropdown-content');
//   if(content.classList.contains('hidden')) {
//     content.classList.add('show');
//     content.classList.remove('hidden');
//   }
//   else if(content.classList.contains('show')) {
//     content.classList.add('hidden');
//     content.classList.remove('show');
//   }
// };

document.getElementById('logged-in-user-full-name').onclick = function() {
  let content = document.getElementById('nav-user-dropdown-content');
  if(content.classList.contains('hidden')) {
    content.classList.add('show');
    content.classList.remove('hidden');
  }
  else if(content.classList.contains('show')) {
    content.classList.add('hidden');
    content.classList.remove('show');
  }
};