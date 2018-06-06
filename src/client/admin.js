var dataServices = require('./data-services.js');
var common = require('./common.js');

window.onload = function() {
  common.populateUsersDropdown();
  // Highlight the page in the navbar
  document.getElementById('admin-link').classList.toggle('active-page-link');
};

// When the user clicks on the newUser button, show the add user portion of
// the view
document.getElementById('new-user-button').onclick = function () {
  activateNewUserMode();
};

// When the user clicks on cancel when adding a new user reset the view
document.getElementById('cancel-create-user-button').onclick = function () {
  cancelNewUserMode();
};

// When the user clicks on the createUser button show the create user fields
document.getElementById('create-user-button').onclick = function () {
  saveNewUser();
};

// When the user clicks on the 'show archived users' checkbox, save the changes
// to the database and refresh the page
document.getElementById('show-archived-users-check').onclick = function () {
  var isChecked = this.checked;
  var settings = {
    admin: {
      showArchivedUsers: this.checked
    }
  };
  dataServices.updateSettings(settings, function (err) {
    if (!err) {
      if (isChecked) {
        document.getElementById('archived-users').classList.add('show');
        document.getElementById('archived-users').classList.remove('hidden');
      } else {
        document.getElementById('archived-users').classList.add('hidden');
        document.getElementById('archived-users').classList.remove('show');
      }
    }
  });
};

document.addEventListener('click', function () {
  var eventTarget = event.target;
  console.log(event.target);
  if (eventTarget.matches('.new-color-label')) {
    // new-color-content is the dropdown which shows the available colors when
    // the user is creating a new user. It's hidden by default but will 
    // show when the user clicks the color swatch. 
    document.getElementById('new-color-content').classList.toggle('show');
  } else if (eventTarget.matches('.new-color-option')) {
    common.updateColorSwatch(eventTarget, {
      'editColor': false, 'newColor': true
    });
  } else if (eventTarget.matches('.edit-color-label')) {
    // edit-color-label is the dropdown which shows the available colors when
    // the user is editing a user. It's hidden by default but will
    // show when the user clicks on the color swatch.
    document.getElementById('edit-color-content' + eventTarget.dataset.id)
      .classList.toggle('show');
  } else if (eventTarget.matches('.edit-color-option') ||
    eventTarget.matches('.edit-color-swatch') || 
    eventTarget.matches('.edit-color-swatch-name')) {
    common.updateColorSwatch(eventTarget, {
      'editColor': true, 'newColor': false
    });
  } else if (eventTarget.matches('.edit-user-link')) {
    // When the user clicks on the edit link, show the new user portion of
    // the view, pre-populated with the current info, ready for editing
    activateUserEditMode(eventTarget.dataset.id, function () {

    });
  } else if (eventTarget.matches('.save-edited-user-button')) {
    // Save the edited user to the db.
    saveEditedUser(eventTarget.dataset.id);
  } else if (eventTarget.matches('.cancel-edited-user-button')) {
    // Reset the new user portion of the view.
    cancelUserEditMode(eventTarget.dataset.id, function () {
    });
  } else if (eventTarget.matches('.archive-user-link')) {
    // When the user clicks on the archiveUser link, call archiveUser
    // from dataServices
    dataServices.archiveUser(eventTarget.dataset.id, function (err) {
      if (!err) {
        location.reload(true);
      }
    });
  } else if (eventTarget.matches('.un-archive-user-link')) {
    // When the user clicks on the unArchive user linke, call unarchiveUser
    // from dataServices
    dataServices.unArchiveUser(eventTarget.dataset.id, function (err) {
      if (!err) {
        location.reload(true);
      }
    });
  }
});

