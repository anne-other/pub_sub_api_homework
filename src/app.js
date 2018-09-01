const Equipment = require('./models/equipment.js');
const EquipmentView = require('./views/equipment_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const equipment = new Equipment();
  equipment.details();

  const equipmentDetail = document.querySelector('#equipment');
  const equipmentView = new EquipmentView(equipmentDetail);
  equipmentView.bindEvents();

  equipment.getEquipment();
})
