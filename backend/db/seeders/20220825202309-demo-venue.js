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
      { groupId: 4, address: "123 Main St", city: "New York", state: "NY", lat: 40.7, lng: -74.0 },
      { groupId: 5, address: "321 Oak Dr", city: "Los Angeles", state: "CA", lat: 34.0, lng: -118.2 },
      { groupId: 6, address: "555 Broadway", city: "Chicago", state: "IL", lat: 41.9, lng: -87.6 },
      { groupId: 7, address: "987 Park Ave", city: "San Francisco", state: "CA", lat: 37.8, lng: -122.4 },
      { groupId: 8, address: "2468 Vine St", city: "Miami", state: "FL", lat: 25.8, lng: -80.2 },
      { groupId: 9, address: "555 Fifth Ave", city: "Seattle", state: "WA", lat: 47.6, lng: -122.3 },
      { groupId: 10, address: "111 Market St", city: "Boston", state: "MA", lat: 42.4, lng: -71.1 },
      { groupId: 4, address: "Online", city: "NA", state: "NA", lat: 0, lng: 0 },
      { groupId: 5, address: "Online", city: "NA", state: "NA", lat: 0, lng: 0 },
      { groupId: 6, address: "Online", city: "NA", state: "NA", lat: 0, lng: 0 },
      { groupId: 7, address: "Online", city: "NA", state: "NA", lat: 0, lng: 0 },
      { groupId: 8, address: "Online", city: "NA", state: "NA", lat: 0, lng: 0 },
      { groupId: 9, address: "Online", city: "NA", state: "NA", lat: 0, lng: 0 },
      { groupId: 10, address: "Online", city: "NA", state: "NA", lat: 0, lng: 0 },
      { groupId: 11, address: "456 Elm St", city: "Atlanta", state: "GA", lat: 33.8, lng: -84.4 },
      { groupId: 12, address: "789 Maple Ave", city: "Dallas", state: "TX", lat: 32.8, lng: -96.8 },
      { groupId: 13, address: "321 Oak St", city: "Denver", state: "CO", lat: 39.7, lng: -104.9 },
      { groupId: 14, address: "777 7th Ave", city: "Las Vegas", state: "NV", lat: 36.1, lng: -115.2 },
      { groupId: 15, address: "999 Park St", city: "San Diego", state: "CA", lat: 32.7, lng: -117.2 },
      { groupId: 16, address: "555 Main St", city: "Houston", state: "TX", lat: 29.8, lng: -95.4 },
      { groupId: 17, address: "1234 Cedar St", city: "Philadelphia", state: "PA", lat: 39.9, lng: -75.2 },
      { groupId: 18, address: "2468 Peachtree St", city: "Atlanta", state: "GA", lat: 33.8, lng: -84.4 },
      { groupId: 19, address: "1010 Fifth Ave", city: "New York", state: "NY", lat: 40.8, lng: -73.9 },
      { groupId: 20, address: "777 Olive St", city: "Los Angeles", state: "CA", lat: 34.0, lng: -118.3 },
      { groupId: 21, address: "555 Walnut St", city: "Cincinnati", state: "OH", lat: 39.1, lng: -84.5 },
      { groupId: 22, address: "2468 Maple Rd", city: "Detroit", state: "MI", lat: 42.3, lng: -83.1 },
      { groupId: 23, address: "888 Elm St", city: "Memphis", state: "TN", lat: 35.1, lng: -89.9 },
      { groupId: 24, address: "123 Main St", city: "Orlando", state: "FL", lat: 28.5, lng: -81.4 },
      { groupId: 25, address: "999 Pine St", city: "San Francisco", state: "CA", lat: 37.8, lng: -122.4 },
      { groupId: 26, address: "777 Broadway", city: "Chicago", state: "IL", lat: 41.9, lng: -87.6 },
      { groupId: 27, address: "333 Elm St", city: "Phoenix", state: "AZ", lat: 33.5, lng: -112.1 },
      { groupId: 28, address: "555 Fifth St", city: "Seattle", state: "WA", lat: 47.6, lng: -122.3 },
      { groupId: 29, address: "123 Main St", city: "Nashville", state: "TN", lat: 36.2, lng: -86.8 },
      { groupId: 30, address: "456 Oak St", city: "Austin", state: "TX", lat: 30.3, lng: -97.7 },
      { groupId: 31, address: "Online", city: "NA", state: "NA", lat: 0, lng: 0 },
      { groupId: 32, address: "Online", city: "NA", state: "NA", lat: 0, lng: 0 },
      { groupId: 33, address: "Online", city: "NA", state: "NA", lat: 0, lng: 0 },
      { groupId: 34, address: "Online", city: "NA", state: "NA", lat: 0, lng: 0 },
      { groupId: 35, address: "Online", city: "NA", state: "NA", lat: 0, lng: 0 },
      { groupId: 36, address: "Online", city: "NA", state: "NA", lat: 0, lng: 0 },
      { groupId: 37, address: "Online", city: "NA", state: "NA", lat: 0, lng: 0 },
      { groupId: 38, address: "3456 Park Ave", city: "San Francisco", state: "CA", lat: 37.8, lng: -122.4 },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Venues', {
      groupId: { [Op.in]: [1, 2, 3]}
    }, {});
  }
};
