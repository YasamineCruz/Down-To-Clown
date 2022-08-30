'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Groups', [
      { organizerId: 1, name: "Team Spirit", about: "We realy want to show people that you can be excited about anything and everything.", type: 'Online', private: true, city: "Portland", state: "OR"},
      { organizerId: 2, name: "Old Guys that can Sing", about: "Group for older gents that enjoy a variety of singing and shenanigans.", type: 'In person', private: false, city: "Seattle", state: "WA"},
      { organizerId: 3, name: "Sugar, Spice, and everything Nice", about: "A younger generation of grils killing it in every way.", type: 'Online', private: true, city: "Sacremento", state: "CA"}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Groups', {
      organizeId: { [Op.in]: [ 1, 2, 3] }
    }, {});
  }
};