var cancelNewUserMode = function () {
  var newUserRow = document.getElementById('new-user-row');
  var newUserButton = document.getElementById('new-user-button');
  var editUserLinks = document.getElementsByClassName('edit-user-link');
  var archiveUserLinks = document.getElementsByClassName('archive-user-link');

  // Show/hide the widgets 
  newUserButton.classList.add('show');
  newUserButton.classList.remove('hidden');
  newUserRow.classList.add('hidden');
  newUserRow.classList.remove('show');

  // show the edit and archive links 
  Array.prototype.forEach.call(editUserLinks, function (link) {
    link.classList.add('show');
  });
  Array.prototype.forEach.call(editUserLinks, function (link) {
    link.classList.remove('hidden');
  });
  Array.prototype.forEach.call(archiveUserLinks, function (link) {
    link.classList.add('show');
  });
  Array.prototype.forEach.call(archiveUserLinks, function (link) {
    link.classList.remove('hidden');
  });
};

var activateNewUserMode = function () {
  var newColorContent = document.getElementById('new-color-content');
  var newColorLabel = document.getElementById('new-color-label');
  var newColorName = document.getElementById('new-color-name');
  var selectedColorId = document.getElementById('selected-color-id');
  var selectedBgHex = document.getElementById('selected-bg-hex');
  var selectedFgHex = document.getElementById('selected-fg-hex');
  var selectedColorName = document.getElementById('selected-color-name');
  var newUserRow = document.getElementById('new-user-row');
  var newUserButton = document.getElementById('new-user-button');
  // The edit and archive links on the right, which should be hidden
  var editUserLinks = document.getElementsByClassName('edit-user-link');
  var archiveUserLinks = document.getElementsByClassName('archive-user-link');

  // Show/hide the widgets to prepare for new category entry
  newUserButton.classList.add('hidden');
  newUserButton.classList.remove('show');
  newUserRow.classList.toggle('show');

  // Hide the edit and archive links so the user can't add an edit a 
  // category simultaneiosly
  Array.prototype.forEach.call(editUserLinks, function (link) {
    link.classList.add('hidden');
  });
  Array.prototype.forEach.call(editUserLinks, function (link) {
    link.classList.remove('show');
  });
  Array.prototype.forEach.call(archiveUserLinks, function (link) {
    link.classList.add('hidden');
  });
  Array.prototype.forEach.call(archiveUserLinks, function (link) {
    link.classList.remove('show');
  });

  // Clear out the 'choose a color' dropdown so it doesn't keep populating
  while (newColorContent.firstChild) {
    newColorContent.removeChild(newColorContent.firstChild);
  }

  // Populate the color dropdown
  dataServices.getColors(function (err, colors) {
    var options = { 'edit': false, 'new': true };
    if (!err) {
      // Populate the hidden 'selected' inputs with the data from the first
      // color object.
      selectedColorId.value = colors[0].id;
      selectedBgHex.value = colors[0].bgHex;
      selectedFgHex.value = colors[0].fgHex;
      selectedColorName.value = colors[0].name;

      // Initialize the dropdown label with the bgcolor and name 
      newColorLabel.setAttribute('style', 'background-color:' + selectedBgHex.value);
      newColorName.textContent = selectedColorName.value;

      // Populate the color dropdown
      colors.forEach(function (color) {
        common.createColorOption(color, options, function (colorOption) {
          newColorContent.appendChild(colorOption);
        });
      });
    }
  });
};

