const PubSub = require('../helpers/pub_sub.js');
const EquipmentView = require('./equipment_view.js');

const EquipmentDetailView = function (container, item) {
  this.container = container;
  this.item = item;
}

EquipmentDetailView.prototype.getDetail = function () {
  PubSub.subscribe('Equipment:equipment-detail-data-loaded', (event) => {
    const equipmentItem = event.detail;
    if (equipmentItem.name === this.item.name) {
      // console.log(equipmentItem);
      this.list = document.createElement('ul');
      this.container.appendChild(this.list);
      this.render("Catagory", equipmentItem.equipment_category);
      this.render("Weight", equipmentItem.weight)
      const cost = `${equipmentItem.cost.quantity} ${equipmentItem.cost.unit}`
      this.render("Cost", cost);
      // console.log(equipmentItem["equipment_category"]);
    };
  })
};

EquipmentDetailView.prototype.render = function (key, value) {
  // console.log(key);
  const listItem = document.createElement('li');
  listItem.textContent = `${key}: ${value}`;
  this.list.appendChild(listItem);
};

module.exports = EquipmentDetailView;
