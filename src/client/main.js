//import './style.css';
const common = require('./common');

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

document.addEventListener('click', () => {
  if(event.target.matches('.users-list-item')) {
    common.changeCurrentUser(event.target.dataset.id, (err) => {
      if(!err) {
        location.reload(true);
      }
    });
  }
});