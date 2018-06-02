let dataServices = require('./data-services.js'),
  common = require('./common.js');

var activateNewCategoryMode = function() {
  var newCategoryRow = document.getElementById('new-category-row');
  var newColorContent = document.getElementById('new-color-content');
  var newColorLabel = document.getElementById('new-color-label');
  var newColorName = document.getElementById('new-color-name');
  var newCategoryButton = document.getElementById('new-category-button');
  var selectedColorId = document.getElementById('selected-color-id');
  var selectedBgHex = document.getElementById('selected-bg-hex');
  var selectedFgHex = document.getElementById('selected-fg-hex');
  var selectedColorName = document.getElementById('selected-color-name');
  var editCategoryLinks = document.getElementsByClassName('edit-category-link');
  var archiveCategoryLinks = document.getElementsByClassName('archive-category-link');

  // Clear out the 'choose a color' dropdown so it doesn't keep populating
  while(newColorContent.firstChild) {
    newColorContent.removeChild(newColorContent.firstChild);
  }
  // show/hide the widgets to prepare for new category entry
  newCategoryButton.classList.add('hidden');
  newCategoryButton.classList.remove('show');
  newCategoryRow.classList.add('show');   
  newCategoryRow.classList.remove('hidden');

  // Hide the edit and archive links so the user can't add and edit a 
  // category simultaneously
  Array.prototype.forEach.call(editCategoryLinks, function(link) {
    link.classList.add('hidden');
  });
  Array.prototype.forEach.call(editCategoryLinks, function(link) {
    link.classList.remove('show');
  });
  Array.prototype.forEach.call(archiveCategoryLinks, function(link) {
    link.classList.add('hidden');
  });
  Array.prototype.forEach.call(archiveCategoryLinks, function(link) {
    link.classList.remove('show');
  });
 
  // Clear out the 'choose a color' dropdown so it doesn't continuously
  // populate in a loop each time there's an update. 
  while(newColorContent.firstChild) {
    newColorContent.removeChild(newColorContent.firstChild);
  }

  // Populate the color dropdown
  dataServices.getColors(function(err, colors) {
    var options = { 'edit' : false, 'new' : true };
    if(!err) {
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
      colors.forEach(function(color) {
        common.createColorOption(color, options , function(colorOption) {
          newColorContent.appendChild(colorOption);
        });
      });
    }
  });
};

var activateCategoryEditMode = function(id, callback) {
  // Hide the edit links on the right, hide the category label, and show
  // th category edit fields on the left
  // Also populate the form widgets with the correct colors and text
  // based on the 'current' hidden fields 
  var editColorContent = document.getElementById('edit-color-content' + id);
  var editCategoryInput = document.getElementById('edit-category-input' + id);
  var saveCategoryEdit = document.getElementById('save-category-edit' + id);
  var cancelCategoryEdit = document.getElementById('cancel-category-edit' + id);
  var editCategoryLink = document.getElementById('edit-category-link' + id);
  var archiveCategoryLink = document.getElementById('archive-category-link' + id);
  var categoryLabel = document.getElementById('category-label' + id); 
  var editColorDropdown = document.getElementById('edit-color-dropdown' + id);
  var newCategoryButton = document.getElementById('new-category-button');
  var editColorLabel = document.getElementById('edit-color-label' + id);
  var editColorName = document.getElementById('edit-color-name' + id);
  var currentBgHex = document.getElementById('current-bg-hex' + id);
  var currentColorName = document.getElementById('current-color-name' + id);
  var editCategoryLinks = document.getElementsByClassName('edit-category-link');
  var archiveCategoryLinks = document.getElementsByClassName('archive-category-link');
 
  // The color swatch that the user will click on to choose a color
  editColorLabel.setAttribute('style', 'background-color:' + currentBgHex.value);
  editColorName.textContent =  currentColorName.value;

  // Clear out the color dropdown so it doesn't duplicate the list
  while(editColorContent.firstChild) {
    editColorContent.removeChild(editColorContent.firstChild);
  }

  // Hit the database to get all the colors and use them to populate the 
  // color dropdown
  dataServices.getColors(function(err, colors) {
    var categoryId = id;
    var options = { 'edit' : true, 'new' : false };
    if(!err) {
      colors.forEach(function(color) {
        common.createColorOption(color, options, function(colorOption) {
          colorOption.setAttribute('data-categoryid', categoryId);
          for(let i = 0, max = colorOption.children.length; i < max; i += 1) {
            colorOption.children[i].setAttribute('data-categoryid', categoryId);
          }
          editColorContent.appendChild(colorOption);
        });
      });
    }
  });

  saveCategoryEdit.classList.add('show-inline');
  cancelCategoryEdit.classList.add('show-inline');
  categoryLabel.classList.add('hidden');
  editCategoryInput.classList.add('show-inline');
  editCategoryInput.value = categoryLabel.textContent;
  editCategoryLink.classList.add('hidden');
  editCategoryLink.classList.remove('show-inline');
  archiveCategoryLink.classList.add('hidden');
  archiveCategoryLink.classList.remove('show-inline');
  editColorDropdown.classList.remove('hidden');
  editColorDropdown.classList.add('show-inline');
  newCategoryButton.classList.add('hidden');
  newCategoryButton.classList.remove('show');
  
  // Hide the edit and archive links so the user can't add and edit a 
  // category simultaneously
  Array.prototype.forEach.call(editCategoryLinks, function(link) {
    link.classList.add('hidden');
  });
  Array.prototype.forEach.call(editCategoryLinks, function(link) {
    link.classList.remove('show');
  });
  Array.prototype.forEach.call(archiveCategoryLinks, function(link) {
    link.classList.add('hidden');
  });
  Array.prototype.forEach.call(archiveCategoryLinks, function(link) {
    link.classList.remove('show');
  });

  if(callback) {
    return callback();
  }
};

