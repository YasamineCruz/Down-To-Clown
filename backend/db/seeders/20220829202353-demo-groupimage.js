'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('GroupImages', [
      { groupId: 1, url: "https://i.pinimg.com/736x/d4/8c/2d/d48c2de0debd3bef102256f979862bbd--group-photography-photography-tricks.jpg", preview: true},
      { groupId: 2, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkLoSCWTUulQ_FTZdVPDRa7V6eSpLAwfro8g&usqp=CAU", preview: false},
      { groupId: 3, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ZcHy-g_K1axV_4d8Te_boHCq3tgUktEgWA&usqp=CAU", preview: true}, 
      { groupId: 4, url: "https://i.pinimg.com/originals/17/f4/4b/17f44bc37f07ec7db8be5e1d5aa6c5db.jpg", preview: false},
      { groupId: 5, url: "https://images.unsplash.com/photo-1614943258602-c1e7a8d633e6", preview: true},
      { groupId: 6, url: "https://i.pinimg.com/736x/31/cb/cf/31cbcf7b2f6092491c7f8aeb578baa24.jpg", preview: false},
      { groupId: 7, url: "https://images.unsplash.com/photo-1546179398-00832e014a7d", preview: true},
      { groupId: 8, url: "https://i.pinimg.com/736x/47/4b/b3/474bb3b0c0e39099689ca5237a2b5200.jpg", preview: false},
      { groupId: 9, url: "https://images.unsplash.com/photo-1509527711453-aa99a30a65fc", preview: true},
      { groupId: 10, url: "https://i.pinimg.com/736x/9b/af/6a/9baf6a1b49c7f6d0cf0a7a37b5f56b3d.jpg", preview: false},
      { groupId: 11, url: "https://i.pinimg.com/736x/d4/8c/2d/d48c2de0debd3bef102256f979862bbd--group-photography-photography-tricks.jpg", preview: true},
      { groupId: 12, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkLoSCWTUulQ_FTZdVPDRa7V6eSpLAwfro8g&usqp=CAU", preview: false},
      { groupId: 13, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ZcHy-g_K1axV_4d8Te_boHCq3tgUktEgWA&usqp=CAU", preview: true}, 
      { groupId: 14, url: "https://i.pinimg.com/originals/17/f4/4b/17f44bc37f07ec7db8be5e1d5aa6c5db.jpg", preview: false},
      { groupId: 15, url: "https://images.unsplash.com/photo-1614943258602-c1e7a8d633e6", preview: true},
      { groupId: 16, url: "https://i.pinimg.com/736x/31/cb/cf/31cbcf7b2f6092491c7f8aeb578baa24.jpg", preview: false},
      { groupId: 17, url: "https://images.unsplash.com/photo-1546179398-00832e014a7d", preview: true},
      { groupId: 18, url: "https://i.pinimg.com/736x/47/4b/b3/474bb3b0c0e39099689ca5237a2b5200.jpg", preview: false},
      { groupId: 19, url: "https://images.unsplash.com/photo-1509527711453-aa99a30a65fc", preview: true},
      { groupId: 20, url: "https://i.pinimg.com/736x/9b/af/6a/9baf6a1b49c7f6d0cf0a7a37b5f56b3d.jpg", preview: false},
      { groupId: 21, url: "https://i.pinimg.com/736x/d4/8c/2d/d48c2de0debd3bef102256f979862bbd--group-photography-photography-tricks.jpg", preview: true},
      { groupId: 22, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkLoSCWTUulQ_FTZdVPDRa7V6eSpLAwfro8g&usqp=CAU", preview: false},
      { groupId: 23, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ZcHy-g_K1axV_4d8Te_boHCq3tgUktEgWA&usqp=CAU", preview: true}, 
      { groupId: 24, url: "https://i.pinimg.com/originals/17/f4/4b/17f44bc37f07ec7db8be5e1d5aa6c5db.jpg", preview: false},
      { groupId: 25, url: "https://images.unsplash.com/photo-1614943258602-c1e7a8d633e6", preview: true},
      { groupId: 26, url: "https://i.pinimg.com/736x/31/cb/cf/31cbcf7b2f6092491c7f8aeb578baa24.jpg", preview: false},
      { groupId: 27, url: "https://images.unsplash.com/photo-1546179398-00832e014a7d", preview: true},
      { groupId: 28, url: "https://i.pinimg.com/736x/47/4b/b3/474bb3b0c0e39099689ca5237a2b5200.jpg", preview: false},
      { groupId: 29, url: "https://images.unsplash.com/photo-1509527711453-aa99a30a65fc", preview: true},
      { groupId: 30, url: "https://i.pinimg.com/736x/9b/af/6a/9baf6a1b49c7f6d0cf0a7a37b5f56b3d.jpg", preview: false},
      { groupId: 31, url: "https://i.pinimg.com/736x/d4/8c/2d/d48c2de0debd3bef102256f979862bbd--group-photography-photography-tricks.jpg", preview: true},
      { groupId: 32, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkLoSCWTUulQ_FTZdVPDRa7V6eSpLAwfro8g&usqp=CAU", preview: false},
      { groupId: 33, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ZcHy-g_K1axV_4d8Te_boHCq3tgUktEgWA&usqp=CAU", preview: true}, 
      { groupId: 34, url: "https://i.pinimg.com/originals/17/f4/4b/17f44bc37f07ec7db8be5e1d5aa6c5db.jpg", preview: false},
      { groupId: 35, url: "https://images.unsplash.com/photo-1614943258602-c1e7a8d633e6", preview: true},
      { groupId: 36, url: "https://i.pinimg.com/736x/31/cb/cf/31cbcf7b2f6092491c7f8aeb578baa24.jpg", preview: false},
      { groupId: 37, url: "https://images.unsplash.com/photo-1546179398-00832e014a7d", preview: true},
      { groupId: 38, url: "https://i.pinimg.com/736x/47/4b/b3/474bb3b0c0e39099689ca5237a2b5200.jpg", preview: false},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('GroupImages', {
      groupId: { [Op.in]: [1, 2, 3]}
    }, {});
  }
};
