'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('GroupImages', [
      { groupId: 1, url: "www.notAReakWebsite.com", preview: true},
      { groupId: 2, url: "www.someChesse.org", preview: false},
      { groupId: 3, url: "www.ILoveHam.com", preview: true}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('GroupImages', {
      groupId: { [Op.in]: [1, 2, 3]}
    }, {});
  }
};
