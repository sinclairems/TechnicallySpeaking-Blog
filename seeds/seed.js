// Imports
const sequelize = require('../config/connection');
const { User, Blogpost } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');

// Seed Database
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Blogpost.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
