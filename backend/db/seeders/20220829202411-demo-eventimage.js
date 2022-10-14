'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('EventImages', [
      { eventId: 1, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7d50FOy7JqZpyvJKy06IwQIQnx9SmiKgHyg&usqp=CAU", preview: true},
      { eventId: 2, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS9QdL7H4e-lkRQZIvpfd8tB8vmmCd28LETQ&usqp=CAU", preview: false},
      { eventId: 3, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyhGXxVSYLiVxrvzGd2KbKaydJ5CkGoOXyPQ&usqp=CAU", preview: true},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('EventImages', {
      eventId: { [Op.in] : [1, 2, 3] }
    }, {});
  }
};
