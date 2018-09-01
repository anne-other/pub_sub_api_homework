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

Dogs.prototype.getData = function (breed) {
  const url = `https://dog.ceo/api/breed/${ breed }/images`;
  const request = new Request(url);
  request.get().then((data) => {
    this.data = data.message;
    PubSub.publish('Dogs:dog-data-loaded', this.data);
  }).catch((err) => {
    console.error(err);
  });
}

module.exports = Equipment;
