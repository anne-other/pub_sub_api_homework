const Equipment = require('./models/equipment.js');
const EquipmentView = require('./views/equipment_view.js');
const SelectView = require('./views/select_view.js');
const FilteredView = require('./views/filtered_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const equipmentDetail = document.querySelector('#equipment');
  const filteredView = new FilteredView(equipmentDetail);
  filteredView.bindEvents();

  const equipment = new Equipment();
  equipment.bindEvents();

  const selectCatagory = document.querySelector('select#catagory-select')
  const selectView = new SelectView(selectCatagory);
  selectView.bindEvents();

  equipment.details();

  const equipmentView = new EquipmentView(equipmentDetail);
  equipmentView.bindEvents();

  equipment.getEquipment();
})
