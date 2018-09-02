const Equipment = require('./models/equipment.js');
const EquipmentView = require('./views/equipment_view.js');
const SelectView = require('./views/select_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const selectCatagory = document.querySelector('select#catagory-select')
  const selectView = new SelectView(selectCatagory);
  selectView.bindEvents();

  const equipment = new Equipment();
  equipment.details();

  const equipmentDetail = document.querySelector('#equipment');
  const equipmentView = new EquipmentView(equipmentDetail);
  equipmentView.bindEvents();

  equipment.getEquipment();
})