var cancelCategoryEditMode = function(id, callback) {
  // Restore the edit link, archive link, and category label
  // Hide the input
  // Reset the hidden inputs which hold the selected color and other
  // attributes.
  // Arguments: 
  //  id: The id of the category to reset
  //  callback: Optional. The callback is returned without arguments
  var editCategoryInput = document.getElementById('edit-category-input' + id);
  var saveCategoryEdit = document.getElementById('save-category-edit' + id);
  var cancelCategoryEdit = document.getElementById('cancel-category-edit' + id);
  var editCategoryLink = document.getElementById('edit-category-link' + id);
  var archiveCategoryLink = document.getElementById('archive-category-link' + id);
  var categoryLabel = document.getElementById('category-label' + id); 
  var editColorDropdown = document.getElementById('edit-color-dropdown' + id);
  var editColorContent = document.getElementById('edit-color-content' + id);
  var newCategoryButton = document.getElementById('new-category-button');
  var selectedColorId = document.getElementById('selected-color-id' + id);
  var selectedBgHex = document.getElementById('selected-bg-hex' + id);
  var selectedFgHex = document.getElementById('selected-fg-hex' + id);
  var selectedColorName = document.getElementById('selected-color-name' + id);
  var selectedCategoryName = document.getElementById('selected-category-name' + id);
  var currentColorId = document.getElementById('current-color-id' + id);
  var currentBgHex = document.getElementById('current-bg-hex' + id);
  var currentFgHex = document.getElementById('current-fg-hex' + id);
  var currentColorName = document.getElementById('current-color-name' + id);
  var currentCategoryName = document.getElementById('current-category-name' + id);
  var editCategoryLinks = document.getElementsByClassName('edit-category-link');
  var archiveCategoryLinks = document.getElementsByClassName('archive-category-link'); 

  // Show and hide the appropriate widgets
  editCategoryInput.classList.add('hidden');
  editCategoryInput.classList.remove('show-inline');
  saveCategoryEdit.classList.add('hidden');
  saveCategoryEdit.classList.remove('show-inline');
  cancelCategoryEdit.classList.add('hidden');
  cancelCategoryEdit.classList.remove('show-inline');
  editCategoryLink.classList.add('show-inline');
  editCategoryLink.classList.remove('hidden');
  archiveCategoryLink.classList.add('show-inline');
  archiveCategoryLink.classList.remove('hidden');
  editColorDropdown.classList.remove('show-inline');
  editColorDropdown.classList.add('hidden');
  editColorContent.classList.remove('show');
  categoryLabel.classList.remove('hidden');
  newCategoryButton.classList.add('show');
  newCategoryButton.classList.remove('hidden');
  
  // show the edit and archive links 
  Array.prototype.forEach.call(editCategoryLinks, function(link) {
    link.classList.add('show');
  });
  Array.prototype.forEach.call(editCategoryLinks, function(link) {
    link.classList.remove('hidden');
  });
  Array.prototype.forEach.call(archiveCategoryLinks, function(link) {
    link.classList.add('show');
  });
  Array.prototype.forEach.call(archiveCategoryLinks, function(link) {
    link.classList.remove('hidden');
  });
  
  // Reset the hidden 'selected' inputs to reflect the current state
  // of the database, which is stored in the hidden 'current' inputs.
  selectedColorId.value = currentColorId.value;
  selectedBgHex.value = currentBgHex.value;
  selectedFgHex.value = currentFgHex.value;
  selectedColorName.value = currentColorName.value;
  selectedCategoryName.value = currentCategoryName.value;

  // Update the category label colors and text
  categoryLabel.setAttribute('style', 'background-color:' +
    currentBgHex.value + ';' + 'color:' + currentFgHex.value);
  categoryLabel.textContent = currentCategoryName.value;

  // Hide the error message for input validation
  document.getElementById('edit-category-error').textContent = '';

  if(callback) {
    return callback();
  }
};

