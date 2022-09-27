const router = require('express').Router();

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
    },
    {
      name: 'Ivysaur',
      Number: 2
      type: 'Grass, Poison',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Venusaur',
      Number: 3
      type: 'Grass, Poison',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Charmander ',
      Number: 4
      type: 'Fire',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Charmeleon',
      Number: 5
      type: 'Fire',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Charizard',
      Number: 6
      type: 'Fire',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Squirtle ',
      Number: 7
      type: 'Water',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Wartortle',
      Number: 8
      type: 'Water',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Blastoise',
      Number: 9
      type: 'Water',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Caterpie',
      Number: 10
      type: 'Bug',
      generation: '1',
      catchrate: 43.9,
    },
    {
      name: 'Metapod',
      Number: 11
      type: 'Bug',
      generation: '1',
      catchrate: 24.9,
    },
    {
      name: 'Butterfree',
      Number: 12
      type: 'Bug, Flying',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Weedle',
      Number: 13
      type: 'Bug, Poison',
      generation: '1',
      catchrate: 43.9,
    },
    {
      name: 'Kakuna',
      Number: 14
      type: 'Bug, Poison',
      generation: '1',
      catchrate: 24.9,
    },
    {
      name: 'Beedrill',
      Number: 15
      type: 'Bug, Poison',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Pidgey',
      Number: 16
      type: 'Normal, Flying',
      generation: '1',
      catchrate: 43.9,
    },
    {
      name: 'Pidgey',
      Number: 17
      type: 'Normal, Flying',
      generation: '1',
      catchrate: 24.9,
    },
    {
      name: 'Pidgeot',
      Number: 18
      type: 'Normal, Flying',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Rattata',
      Number: 19
      type: 'Normal',
      generation: '1',
      catchrate: 43.9,
    },
    {
      name: 'Raticate',
      Number: 20
      type: 'Normal',
      generation: '1',
      catchrate: 26,
    },
    {
      name: 'Spearow',
      Number: 21
      type: 'Normal, Flying',
      generation: '1',
      catchrate: 43.9,
    },
    {
      name: 'Fearow',
      Number: 22
      type: 'Normal, Flying',
      generation: '1',
      catchrate: 20.1,
    },
    {
      name: 'Ekans',
      Number: 23
      type: 'Poison',
      generation: '1',
      catchrate: 43.9,
    },
    {
      name: 'Arbok',
      Number: 24
      type: 'Poison',
      generation: '1',
      catchrate: 20.1,
    },
    {
      name: 'Pikachu',
      Number: 25
      type: 'Electric',
      generation: '1',
      catchrate: 35.2,
    },
    {
      name: 'Raichu',
      Number: 26
      type: 'Electric',
      generation: '1',
      catchrate: 17.5,
    }
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