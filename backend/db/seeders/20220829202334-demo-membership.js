'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Memberships', [
      { userId: 1, groupId: 1, status: 'organizer'},
      { userId: 2, groupId: 2, status: 'organizer'},
      { userId: 3, groupId: 3, status: 'organizer'}, 
      { userId: 4, groupId: 4, status: 'organizer'},
      { userId: 5, groupId: 5, status: 'organizer'},
      { userId: 6, groupId: 6, status: 'organizer'},
      { userId: 7, groupId: 7, status: 'organizer' },
      { userId: 8, groupId: 8, status: 'organizer' },
      { userId: 9, groupId: 9, status: 'organizer' },
      { userId: 10, groupId: 10, status: 'organizer' },
      { userId: 11, groupId: 11, status: 'organizer' },
      { userId: 12, groupId: 12, status: 'organizer' },
      { userId: 13, groupId: 13, status: 'organizer' },
      { userId: 14, groupId: 14, status: 'organizer' },
      { userId: 15, groupId: 15, status: 'organizer' },
      { userId: 16, groupId: 16, status: 'organizer' },
      { userId: 17, groupId: 17, status: 'organizer' },
      { userId: 18, groupId: 18, status: 'organizer' },
      { userId: 19, groupId: 19, status: 'organizer' },
      { userId: 20, groupId: 20, status: 'organizer' },
      { userId: 21, groupId: 21, status: 'organizer' },
      { userId: 22, groupId: 22, status: 'organizer' },
      { userId: 23, groupId: 23, status: 'organizer' },
      { userId: 24, groupId: 24, status: 'organizer' },
      { userId: 25, groupId: 25, status: 'organizer' },
      { userId: 26, groupId: 26, status: 'organizer' },
      { userId: 27, groupId: 27, status: 'organizer' },
      { userId: 28, groupId: 28, status: 'organizer' },
      { userId: 29, groupId: 29, status: 'organizer' },
      { userId: 30, groupId: 30, status: 'organizer' },
      { userId: 31, groupId: 31, status: 'organizer' },
      { userId: 32, groupId: 32, status: 'organizer' },
      { userId: 33, groupId: 33, status: 'organizer' },
      { userId: 34, groupId: 34, status: 'organizer' },
      { userId: 35, groupId: 35, status: 'organizer' },
      { userId: 36, groupId: 36, status: 'organizer' },
      { userId: 37, groupId: 37, status: 'organizer' },
      { userId: 38, groupId: 38, status: 'organizer' },
      { userId: 33, groupId: 3, status: 'member' },
      { userId: 4, groupId: 4, status: 'member' },
      { userId: 1, groupId: 1, status: 'member' },
      { userId: 2, groupId: 2, status: 'member' },
      { userId: 3, groupId: 3, status: 'member' },
      { userId: 14, groupId: 4, status: 'member' },
      { userId: 5, groupId: 1, status: 'member' },
      { userId: 16, groupId: 2, status: 'member' },
      { userId: 17, groupId: 3, status: 'member' },
      { userId: 18, groupId: 4, status: 'member' },
      { userId: 19, groupId: 1, status: 'member' },
      { userId: 25, groupId: 2, status: 'member' },
      { userId: 31, groupId: 3, status: 'member' },
      { userId: 32, groupId: 4, status: 'member' },
      { userId: 13, groupId: 1, status: 'member' },
      { userId: 24, groupId: 2, status: 'member' },
      { userId: 35, groupId: 3, status: 'member' },
      { userId: 16, groupId: 4, status: 'member' },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Memberships', {
      userId: { [Op.in] : [1, 2, 3] }
    }, {});
  }
};