var saveEditedCategory = function(id) {
  var selectedColorId = document.getElementById('selected-color-id' + id);
  var selectedBgHex = document.getElementById('selected-bg-hex' + id);
  var selectedFgHex = document.getElementById('selected-fg-hex' + id);
  var selectedColorName = document.getElementById('selected-color-name' + id);
  var selectedCategoryName = document.getElementById('selected-category-name' + id);
  var currentColorId = document.getElementById('current-color-id' + id);
  var currentBgHex = document.getElementById('current-bg-hex' + id);
  var currentFgHex = document.getElementById('current-fg-hex' + id);
  var currentCategoryName = document.getElementById('current-category-name' + id);
  var currentColorName = document.getElementById('current-color-name' + id);
  var editCategoryInput = document.getElementById('edit-category-input' + id);

  //Validate the user input
  if(!editCategoryInput.value) {
    document.getElementById('edit-category-error').textContent = 
      'You have to give the category a name';
    return;
  } else {
    // If there's text in the error field remove it
  document.getElementById('edit-category-error').textContent = '';
  }

  var doc = {
    category : {
      'id' : id,
      'name' : editCategoryInput.value,
      '_color' : document.getElementById('selected-color-id' + id).value
    }
  };
  dataServices.updateCategory(doc, function(err, updatedCategory) {
    if(err) {
      console.log(err);
    } else {
      // Update the hidden 'current' inputs to reflect the new color data
      currentColorId.value = selectedColorId.value;
      currentBgHex.value = selectedBgHex.value;
      currentFgHex.value = selectedFgHex.value;
      currentColorName.value = selectedColorName.value;
      selectedCategoryName.value = editCategoryInput.value;
      currentCategoryName.value = editCategoryInput.value;

      cancelCategoryEditMode(id);
    }
  });
};

var saveNewCategory = function() {
  var newCategoryInput = document.getElementById('new-category-input');
  var selectedColorId = document.getElementById('selected-color-id');

  // Validate the input
  if(!newCategoryInput.value) {
    document.getElementById('new-category-error').textContent = 
      'You have to give the category a name';
    return;
  }

  // Post the new category to the database
  var category = { 'name' : newCategoryInput.value, 
    '_color' :  selectedColorId.value };
  dataServices.postCategory(category, function(err) {
    if(!err) {
      cancelNewCategoryMode();
      location.reload(true);
      // TODO: notify user if there's an error and refresh the page
      // or leave as-is. not sure which one yet. 
    }
  });
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
  //highlight the page in the navbar
  document.getElementById('edit-categories-link').classList.toggle('active-page-link');
};

// When the user clicks the 'showArchived' checkbox, save the changes to the
// database and refresh the page. 
document.getElementById('show-archived-check').onclick = function() {
  var isChecked = this.checked;
  var settings = {
    categories : {
      showArchivedTasks : this.checked
    }
  };
  dataServices.updateSettings(settings, function(err, settings) {
    if(!err) {
      if(isChecked) {
        document.getElementById('archived-categories').classList.add('show');
        document.getElementById('archived-categories').classList.remove('hidden');
      } else {
        document.getElementById('archived-categories').classList.add('hidden');
        document.getElementById('archived-categories').classList.remove('show');
      }
    }
  });
};

// when the user clicks on the NewCategory button, show the add
// category portion of the view and populate with data for selection
document.getElementById('new-category-button').onclick = function() {
  activateNewCategoryMode();
};

// When the user clicks on the Cancel button in the newCategory section, 
// hide the newCategory section and show the normal user view mode.
document.getElementById('cancel-create-category-button').onclick = function() {
  cancelNewCategoryMode();
};
// When the user clicks on the create-category-button, save the new category
// to the database and reset the page, hiding the newCategory section
document.getElementById('create-category-button').onclick = function() {
  saveNewCategory(); 
};


// If the user clicks outside of dropBtn then close the list
//  This also needs to be re-worked to accomodate the new color dropdowns
window.onclick = function(event) {
  if (!event.target.matches('.new-color-label') && 
    !event.target.matches('.edit-color-label')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  } 
};

