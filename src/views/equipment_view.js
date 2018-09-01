const PubSub = require('../helpers/pub_sub.js');

const EquipmentView = function (container) {
  this.container = container
  this.equipment = [];
}

EquipmentView.prototype.bindEvents = function () {
  PubSub.subscribe("Equipment:equipment-data-loaded", (event) => {
    this.equipment = event.detail;
    this.render();
  })
};

EquipmentView.prototype.render = function () {
  this.container.innerHTML = "";
  const list = document.createElement('ul');
  this.container.appendChild(list);
  // console.log(this.equipment);
  this.equipment.forEach((item) => {
    const equipmentItem = item;
    // console.log(item);
    const listItem = document.createElement('li');
    listItem.textContent = item.name;
    list.appendChild(listItem);
  });
};


module.exports = EquipmentView;
