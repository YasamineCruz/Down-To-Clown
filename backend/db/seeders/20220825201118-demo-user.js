'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Users', [
    {
      email: 'demo@user.io',
      username: 'Demo-lition',
      firstName: "McMinny",
      lastName: "TheFrog",
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'user1@user.io',
      username: 'FakeUser1',
      firstName: "Sam",
      lastName: "gamgee",
      hashedPassword: bcrypt.hashSync('password2')
    },
    {
      email: 'user2@user.io',
      username: 'FakeUser2',
      firstName: "Elliot",
      lastName: "Page",
      hashedPassword: bcrypt.hashSync('password3')
    },
    {
    email: 'john.doe@example.com',
    username: 'johndoe',
    firstName: "John",
    lastName: "Doe",
    hashedPassword: bcrypt.hashSync('password4')
    },
    {
    email: 'jane.doe@example.com',
    username: 'janedoe',
    firstName: "Jane",
    lastName: "Doe",
    hashedPassword: bcrypt.hashSync('password5')
    },
    {
    email: 'alex.smith@example.com',
    username: 'alexsmith',
    firstName: "Alex",
    lastName: "Smith",
    hashedPassword: bcrypt.hashSync('password6')
    },
    {
    email: 'julia.brown@example.com',
    username: 'juliabrown',
    firstName: "Julia",
    lastName: "Brown",
    hashedPassword: bcrypt.hashSync('password7')
    },
    {
    email: 'mike.jones@example.com',
    username: 'mikejones',
    firstName: "Mike",
    lastName: "Jones",
    hashedPassword: bcrypt.hashSync('password8')
    },
    {
    email: 'sara.wilson@example.com',
    username: 'sarawilson',
    firstName: "Sara",
    lastName: "Wilson",
    hashedPassword: bcrypt.hashSync('password9')
    },
    {
    email: 'david.johnson@example.com',
    username: 'davidjohnson',
    firstName: "David",
    lastName: "Johnson",
    hashedPassword: bcrypt.hashSync('password10')
    },
    {
    email: 'jessica.taylor@example.com',
    username: 'jessicataylor',
    firstName: "Jessica",
    lastName: "Taylor",
    hashedPassword: bcrypt.hashSync('password11')
    },
    {
    email: 'marcus.jackson@example.com',
    username: 'marcusjackson',
    firstName: "Marcus",
    lastName: "Jackson",
    hashedPassword: bcrypt.hashSync('password12')
    },
    {
    email: 'olivia.garcia@example.com',
    username: 'oliviagarcia',
    firstName: "Olivia",
    lastName: "Garcia",
    hashedPassword: bcrypt.hashSync('password13')
    },
    {
    email: 'chris.thomas@example.com',
    username: 'christhomas',
    firstName: "Chris",
    lastName: "Thomas",
    hashedPassword: bcrypt.hashSync('password14')
    },
    {
    email: 'emily.hernandez@example.com',
    username: 'emilyhernandez',
    firstName: "Emily",
    lastName: "Hernandez",
    hashedPassword: bcrypt.hashSync('password15')
    },
    {
    email: 'kevin.johnson@example.com',
    username: 'kevinjohnson',
    firstName: "Kevin",
    lastName: "Johnson",
    hashedPassword: bcrypt.hashSync('password16')
    },
    {
    email: 'megan.martin@example.com',
    username: 'meganmartin',
    firstName: "Megan",
    lastName: "Martin",
    hashedPassword: bcrypt.hashSync('password17')
    },
    {
    email: 'jake.roberts@example.com',
    username: 'jakeroberts',
    firstName: "Jake",
    lastName: "Roberts",
    hashedPassword: bcrypt.hashSync('password18')
    },
    {
      email: 'julie.davis@example.com',
      username: 'juliedavis',
      firstName: "Julie",
      lastName: "Davis",
      hashedPassword: bcrypt.hashSync('password19')
      },
      {
      email: 'ryan.jones@example.com',
      username: 'ryanjones',
      firstName: "Ryan",
      lastName: "Jones",
      hashedPassword: bcrypt.hashSync('password20')
      },
      {
      email: 'lauren.smith@example.com',
      username: 'laurensmith',
      firstName: "Lauren",
      lastName: "Smith",
      hashedPassword: bcrypt.hashSync('password21')
      },
      {
      email: 'steve.williams@example.com',
      username: 'stevewilliams',
      firstName: "Steve",
      lastName: "Williams",
      hashedPassword: bcrypt.hashSync('password22')
      },
      {
      email: 'brittany.white@example.com',
      username: 'brittanywhite',
      firstName: "Brittany",
      lastName: "White",
      hashedPassword: bcrypt.hashSync('password23')
      },
      {
      email: 'daniel.jones@example.com',
      username: 'danieljones',
      firstName: "Daniel",
      lastName: "Jones",
      hashedPassword: bcrypt.hashSync('password24')
      },
      {
      email: 'carolyn.brown@example.com',
      username: 'carolynbrown',
      firstName: "Carolyn",
      lastName: "Brown",
      hashedPassword: bcrypt.hashSync('password25')
      },
      {
      email: 'james.thomas@example.com',
      username: 'jamesthomas',
      firstName: "James",
      lastName: "Thomas",
      hashedPassword: bcrypt.hashSync('password26')
      },
      {
      email: 'samantha.baker@example.com',
      username: 'samanthabaker',
      firstName: "Samantha",
      lastName: "Baker",
      hashedPassword: bcrypt.hashSync('password27')
      },
      {
      email: 'nathan.adams@example.com',
      username: 'nathanadams',
      firstName: "Nathan",
      lastName: "Adams",
      hashedPassword: bcrypt.hashSync('password28')
      },
      {
      email: 'katie.nelson@example.com',
      username: 'katienelson',
      firstName: "Katie",
      lastName: "Nelson",
      hashedPassword: bcrypt.hashSync('password29')
      },
      {
      email: 'joshua.hernandez@example.com',
      username: 'joshuahernandez',
      firstName: "Joshua",
      lastName: "Hernandez",
      hashedPassword: bcrypt.hashSync('password30')
      },
      {
      email: 'amanda.johnson@example.com',
      username: 'amandajohnson',
      firstName: "Amanda",
      lastName: "Johnson",
      hashedPassword: bcrypt.hashSync('password31')
      },
      {
      email: 'brandon.hall@example.com',
      username: 'brandonhall',
      firstName: "Brandon",
      lastName: "Hall",
      hashedPassword: bcrypt.hashSync('password32')
      },
      {
      email: 'erica.mitchell@example.com',
      username: 'ericamitchell',
      firstName: "Erica",
      lastName: "Mitchell",
      hashedPassword: bcrypt.hashSync('password33')
      },
      {
      email: 'peter.jackson@example.com',
      username: 'peterjackson',
      firstName: "Peter",
      lastName: "Jackson",
      hashedPassword: bcrypt.hashSync('password34')
      },
      {
        email: 'ryan.miller@example.com',
        username: 'ryanmiller',
        firstName: "Ryan",
        lastName: "Miller",
        hashedPassword: bcrypt.hashSync('password35')
        },
        {
        email: 'elizabeth.williams@example.com',
        username: 'elizabethwilliams',
        firstName: "Elizabeth",
        lastName: "Williams",
        hashedPassword: bcrypt.hashSync('password36')
        },
        {
        email: 'jacob.young@example.com',
        username: 'jacodyoung',
        firstName: "Jacob",
        lastName: "Young",
        hashedPassword: bcrypt.hashSync('password37')
        },
        {
        email: 'grace.thompson@example.com',
        username: 'gracethompson',
        firstName: "Grace",
        lastName: "Thompson",
        hashedPassword: bcrypt.hashSync('password38')
        },
   ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
