const PubSub = require('../helpers/pub_sub.js');
const EquipmentDetailView = require('./equipment_detailed_view.js');

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
  // console.log(this.equipment);
  this.equipment.forEach((item) => {
    const equipmentItem = item;
    // console.log(item);
    const listItem = document.createElement('h2');
    listItem.textContent = item.name;
    this.container.appendChild(listItem);
    PubSub.publish('EquipmentView:items', item);
    const equipmentDetialView = new EquipmentDetailView(listItem, item);
    equipmentDetialView.getDetail();
  });
};


module.exports = EquipmentView;
