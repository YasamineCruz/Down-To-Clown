'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('GroupImages', [
      { groupId: 1, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pz0QzVkjFhBPzsy2OtPbfhedmBAmaq-xeg&usqp=CAU", preview: true},
      { groupId: 2, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTusRDwSCOhItdCVGImqbAWrQkcN5Egb1bHqw&usqp=CAU", preview: false},
      { groupId: 3, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwsxvLva3VHxteFNbKalYnVePnILtU_4kPSg&usqp=CAU", preview: true}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('GroupImages', {
      groupId: { [Op.in]: [1, 2, 3]}
    }, {});
  }
};
