const common = require('./common');

window.onload = function() {
  common.populateUsersDropdown();
  //highlight the page in the navbar
  document.getElementById('add-task-link').classList.toggle('active-page-link');
};

// Show the owner dropdown when the user clicks on 'choose owner' dropdown
document.getElementById('owner-drop-btn').onclick = function() {
  document.getElementById('owner-dropdown-content').classList.toggle('show');
};

// Show the owner dropdown when the user clicks on 'choose owner' input
document.getElementById('owner').onclick = function() {
  document.getElementById('owner-dropdown-content').classList.toggle('show');
};

// Show the category dropdown when the user clicks on 'choose color' dropdown
document.getElementById('category-drop-btn').onclick = function() {
  document.getElementById('category-dropdown-content').classList.toggle('show');
};

// Show the category dropdown when the user clicks on 'choose color' input
document.getElementById('category').onclick = function() {
  document.getElementById('category-dropdown-content').classList.toggle('show');
};

var processCategoryClick = function(target) {
  // assign the id' to the hidden input for later saving to the db
  // and the category name to the input
  document.getElementById('category-id').value = target.dataset.id;
  document.getElementById('category').value = target.dataset.category;
};

var processOwnerClick = function(target) {
  // assign the ownerId to the hidden input for later saving to the db
  // and the owner name to the input
  document.getElementById('owner-id').value = target.dataset.id;
  document.getElementById('owner').value = target.dataset.owner;
};

var processCreatedByClick = function(target) {
  document.getElementById('created-by-id').value = target.dataset.id;
  document.getElementById('created-by').value = target.dataset.createdby;
};

document.getElementById('recurring-check').onclick = function() {
  var check = document.getElementById('recurring-check');
  var frequencyInput = document.getElementById('frequency'); 
  var frequencySelect = document.getElementById('frequency-cadence'); 

  // disable and clear the value of the frequency area
  if (check.checked) {
    frequencyInput.disabled = false;
    frequencySelect.disabled = false;
  } else {
    frequencyInput.disabled = true;
    frequencySelect.disabled = true;
    frequencyInput.value = null;
    frequencySelect.value = null;
  }
};

// Process clicks on the various dropdowns on the form
document.addEventListener('click', function() {
  if (event.target.matches('.category-option') || event.target.matches('.swatch')) {
    processCategoryClick(event.target);
  } else if (event.target.matches('.owner-option')) {
    processOwnerClick(event.target);
  } else if (event.target.matches('.created-by-option')) {
    processCreatedByClick(event.target);
  } 
});

// If the user clicks outside of any of the dropdowns then close the list
// TODO: change this to a functional style this is from w3 schools 
//  and it's TERRIBLE
window.onclick = function(event) {
  console.log(event.target);
  if (!event.target.matches('.drop-btn') && !event.target.matches('.drop-arrow')
        && !event.target.matches('.dropdown-input')) {
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