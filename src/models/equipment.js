const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Equipment = function () {
  this.equipment = [];
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
    console.log(event.detail);
  })
};

module.exports = Equipment;