var saveEditedUser = function (id) {
  var editUserError = document.getElementById('edit-user-error' + id);
  var editUserFirstName = document.getElementById('edit-user-first-name' + id);
  var editUserLastName = document.getElementById('edit-user-last-name' + id);
  var editUserUsername = document.getElementById('edit-user-username' + id);
  var editUserPassword = document.getElementById('edit-user-password' + id);
  var editUserEmail = document.getElementById('edit-user-email' + id);
  var editUserAdmin = document.getElementById('edit-user-admin' + id);
  var editUserUser = document.getElementById('edit-user-user' + id);
  var selectedColorId = document.getElementById('selected-color-id' + id);
  var selectedBgHex = document.getElementById('selected-bg-hex' + id);
  var selectedFgHex = document.getElementById('selected-fg-hex' + id);
  var selectedColorName = document.getElementById('selected-color-name' + id);

  // Since the isAdmin hidden field value is stored as text I need to convert
  // it to a bool before passing to updateUser
  var isAdmin = false;
  var isUser = false;
  var hiddenAdmin = document.getElementById('is-admin' + id);
  var hiddenUser = document.getElementById('is-user' + id);
  if (hiddenAdmin.value === 'true') {
    isAdmin = true;
  }
  if (hiddenUser.value === 'true') {
    isUser = true;
  }

  // Clear the error notification in case something is lingering
  editUserError.textContent = '';

  // Validate the input
  if (!editUserFirstName.value) {
    editUserError.textContent = 'You have to type a first name';
    return;
  } else if (!editUserLastName.value) {
    editUserError.textContent = 'You have to type a last name';
    return;
  } else if (!editUserUsername.value) {
    editUserError.textContent = 'You have to type a username';
    return;
  } else if (!editUserEmail.value) {
    editUserError.textContent = 'You have to type an email';
    return;
  }

  // If the admin box is checked, the edited user will be in the admin role
  // if the User box is checked the user will be in the user role
  var roles = [];
  if (editUserAdmin.checked) {
    roles.push('Admin');
  }
  if (editUserUser.checked) {
    roles.push('User');
  }

  var options = {
    user: {
      'id': id,
      'firstName': editUserFirstName.value,
      'lastName': editUserLastName.value,
      'bgHex': selectedBgHex.value,
      'fgHex': selectedFgHex.value,
      'colorName': selectedColorName.value,
    },
    'roles': roles,
    'currentlyAdmin': isAdmin || false,
    'currentlyUser': isUser || false
  };
  dataServices.updateUser(options, function (err) {
    if (err) {
      editUserError.textContent = err;
    } else {
      location.reload(true);
    }
  });
};

var saveNewUser = function () {
  var newUserFirstName = document.getElementById('new-user-first-name');
  var newUserLastName = document.getElementById('new-user-last-name');
  var newUserUsername = document.getElementById('new-user-username');
  var newUserPassword = document.getElementById('new-user-password');
  var newUserEmail = document.getElementById('new-user-email');
  var newUserAdmin = document.getElementById('new-user-admin');
  var selectedFgHex = document.getElementById('selected-fg-hex');
  var selectedBgHex = document.getElementById('selected-bg-hex');
  var selectedColorName = document.getElementById('selected-color-name');
  var newUserError = document.getElementById('new-user-error');

  // Validate the input
  if (!newUserFirstName.value) {
    newUserError.textContent = 'You have to type a first name';
    return;
  } else if (!newUserLastName.value) {
    newUserError.textContent = 'You have to type a last name';
  } else if (!newUserUsername.value) {
    newUserError.textContent = 'You have to type a username';
  } else if (!newUserPassword.value) {
    newUserError.textContent = 'You have to type a password';
  } else if (!newUserEmail.value) {
    newUserError.textContent = 'You have to type an email address';
  }

  // Post the new user to the database
  var user = {
    'firstName': newUserFirstName.value,
    'lastName': newUserLastName.value,
    'email': newUserEmail.value,
    'username': newUserUsername.value,
    'password': newUserPassword.value,
    'admin': newUserAdmin.checked,
    'fgHex': selectedFgHex.value,
    'bgHex': selectedBgHex.value,
    'colorName': selectedColorName.value
  };
  dataServices.postUser(user, function (err, savedUser) {
    if (!err) {
      console.log('The user was saved: ' + savedUser);
      // reload the page
      // TODO: should be able to refresh without reload
      location.reload(true);
    } else {
      // TODO: notify user if there's an error and do something
    }
  });
};

