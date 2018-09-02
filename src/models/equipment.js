const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Equipment = function () {
  this.equipment = [];
  this.equipmentDetail = null;
  this.equipmentAllDetails = [];
}

Equipment.prototype.getEquipment = function () {
  const request = new Request("http://www.dnd5eapi.co/api/equipment")
  request.get().then((data) => {
    this.equipment = data.results;
    PubSub.publish('Equipment:equipment-data-loaded', this.equipment);
  }).catch((error) => {
    console.error(error);
  })
};

Equipment.prototype.details = function () {
  PubSub.subscribe('EquipmentView:items', (event) => {
    const url = event.detail.url;
    // console.log(url);
    const request = new Request(`${url}`)
    request.get().then((data) => {
      this.equipmentDetail = data;
      this.equipmentAllDetails.push(this.equipmentDetail)
      PubSub.publish('Equipment:equipment-detail-data-loaded', this.equipmentDetail);
      if (this.equipmentAllDetails.length === this.equipment.length) {
        this.typeList();
      }
    }).catch((error) => {
      console.error(error);
    })
  })
};

Equipment.prototype.typeList = function () {
  this.catagories = this.catagoryList();
  this.catagories = this.uniqueCatagoryList();
  PubSub.publish('Equipment:Catagories_ready', this.catagories);
}

Equipment.prototype.catagoryList = function () {
  const fullList = this.equipmentAllDetails.map(equipment => equipment.equipment_category);
  return fullList;
};

Equipment.prototype.uniqueCatagoryList = function () {
  return this.catagoryList().filter((equipment, index, array) => {
    return array.indexOf(equipment) === index;
  })
};

Equipment.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:change', (event) => {
    console.log(event.detail);
  })
};

module.exports = Equipment;
