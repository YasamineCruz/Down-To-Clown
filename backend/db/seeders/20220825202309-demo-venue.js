'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Venues', [
      { groupId: 1, address: "Boulevard of broken dreams", city: "Portland", state: "OR", lat: 9.3, lng: 8.2 },
      { groupId: 2, address: "Elm Street", city: "Seattle", state: "WA", lat: 2.1, lng: 144.2 },
      { groupId: 3, address: "777 cash now Ave", city: "Sacremento", state: "CA", lat: 23.1, lng: 12.4 },
      { groupId: 1, address: "Online", city: "NA", state: "NA", lat: 0, lng: 0 },
      { groupId: 2, address: "Online", city: "NA", state: "NA", lat: 0, lng: 0 },
      { groupId: 3, address: "Online", city: "NA", state: "NA", lat: 0, lng: 0 },
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Venues', {
      groupId: { [Op.in]: [1, 2, 3]}
    }, {});
  }
};
