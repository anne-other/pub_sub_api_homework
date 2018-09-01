const PubSub = require('../helpers/pub_sub.js');
const EquipmentView = require('./equipment_view.js');

const EquipmentDetailView = function (container, item) {
  this.container = container;
  this.item = item;
}

EquipmentDetailView.prototype.getDetail = function () {
  PubSub.subscribe('Equipment:equipment-detail-data-loaded', (event) => {
    console.log(event.detail);
  })
};

module.exports = EquipmentDetailView;
