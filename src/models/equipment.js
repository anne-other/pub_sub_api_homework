const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Equipment = function () {
  this.equipment = [];
}

Equipment.prototype.getEquipment = function () {
  const request = new Request("http://www.dnd5eapi.co/api/equipment")
  request.get().then((data) => {
    this.data = data;
    PubSub.publish('Equipment:equipment-data-loaded', this.data);
  }).catch((error) => {
    console.error(error);
  })
};

module.exports = Equipment;