var cancelNewCategoryMode = function() {
  var editCategoryLinks = document.getElementsByClassName('edit-category-link');
  var archiveCategoryLinks = document.getElementsByClassName('archive-category-link');
  var newCategoryButton = document.getElementById('new-category-button');
  var newCategoryRow = document.getElementById('new-category-row');
  var newCategoryInput = document.getElementById('new-category-input');
  var newColorContent = document.getElementById('new-color-content');

  // Show the edit and archive links 
  Array.prototype.forEach.call(editCategoryLinks, function(link) {
    link.classList.add('show');
  });
  Array.prototype.forEach.call(editCategoryLinks, function(link) {
    link.classList.remove('hidden');
  });
  Array.prototype.forEach.call(archiveCategoryLinks, function(link) {
    link.classList.add('show');
  });
  Array.prototype.forEach.call(archiveCategoryLinks, function(link) {
    link.classList.remove('hidden');
  });

  // show/hide the widgets to prepare for new category entry
  newCategoryButton.classList.add('show');
  newCategoryButton.classList.remove('hidden');
  newCategoryRow.classList.add('hidden');   
  newCategoryRow.classList.remove('show');
  newColorContent.classList.remove('show');

  // Clear out the newCateogryInput so it's empty next time around
  newCategoryInput.value = '';

};

document.addEventListener('click', function() {
  var selectedColorIdInput = document.getElementById('selected-color-id');
  var eventTarget = event.target;
  console.log(eventTarget);
  
  if (eventTarget.matches('.archive-category-link')) {
    // When the user clicks on the archive link, call archiveCategory from 
    // data-services. 
    dataServices.archiveCategory(eventTarget.dataset.id, function(err) {
      if(!err) {
        location.reload(true);
      }
    });
  } else if(eventTarget.matches('.unarchive-category-link')) {
    // When the user clicks on the unarchive link, call unArchiveCategory from
    // data-services.
    dataServices.unArchiveCategory(eventTarget.dataset.id, function(err) {
      if(!err) {
        location.reload(true);
      }
    });
  } else if (eventTarget.matches('.new-color-option') ||
      eventTarget.matches('.new-color-swatch') ||
      eventTarget.matches('.new-color-swatch-name')
  ) {
    common.updateColorSwatch(eventTarget, { 'editColor' : false, 'newColor' : true});
  } else if (eventTarget.matches('.edit-category-link')) {
    // When the user clicks on the edit link, show the new category portion of
    // the view, pre-populated with the the category info and ready for editing
    activateCategoryEditMode(eventTarget.dataset.id, function() {
    });
  } else if (eventTarget.matches('.edit-color-option') || 
    eventTarget.matches('.edit-color-swatch') ||
    eventTarget.matches('.edit-color-swatch-name')
  ) {
    // editColorOption is an item in the list of colors which shows when
    // the user clicks on the color swatch.
    // When the user clicks on this, the color swatch background
    // and name should change
    // The data attributes should also change to reflect the new color
    common.updateColorSwatch(eventTarget, { 'editColor' : true, 'newColor' : false});
  } else if (eventTarget.matches('.edit-color-label') ||
      eventTarget.matches('.edit-color-dropdown') ||
      eventTarget.matches('.edit-color-name') ||
      eventTarget.matches('.edit-color-dropdown-caret')
    ) {
    // editColorContent is the dropdown which shows the available colors when
    // the user is editing a category. It's hidden by default but will show
    // when the user clicks on the color swatch during editing
    document.getElementById('edit-color-content' + eventTarget.dataset.categoryid)
      .classList.toggle('show');
  } else if (eventTarget.matches('.new-color-label') || 
      eventTarget.matches('.new-category-dropdown') ||
      eventTarget.matches('.new-color-name') ||
      eventTarget.matches('.new-color-dropdown-caret')
    ) {
    // newColorContent is the dropdown which shows the available colors when
    // the user is creating a new category. It's hidden by default but will 
    // show when the user clicks the color swatch. 
    document.getElementById('new-color-content').classList.toggle('show');
  } else if (eventTarget.matches('.save-category-edit')) {
    // Save the selected color and name to the db
    saveEditedCategory(eventTarget.dataset.id);
  } else if (eventTarget.matches('.cancel-category-edit')) {
    // The user clicked the cancel button, so the category section has
    // to be reset to the state at load or the user's last change
    // The current state is saved in the hidden inputs:
    //    currentColorId
    //    currentBgHex
    //    currentfgHex
    //    currentColorName
    cancelCategoryEditMode(eventTarget.dataset.id); 
  }
});
