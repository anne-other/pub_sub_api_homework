const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (selectElement) {
  this.selectElement = selectElement;
};

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Equipment:Catagories_ready', (event) => {
    this.populateSelect(event.detail);
  })
};

SelectView.prototype.populateSelect = function (catagories) {
  catagories.forEach((catagory, index) => {
    const option = this.createCatagoryOption(catagory, index);
    this.selectElement.appendChild(option);
  })
};

SelectView.prototype.createCatagoryOption = function (catagory, index) {
  const option = document.createElement('option');
  option.textContent = catagory;
  option.value = index;
  return option;
};

module.exports = SelectView;
