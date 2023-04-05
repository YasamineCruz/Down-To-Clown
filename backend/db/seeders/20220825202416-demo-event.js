'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Events', [
      { 
        venueId: 1, 
        groupId: 1, 
        name: "Bees", 
        description: "Bees for weeks", 
        type: "In person", 
        capacity: 34, 
        price: 23, 
        startDate: "2023-11-19 20:00:00", 
        endDate: "2023-11-20 20:00:00"
       },
      { 
        venueId: 2, 
        groupId: 2, 
        name: "Shark Week", 
        description: "Shark week", 
        type: "Online", 
        capacity: 23, 
        price: 21, 
        startDate: "2023-11-21 20:00:00", 
        endDate: "2023-11-22 20:00:00" 
      },
      { 
        venueId: 3, 
        groupId: 3, 
        name: "Community outreach", 
        description: "Reaching others", 
        type: "In person", 
        capacity: 40, 
        price: 33, 
        startDate: "2023-11-23 20:00:00", 
        endDate: "2023-11-24 21:00:00" 
      },
      { 
        venueId: 4, 
        groupId: 4, 
        name: "Gardening for Beginners", 
        description: "Learn how to grow your own herbs and vegetables", 
        type: "In person", 
        capacity: 20, 
        price: 15, 
        startDate: "2023-11-25 09:00:00", 
        endDate: "2023-11-25 11:00:00" 
      },
      { 
        venueId: 5, 
        groupId: 5, 
        name: "Introduction to Coding", 
        description: "Learn the basics of HTML, CSS, and JavaScript", 
        type: "Online", 
        capacity: 30, 
        price: 10, 
        startDate: "2023-11-26 14:00:00", 
        endDate: "2023-11-26 16:00:00" 
      },
      { 
        venueId: 6,
        groupId: 6, 
        name: "Yoga for Stress Relief", 
        description: "Relax and rejuvenate with a gentle yoga practice", 
        type: "In person", 
        capacity: 25, 
        price: 20, 
        startDate: "2023-11-27 10:00:00", 
        endDate: "2023-11-27 11:30:00"
       },
      { 
        venueId: 7,
        groupId: 7, 
        name: "Virtual Wine Tasting", 
        description: "Taste and learn about different wines from the comfort of your own home", 
        type: "Online", 
        capacity: 50, 
        price: 30, 
        startDate: "2023-11-28 19:00:00", 
        endDate: "2023-11-28 20:30:00" },
      { 
        venueId: 8, 
        groupId: 8, 
        name: "Charity 5K Run", 
        description: "Raise money for a good cause while getting some exercise", 
        type: "In person", 
        capacity: 100, 
        price: 25, 
        startDate: "2023-11-29 08:00:00", 
        endDate: "2023-11-29 10:00:00" 
      },
      { 
        venueId: 9, 
        groupId: 9, 
        name: "Introduction to Watercolor Painting", 
        description: "Learn the basics of watercolor painting", 
        type: "In person", 
        capacity: 15, 
        price: 25, 
        startDate: "2023-11-30 13:00:00", 
        endDate: "2023-11-30 15:00:00" 
      },
      { 
        venueId: 10, 
        groupId: 10, 
        name: "Virtual Book Club", 
        description: "Discuss and review a different book each month", 
        type: "Online", 
        capacity: 40, 
        price: 0, 
        startDate: "2023-12-01 19:00:00", 
        endDate: "2023-12-01 20:30:00" 
      },
      { 
        venueId: 11, 
        groupId: 11, 
        name: "Cooking with Spices", 
        description: "Learn how to use spices to enhance your cooking", 
        type: "In person", 
        capacity: 20, 
        price: 30, 
        startDate: "2023-12-02 17:00:00", 
        endDate: "2023-12-02 19:00:00" 
      },
      { 
        venueId: 12, 
        groupId: 12, 
        name: "Virtual Language Exchange", 
        description: "Practice speaking a foreign language with native speakers", 
        type: "Online", 
        capacity: 50, 
        price: 0, 
        startDate: "2023-12-03 15:00:00", 
        endDate: "2023-12-03 16:30:00" 
      },
      {
        venueId: 13,
        groupId: 13,
        name: "Mindfulness Meditation",
        description: "Learn techniques to calm your mind and reduce stress",
        type: "In person",
        capacity: 15,
        price: 25,
        startDate: "2023-12-04 10:00:00",
        endDate: "2023-12-04 11:30:00"
      },
      {
        venueId: 14,
        groupId: 14,
        name: "Virtual Photography Workshop",
        description: "Learn photography basics and techniques from professional photographers",
        type: "Online",
        capacity: 30,
        price: 40,
        startDate: "2023-12-05 14:00:00",
        endDate: "2023-12-05 16:00:00"
      },
      {
        venueId: 15,
        groupId: 15,
        name: "Healthy Cooking Class",
        description: "Learn how to cook healthy meals that are both delicious and nutritious",
        type: "In person",
        capacity: 25,
        price: 35,
        startDate: "2023-12-06 18:00:00",
        endDate: "2023-12-06 20:00:00"
      },
      {
        venueId: 16,
        groupId: 16,
        name: "Virtual Writing Workshop",
        description: "Develop your writing skills through writing exercises and feedback from other writers",
        type: "Online",
        capacity: 20,
        price: 50,
        startDate: "2023-12-07 17:00:00",
        endDate: "2023-12-07 19:00:00"
      },
      {
        venueId: 17,
        groupId: 17,
        name: "Yoga for Beginners",
        description: "Learn the basics of yoga and improve your flexibility and balance",
        type: "In person",
        capacity: 30,
        price: 20,
        startDate: "2023-12-08 11:00:00",
        endDate: "2023-12-08 12:30:00"
      },
      {
        venueId: 18,
        groupId: 18,
        name: "Virtual Wine and Cheese Pairing",
        description: "Learn how to pair wine and cheese like a pro",
        type: "Online",
        capacity: 50,
        price: 45,
        startDate: "2023-12-09 19:00:00",
        endDate: "2023-12-09 20:30:00"
      },
      {
        venueId: 19,
        groupId: 19,
        name: "Introduction to Pottery",
        description: "Learn how to make basic pottery pieces using a pottery wheel",
        type: "In person",
        capacity: 10,
        price: 50,
        startDate: "2023-12-10 13:00:00",
        endDate: "2023-12-10 15:00:00"
      },
      {
        venueId: 20,
        groupId: 20,
        name: "Virtual Board Game Night",
        description: "Play board games with people from all over the world",
        type: "Online",
        capacity: 30,
        price: 0,
        startDate: "2023-12-11 19:00:00",
        endDate: "2023-12-11 21:00:00"
      }, 
      {
        venueId: 21,
        groupId: 21,
        name: "Guitar Lessons for Beginners",
        description: "Learn how to play guitar with expert musicians",
        type: "In person",
        capacity: 10,
        price: 50,
        startDate: "2023-12-06 16:00:00",
        endDate: "2023-12-06 18:00:00"
      },
      {
        venueId: 22,
        groupId: 22,
        name: "Virtual Chess Tournament",
        description: "Compete with other chess players from around the world",
        type: "Online",
        capacity: 100,
        price: 10,
        startDate: "2023-12-07 12:00:00",
        endDate: "2023-12-07 14:00:00"
      },
      {
        venueId: 23,
        groupId: 23,
        name: "Pottery Making",
        description: "Create your own pottery with experienced potters",
        type: "In person",
        capacity: 12,
        price: 30,
        startDate: "2023-12-08 11:00:00",
        endDate: "2023-12-08 13:00:00"
      },
      {
        venueId: 24,
        groupId: 24,
        name: "Virtual Wine and Cheese Pairing",
        description: "Learn how to pair different types of cheese with wine",
        type: "Online",
        capacity: 20,
        price: 35,
        startDate: "2023-12-09 18:00:00",
        endDate: "2023-12-09 20:00:00"
      },
      {
        venueId: 25,
        groupId: 25,
        name: "Introduction to Potpourri Making",
        description: "Learn how to make your own potpourri with natural ingredients",
        type: "In person",
        capacity: 8,
        price: 20,
        startDate: "2023-12-10 14:00:00",
        endDate: "2023-12-10 16:00:00"
      },
      {
        venueId: 26,
        groupId: 26,
        name: "Virtual Stand-up Comedy Night",
        description: "Enjoy a night of laughter with professional comedians",
        type: "Online",
        capacity: 50,
        price: 15,
        startDate: "2023-12-11 20:00:00",
        endDate: "2023-12-11 21:30:00"
      },
      {
        venueId: 27,
        groupId: 27,
        name: "Introduction to Sewing",
        description: "Learn the basics of sewing and make your own projects",
        type: "In person",
        capacity: 15,
        price: 25,
        startDate: "2023-12-12 10:00:00",
        endDate: "2023-12-12 12:00:00"
      },
      {
        venueId: 28,
        groupId: 28,
        name: "Virtual Tea Tasting",
        description: "Taste and learn about different types of tea from around the world",
        type: "Online",
        capacity: 30,
        price: 20,
        startDate: "2023-12-13 15:00:00",
        endDate: "2023-12-13 17:00:00"
      },
      {
        venueId: 29,
        groupId: 29,
        name: "Paint and Sip",
        description: "Create your own masterpiece while enjoying a glass of wine",
        type: "In person",
        capacity: 25,
        price: 35,
        startDate: "2023-12-06 18:00:00",
        endDate: "2023-12-06 20:00:00"
      },
      {
        venueId: 30,
        groupId: 30,
        name: "Virtual Wine and Cheese Pairing",
        description: "Learn about wine and cheese pairings from a certified sommelier",
        type: "Online",
        capacity: 30,
        price: 45,
        startDate: "2023-12-07 19:00:00",
        endDate: "2023-12-07 20:30:00"
      },
      {
        venueId: 31,
        groupId: 31,
        name: "Beginner's Knitting Class",
        description: "Learn the basics of knitting and create your own scarf",
        type: "In person",
        capacity: 10,
        price: 20,
        startDate: "2023-12-08 11:00:00",
        endDate: "2023-12-08 13:00:00"
      },
      {
        venueId: 32,
        groupId: 32,
        name: "Virtual History Tour",
        description: "Explore historic landmarks and learn about their significance",
        type: "Online",
        capacity: 50,
        price: 15,
        startDate: "2023-12-09 14:00:00",
        endDate: "2023-12-09 15:30:00"
      },
      {
        venueId: 33,
        groupId: 33,
        name: "Beginner's Yoga",
        description: "Learn the basics of yoga and proper form",
        type: "In person",
        capacity: 30,
        price: 15,
        startDate: "2023-12-10 09:00:00",
        endDate: "2023-12-10 10:30:00"
      },
      {
        venueId: 34,
        groupId: 34,
        name: "Virtual Career Development Workshop",
        description: "Learn how to advance your career and land your dream job",
        type: "Online",
        capacity: 50,
        price: 25,
        startDate: "2023-12-11 13:00:00",
        endDate: "2023-12-11 14:30:00"
      },
      {
        venueId: 35,
        groupId: 35,
        name: "Holiday Baking Class",
        description: "Learn how to bake festive treats for the holiday season",
        type: "In person",
        capacity: 15,
        price: 30,
        startDate: "2023-12-12 14:00:00",
        endDate: "2023-12-12 16:00:00"
      },
      {
        venueId: 36,
        groupId: 36,
        name: "Virtual Creative Writing Workshop",
        description: "Improve your writing skills and get feedback from other writers",
        type: "Online",
        capacity: 20,
        price: 20,
        startDate: "2023-12-13 18:00:00",
        endDate: "2023-12-13 19:30:00"
      },
      {
        venueId: 37,
        groupId: 37,
        name: "Holiday Card Making Workshop",
        description: "Create beautiful handmade cards for the holiday season",
        type: "In person",
        capacity: 20,
        price: 20,
        startDate: "2023-12-06 14:00:00",
        endDate: "2023-12-06 16:00:00"
        },
        {
        venueId: 38,
        groupId: 38,
        name: "Virtual Fitness Class",
        description: "Get your heart rate up with a fun and challenging workout",
        type: "Online",
        capacity: 50,
        price: 15,
        startDate: "2023-12-07 18:00:00",
        endDate: "2023-12-07 19:00:00"
        },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Events', {
      venueId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
