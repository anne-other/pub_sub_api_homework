const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Equipment = function () {
  this.equipment = [];
  this.equipmentDetail = null;
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
      PubSub.publish('Equipment:equipment-detail-data-loaded', this.equipmentDetail);
    }).catch((error) => {
      console.error(error);
    })
  })
};

module.exports = Equipment;
