const Equipment = require('./models/equipment.js');

document.addEventListener('DOMContentLoaded', () => {
  const equipment = new Equipment();
  equipment.getEquipment();
})
