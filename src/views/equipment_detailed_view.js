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
      if (equipmentItem.weight) {
        this.render("Weight", equipmentItem.weight)
      }
      const cost = `${equipmentItem.cost.quantity} ${equipmentItem.cost.unit}`
      this.render("Cost", cost);
      // console.log(equipmentItem["equipment_category"]);
      switch (equipmentItem.equipment_category) {
        case "Weapon":
        this.renderWeapon(equipmentItem);
        break;
        case "Armor":
        this.renderArmor(equipmentItem);
        break;
        case "Adventuring Gear":
        this.renderGear(equipmentItem);
        break;
        case "Tools":
        this.renderGear(equipmentItem);
        break;
        case "Mounts and Vehicles":
        this.renderMountsAndVehicles(equipmentItem);
        break;
        default:
      }
    };
  })
};

EquipmentDetailView.prototype.render = function (key, value) {
  // console.log(key);
  const listItem = document.createElement('li');
  listItem.textContent = `${key}: ${value}`;
  this.list.appendChild(listItem);
};

EquipmentDetailView.prototype.renderWeapon = function (item) {
  this.render("Weapon Category", item["weapon_category:"]);
};

EquipmentDetailView.prototype.renderArmor = function (item) {
  this.render("Armor Category", item.armor_category);
};

EquipmentDetailView.prototype.renderGear = function (item) {
  if (item.desc) {
    this.render("Description", item.desc);
  }
};

EquipmentDetailView.prototype.renderMountsAndVehicles = function (item) {
  this.render("Vehicle Category", item.vehicle_category);
};

module.exports = EquipmentDetailView;