var activateUserEditMode = function (id, callback) {
  // Prepare the page for editing the user. Hide the non-relevant widgets
  // and show the edit fields, pre-populated with the correct user info.
  //
  // These are the 'edit' widgets which should be shown
  var editUserFirstName = document.getElementById('edit-user-first-name' + id);
  var editUserLastName = document.getElementById('edit-user-last-name' + id);
  var editUserUsername = document.getElementById('edit-user-username' + id);
  var editUserEmail = document.getElementById('edit-user-email' + id);
  var editColorLabel = document.getElementById('edit-color-label' + id);
  var editColorName = document.getElementById('edit-color-name' + id);
  var editColorContent = document.getElementById('edit-color-content' + id);

  // These hidden widgets store the current state of the various user fields.
  var currentFirstName = document.getElementById('current-first-name' + id);
  var currentLastName = document.getElementById('current-last-name' + id);
  var currentEmail = document.getElementById('current-email' + id);
  var currentUsername = document.getElementById('current-username' + id);
  var currentBgHex = document.getElementById('current-bg-hex' + id);
  var currentColorName = document.getElementById('current-color-name' + id);
  var newUserButton = document.getElementById('new-user-button');

  // The edit and archive links on the right, which should be hidden
  var editUserLinks = document.getElementsByClassName('edit-user-link');
  var archiveUserLinks = document.getElementsByClassName('archive-user-link');

  // This is the entire gridRow. 
  var editGridRow = document.getElementById('edit-grid-row' + id);
  var currentGridRow = document.getElementById('current-grid-row' + id);

  // The color swatch that the user will click on to choose a color
  editColorLabel.setAttribute('style', 'background-color:' + currentBgHex.value);
  editColorName.textContent = currentColorName.value;

  // Clear out the color dropdown so it doesn't duplicate the list
  while (editColorContent.firstChild) {
    editColorContent.removeChild(editColorContent.firstChild);
  }

  // Hit the database to get all the colors and use them to populate the 
  // color dropdown
  dataServices.getColors(function (err, colors) {
    var categoryId = id;
    var options = { 'edit': true, 'new': false };
    if (!err) {
      colors.forEach(function (color) {
        common.createColorOption(color, options, function (colorOption) {
          colorOption.setAttribute('data-categoryid', categoryId);
          editColorContent.appendChild(colorOption);
        });
      });
    }
  });

  // Stuff to show that's currently hidden.
  editGridRow.classList.add('show');
  editGridRow.classList.remove('hidden');

  // Stuff to hide that's currently shown
  currentGridRow.classList.add('hidden');
  currentGridRow.classList.remove('show');
  newUserButton.classList.add('hidden');
  newUserButton.classList.remove('show');
  newUserButton.classList.remove('showInline');

  // hide the edit and archive links 
  Array.prototype.forEach.call(editUserLinks, function (link) {
    link.classList.add('hidden');
  });
  Array.prototype.forEach.call(editUserLinks, function (link) {
    link.classList.remove('show');
  });
  Array.prototype.forEach.call(archiveUserLinks, function (link) {
    link.classList.add('hidden');
  });
  Array.prototype.forEach.call(archiveUserLinks, function (link) {
    link.classList.remove('show');
  });

  // Populate the input widgets with the current user data
  editUserFirstName.value = currentFirstName.value;
  editUserLastName.value = currentLastName.value;
  editUserUsername.value = currentUsername.value;
  editUserEmail.value = currentEmail.value;

  if (callback) {
    return callback();
  }
};

var cancelUserEditMode = function (id, callback) {
  // Restore the user back to view mode, hiding the edit fields
  // Arguments:
  //  id: the id of the user to reset
  //  callback: Optional. The callback is returned without arguments
  //
  var newUserButton = document.getElementById('new-user-button');

  // The edit and archive links on the right, which should be shown 
  var editUserLinks = document.getElementsByClassName('edit-user-link');
  var archiveUserLinks = document.getElementsByClassName('archive-user-link');

  // This is the entire gridRow. 
  var editGridRow = document.getElementById('edit-grid-row' + id);
  var currentGridRow = document.getElementById('current-grid-row' + id);

  // Stuff to hide that's currently shown.
  editGridRow.classList.add('hidden');
  editGridRow.classList.remove('show');

  // Stuff to show that's currently hidden
  currentGridRow.classList.add('show');
  newUserButton.classList.add('show');
  newUserButton.classList.remove('hidden');

  // show the edit and archive links 
  Array.prototype.forEach.call(editUserLinks, function (link) {
    link.classList.add('show');
  });
  Array.prototype.forEach.call(editUserLinks, function (link) {
    link.classList.remove('hidden');
  });
  Array.prototype.forEach.call(archiveUserLinks, function (link) {
    link.classList.add('show');
  });
  Array.prototype.forEach.call(archiveUserLinks, function (link) {
    link.classList.remove('hidden');
  });

  if (callback) {
    return callback();
  }
};
