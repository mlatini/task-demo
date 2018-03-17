//COMMON.JS
//This is the common functions that will be used by 2 or more other scripts.


// create a new color option and return it in a callback
// a color option is a color name along with a color swatch
// Arguments are mandatory and  are;
// color: a color object based on the mongoose color model
// options: json list of options. values are:
//  newCategory : true/false
//  editCategory : true/false
// callback: The new colorOption is passed to the callback
exports.createColorOption = function(color, options , callback) {
  var colorOption = document.createElement('div');
  var swatch = document.createElement('label');
  var colorName = document.createElement('label');

  colorOption.setAttribute('data-colorid', color.id);
  colorOption.setAttribute('data-color', color.name);
  colorOption.setAttribute('data-bghex', color.bgHex);
  colorOption.setAttribute('data-fghex', color.fgHex);
  swatch.setAttribute('data-colorid', color.id);
  swatch.setAttribute('data-color', color.name);
  swatch.setAttribute('data-bghex', color.bgHex);
  swatch.setAttribute('data-fghex', color.fgHex);
  swatch.setAttribute('style', 'background-color:' + color.bgHex);
  colorName.setAttribute('data-colorid', color.id);
  colorName.setAttribute('data-color', color.name);
  colorName.setAttribute('data-bghex', color.bgHex);
  colorName.setAttribute('data-fghex', color.fgHex);
  colorName.textContent = ' ' + color.name + ' ';
  colorOption.appendChild(swatch);
  colorOption.appendChild(colorName);
  
  if(options.new) {
    colorOption.setAttribute('class', 'new-color-option');
    swatch.setAttribute('class', 'swatch new-color-swatch');
    colorName.setAttribute('class', 'new-color-swatch-name');
  } else if(options.edit) {
    colorOption.setAttribute('class', 'edit-color-option');
    swatch.setAttribute('class', 'swatch edit-color-swatch');
    colorName.setAttribute('class', 'edit-color-swatch-name');
  } 

  return callback(colorOption);
};

exports.updateColorSwatch = function(target, options) {
  // This function should be called when the user clicks on a color in the
  // editColorDropdown or newColorDropdown. 
  // It will Update the swatch and the text of the selected color to 
  // reflect which colorOption the user clicked on 
  // Parameters:
  // target: the target that the user clicked on 
  // options: json obect with the following. Both are required
  //  edit: true/false
  //  new: true/false
  var selectedColorId = '';
  var selectedBgHex = '';
  var selectedFgHex = '';
  var selectedColorName = '';

  if (options.editColor) {
    // Edit Color Mode
    var editColorLabel = document.getElementById('edit-color-label' + 
      target.dataset.categoryid);
    var editColorContent = document.getElementById('edit-color-content' + 
      target.dataset.categoryid);
    var editColorName = document.getElementById('edit-color-name' + 
      target.dataset.categoryid);
    selectedColorId = document.getElementById('selected-color-id' + 
      target.dataset.categoryid);
    selectedBgHex = document.getElementById('selected-bg-hex' + 
      target.dataset.categoryid);
    selectedFgHex = document.getElementById('selected-fg-hex' +
      target.dataset.categoryid);
    selectedColorName = document.getElementById('selected-color-name' + 
      target.dataset.categoryid);

    editColorLabel.setAttribute('style', 'background-color: ' + 
       target.dataset.bghex);
    editColorName.textContent = target.dataset.color;
    // Hide the dropdown since the user has selected a color
    editColorContent.classList.remove('show');
    editColorContent.classList.add('hidden');
  } else if (options.newColor) {
    // New Color Mode
    var newColorLabel = document.getElementById('new-color-label');
    var newColorContent = document.getElementById('new-color-content');
    var newColorName = document.getElementById('new-color-name');
    selectedColorId = document.getElementById('selected-color-id');
    selectedBgHex = document.getElementById('selected-bg-hex');
    selectedFgHex = document.getElementById('selected-fg-hex');
    selectedColorName = document.getElementById('selected-color-name');

    newColorLabel.setAttribute('style', 'background-color: ' + 
       target.dataset.bghex);
    newColorName.textContent = target.dataset.color;
    // Hide the dropdown since the user has selected a color
    newColorContent.classList.remove('show');
    newColorContent.classList.add('hidden');
  }
  // Update the hidden 'selected' inputs that hold colorId and bgHex. 
  // These will be used to update the 'current' hidden fields when 
  // the save button is clicked and everything is saved to the db
  selectedColorId.value = target.dataset.colorid;
  selectedBgHex.value = target.dataset.bghex;
  selectedFgHex.value = target.dataset.fghex;
  selectedColorName.value =  target.dataset.color;
};
