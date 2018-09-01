const PubSub = require('../helpers/pub_sub.js');

const EquipmentView = function (container) {
  this.container = container
}

EquipmentView.prototype.bindEvents = function () {
  PubSub.subscribe("Equipment:equipment-data-loaded", (event) => {
    const equipment = event.detail;
    console.log(equipment);
  })
};

module.exports = EquipmentView;
