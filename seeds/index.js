const sequelize = require('../config/connection');
const seedCharacter = require('./charaterData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedCharacter();

  process.exit(0);
};

seedAll();
