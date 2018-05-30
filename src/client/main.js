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

let populateUsersDropdown = function() {
  const dataServices = require('../client/data-services'), 
    usersDropdownList = document.getElementById('users-list');

  dataServices.getAllUsers( (err, users) => {
    if(!err) {
      // populate the users dropdown list. 
      users.forEach( (user) => {
        const userFullName = user.firstName + ' ' + user.lastName;

        let usersListItem = document.createElement('li'), 
          usersListItemLink = document.createElement('a');

        usersListItemLink.setAttribute('class', 'nav-link');
        usersListItemLink.setAttribute('data-id', user.id);
        usersListItemLink.textContent = userFullName;

        usersListItem.appendChild(usersListItemLink);
        usersDropdownList.appendChild(usersListItem);
      });
    }
  });
};

window.onload = function() {
  populateUsersDropdown();
};
