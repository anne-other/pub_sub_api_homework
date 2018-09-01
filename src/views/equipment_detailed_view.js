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
      this.render(equipmentItem["equipment_category"]);
      // console.log(equipmentItem["equipment_category"]);
    };
  })
};

EquipmentDetailView.prototype.render = function (key) {
  // console.log(key);
  const listItem = document.createElement('li');
  listItem.textContent = `${key}`;
  this.list.appendChild(listItem);
};

module.exports = EquipmentDetailView;
