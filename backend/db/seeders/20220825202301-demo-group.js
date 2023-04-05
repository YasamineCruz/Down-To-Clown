'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Groups', [
      { organizerId: 1, name: "Team Spirit", about: "We realy want to show people that you can be excited about anything and everything.", type: 'Online', private: true, city: "Portland", state: "OR"},
      { organizerId: 2, name: "Old Guys that can Sing", about: "Group for older gents that enjoy a variety of singing and shenanigans.", type: 'In person', private: false, city: "Seattle", state: "WA"},
      { organizerId: 3, name: "Sugar, Spice, and everything Nice", about: "A younger generation of grils killing it in every way.", type: 'Online', private: true, city: "Sacremento", state: "CA"},
      { organizerId: 4, name: "Fitness Fanatics", about: "Join us for workout challenges, tips and tricks to stay fit and healthy.", type: 'In person', private: false, city: "New York", state: "NY"},
      { organizerId: 5, name: "Bookworms Club", about: "A group of people who love reading and discussing books.", type: 'Online', private: true, city: "Chicago", state: "IL"},
      { organizerId: 6, name: "Nature Lovers", about: "We explore the beauty of nature and promote eco-friendliness.", type: 'In person', private: false, city: "Denver", state: "CO"},
      { organizerId: 7, name: "Chess Club", about: "A community of chess enthusiasts, who enjoy playing and learning from each other.", type: 'Online', private: true, city: "San Francisco", state: "CA"},
      { organizerId: 8, name: "Dance Fever", about: "A group that loves to dance and learn new styles, from salsa to hip hop.", type: 'In person', private: false, city: "Miami", state: "FL"},
      { organizerId: 9, name: "Crafty Crew", about: "A group for those who enjoy crafting and DIY projects.", type: 'Online', private: true, city: "Austin", state: "TX"},
      { organizerId: 10, name: "Foodies Unite", about: "We love exploring new cuisines and sharing our favorite recipes.", type: 'In person', private: false, city: "San Diego", state: "CA"},
      { organizerId: 11, name: "Adventure Seekers", about: "We go on thrilling expeditions, from hiking to kayaking.", type: 'In person', private: false, city: "Portland", state: "ME"},
      { organizerId: 12, name: "Music Maniacs", about: "A community of music lovers who appreciate all genres and styles.", type: 'Online', private: true, city: "Nashville", state: "TN"},
      { organizerId: 13, name: "Movie Buffs", about: "We watch and discuss all types of movies, from indie to blockbuster hits.", type: 'In person', private: false, city: "Los Angeles", state: "CA"},
      { organizerId: 14, name: "Green Thumbs", about: "We love gardening and sharing tips on how to grow and care for plants.", type: 'Online', private: true, city: "Portland", state: "OR"},
      { organizerId: 15, name: "Pet Parents", about: "A group for pet lovers to share stories, tips, and support each other.", type: 'In person', private: false, city: "Boston", state: "MA"},
      { organizerId: 16, name: "Language Exchange", about: "We help each other learn new languages and cultures.", type: 'Online', private: true, city: "New York", state: "NY"},
      { organizerId: 17, name: "Artistic Minds", about: "A group for artists and creatives to share and discuss their work.", type: 'In person', private: false, city: "San Francisco", state: "CA"},
      { organizerId: 18, name: "Wine Enthusiasts", about: "We taste and learn about different types of wine from around the world.", type: 'In person', private: false, city: "Napa Valley", state: "CA"},
      { organizerId: 19, name: "Charity Champions", about: "We volunteer and fundraise for various charities and causes.", type: 'In person', private: false, city: "Washington D.C.", state: "DC"},
      { organizerId: 20, name: "Gamer's Guild", about: "A community of gamers who love to play and discuss games of all kinds.", type: 'Online', private: true, city: "Seattle", state: "WA"},
      { organizerId: 21, name: "Fashion Frenzy", about: "We love fashion and style, and share our tips and finds with each other.", type: 'In person', private: false, city: "New York", state: "NY"},
      { organizerId: 22, name: "Techies Unite", about: "We discuss and share our knowledge of technology and innovation.", type: 'Online', private: true, city: "San Francisco", state: "CA"},
      { organizerId: 23, name: "Yoga Enthusiasts", about: "We practice yoga and share our tips and experiences with each other.", type: 'In person', private: false, city: "Boulder", state: "CO"},
      { organizerId: 24, name: "Coffee Connoisseurs", about: "A group for those who love coffee and want to explore different roasts and brewing methods.", type: 'In person', private: false, city: "Portland", state: "OR"},
      { organizerId: 25, name: "Writing Workshop", about: "We share and critique each other's writing, from poetry to prose.", type: 'Online', private: true, city: "New York", state: "NY"},
      { organizerId: 26, name: "Film Fanatics", about: "We discuss and analyze films from all eras and genres.", type: 'In person', private: false, city: "Los Angeles", state: "CA"},
      { organizerId: 27, name: "Animal Lovers", about: "A group for those who love and advocate for animals, from pets to wildlife.", type: 'In person', private: false, city: "Denver", state: "CO"},
      { organizerId: 28, name: "Entrepreneur's Circle", about: "We support and mentor each other in our entrepreneurial endeavors.", type: 'Online', private: true, city: "San Francisco", state: "CA"},
      { organizerId: 29, name: "Hiking Club", about: "We explore and conquer new hiking trails, from mountains to forests.", type: 'In person', private: false, city: "Seattle", state: "WA"},
      { organizerId: 30, name: "Cooking Club", about: "We share recipes and techniques for cooking and baking, from savory to sweet.", type: 'In person', private: false, city: "Chicago", state: "IL"},
      { organizerId: 31, name: "Musician's Network", about: "We collaborate and perform together, from classical to rock.", type: 'In person', private: false, city: "Austin", state: "TX"},
      { organizerId: 32, name: "History Buffs", about: "We explore and discuss history, from ancient civilizations to modern times.", type: 'In person', private: false, city: "Washington D.C.", state: "DC"},
      { organizerId: 33, name: "Photography Enthusiasts", about: "We capture and share the beauty of the world through photography.", type: 'In person', private: false, city: "San Francisco", state: "CA"},
      { organizerId: 34, name: "Fashionistas", about: "We love fashion and style, and inspire each other with our outfits and looks.", type: 'In person', private: false, city: "New York", state: "NY"},
      { organizerId: 35, name: "Chess Masters", about: "A community of expert chess players, who compete and share their knowledge.", type: 'In person', private: false, city: "Chicago", state: "IL"},
      { organizerId: 36, name: "Investment Club", about: "We learn and discuss investment strategies and opportunities, from stocks to real estate.", type: 'Online', private: true, city: "New York", state: "NY"},
      { organizerId: 37, name: "Fitness for All", about: "We promote and encourage healthy lifestyles, from exercise to nutrition.", type: 'Online', private: true, city: "Los Angeles", state: "CA"},
      { organizerId: 38, name: "Book Club", about: "We read and discuss books, from classics to bestsellers.", type: 'In person', private: false, city: 'Portland', state: 'OR'},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Groups', {
      organizerId: { [Op.in]: [ 1, 2, 3] }
    }, {});
  }
};
