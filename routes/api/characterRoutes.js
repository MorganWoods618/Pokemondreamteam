const router = require('express').Router();
const path = require('path');

// Import the model
const Character = require('../../models/Character');

// CREATE a character
router.post('/', (req, res) => {
  // Use Sequelize's `create()` method to add a row to the table
  // Similar to `INSERT INTO` in plain SQL


  // ********!!!!!!! this is to create and the values you need to create a new one in the data
  Character.create({
    title: req.body.name,
    author: req.body.type,
    is_active: true
  })
    .then((newCharacter) => {
      // Send the newly created row as a JSON object
      res.json(newCharacter);
    })
    .catch((err) => {
      res.json(err);
    });
});

// CREATE characters
router.post('/seed', (req, res) => {
  // Multiple rows can be created with `bulkCreate()` and an array
  // This could also be moved to a separate Node.js script to ensure it only happens once
  Character.bulkCreate([
    {
      name: 'Bulbasaur',
      Number: 1
      type: 'Grass, Poison',
      generation: '1',
      catchrate: 11.9,
    };
    //   ****THIS NEEDS TO BE SEEDED WITH A BUNCH OF STATS IN THE SAME FORMAT AS THE MODEL***


    /// also prob should switch this to async/await
    // in activity 10 ORM 
    /// async after "post" above, await below


  ])
    .then(() => {
      res.send('Database seeded!');
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;


// we can add get routes like activity 7,
// but pretty sure different routes will..  
// go to different folders 