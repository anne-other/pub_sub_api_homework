const PubSub = require('../helpers/pub_sub.js');
const EquipmentDetailView = require('./equipment_detailed_view.js');

const FilteredView = function (container) {
  this.container = container
  this.equipment = [];
}

FilteredView.prototype.bindEvents = function () {
  PubSub.subscribe('Equipment:slected-equipment-ready', (event) => {
    this.equipment = event.detail;
    this.render();
  })
};

FilteredView.prototype.render = function () {
  this.container.innerHTML = "";
  this.equipment.forEach((item) => {
    const equipmentItem = item;
    const listItem = document.createElement('h2');
    listItem.textContent = item.name;
    this.container.appendChild(listItem);
    const equipmentDetailView = new EquipmentDetailView(listItem, item);
    equipmentDetailView.getDetail();
    PubSub.publish('Equipment:equipment-detail-data-loaded', equipmentItem);
  })
};

module.exports = FilteredView;
