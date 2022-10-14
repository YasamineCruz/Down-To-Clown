'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('GroupImages', [
      { groupId: 1, url: "https://i.pinimg.com/736x/d4/8c/2d/d48c2de0debd3bef102256f979862bbd--group-photography-photography-tricks.jpg", preview: true},
      { groupId: 2, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTusRDwSCOhItdCVGImqbAWrQkcN5Egb1bHqw&usqp=CAU", preview: false},
      { groupId: 3, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ZcHy-g_K1axV_4d8Te_boHCq3tgUktEgWA&usqp=CAU", preview: true}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('GroupImages', {
      groupId: { [Op.in]: [1, 2, 3]}
    }, {});
  }
};
