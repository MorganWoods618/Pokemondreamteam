const { Character } = require('../models');

const characterdata = [
    {
      name: 'Bulbasaur',
      Number: 1,
      type: 'Grass, Poison',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Ivysaur',
      Number: 2,
      type: 'Grass, Poison',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Venusaur',
      Number: 3,
      type: 'Grass, Poison',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Charmander ',
      Number: 4,
      type: 'Fire',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Charmeleon',
      Number: 5,
      type: 'Fire',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Charizard',
      Number: 6,
      type: 'Fire',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Squirtle ',
      Number: 7,
      type: 'Water',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Wartortle',
      Number: 8,
      type: 'Water',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Blastoise',
      Number: 9,
      type: 'Water',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Caterpie',
      Number: 10,
      type: 'Bug',
      generation: '1',
      catchrate: 43.9,
    },
    {
      name: 'Metapod',
      Number: 11,
      type: 'Bug',
      generation: '1',
      catchrate: 24.9,
    },
    {
      name: 'Butterfree',
      Number: 12,
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
      Number: 14,
      type: 'Bug, Poison',
      generation: '1',
      catchrate: 24.9,
    },
    {
      name: 'Beedrill',
      Number: 15,
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
      Number: 17,
      type: 'Normal, Flying',
      generation: '1',
      catchrate: 24.9,
    },
    {
      name: 'Pidgeot',
      Number: 18,
      type: 'Normal, Flying',
      generation: '1',
      catchrate: 11.9,
    },
    {
      name: 'Rattata',
      Number: 19,
      type: 'Normal',
      generation: '1',
      catchrate: 43.9,
    },
    {
      name: 'Raticate',
      Number: 20,
      type: 'Normal',
      generation: '1',
      catchrate: 26,
    },
    {
      name: 'Spearow',
      Number: 21,
      type: 'Normal, Flying',
      generation: '1',
      catchrate: 43.9,
    },
    {
      name: 'Fearow',
      Number: 22,
      type: 'Normal, Flying',
      generation: '1',
      catchrate: 20.1,
    },
    {
      name: 'Ekans',
      Number: 23,
      type: 'Poison',
      generation: '1',
      catchrate: 43.9,
    },
    {
      name: 'Arbok',
      Number: 24,
      type: 'Poison',
      generation: '1',
      catchrate: 20.1,
    },
    {
      name: 'Pikachu',
      Number: 25,
      type: 'Electric',
      generation: '1',
      catchrate: 35.2,
    },
    {
      name: 'Raichu',
      Number: 26,
      type: 'Electric',
      generation: '1',
      catchrate: 17.5,
    },
    {
      name: 'Sandshrew',
      Number: 27,
      type: 'Ground',
      generation: '1',
      catchrate: 17.5,
    },
    {
      name: 'Sandslash',
      Number: 28,
      type: 'Ground',
      generation: '1',
      catchrate: 17.5,
    },
    {
      name: 'NidoranMale',
      Number: 29,
      type: 'Poison',
      generation: '1',
      catchrate: 17.5,
    },
    {
      name: 'Nidorina',
      Number: 30,
      type: 'Poison',
      generation: '1',
      catchrate: 17.5,
    },
    {
      name: 'Nidoqueen',
      Number: 31,
      type: 'Poison, Ground',
      generation: '1',
      catchrate: 17.5,
    },
    {
      name: 'NidoranFemale',
      Number: 32,
      type: 'Poison',
      generation: '1',
      catchrate: 17.5,
    },
    {
      name: 'Nidorino',
      Number: 33,
      type: 'Poison',
      generation: '1',
      catchrate: 17.5,
    },
    {
      name: 'Nidoking',
      Number: 34,
      type: 'Poison, Ground',
      generation: '1',
      catchrate: 17.5,
    },
    {
      name: 'Clefairy',
      Number: 35,
      type: 'Fairy',
      generation: '1',
      catchrate: 17.5,
    },
    {
      name: 'Clefable',
      Number: 36,
      type: 'Fairy',
      generation: '1',
      catchrate: 17.5,
    }, 
    {
      name: 'Vulprix',
      Number: 37,
      type: 'Fire',
      generation: '1',
      catchrate: 17.5,
    }, 
     {
      name: 'Ninetables',
      Number: 38,
      type: 'Fire',
      generation: '1',
      catchrate: 17.5,
    },  
    {
      name: 'Jigglypuff',
      Number: 39,
      type: 'Normal, Fairy',
      generation: '1',
      catchrate: 17.5,
    },  
    {
      name: 'Wigglytuff',
      Number: 40,
      type: 'Normal, Fairy',
      generation: '1',
      catchrate: 17.5,
    }, 
    {
      name: 'Zubat',
      Number: 41,
      type: 'Poison, Flying',
      generation: '1',
      catchrate: 17.5,
    },  
    {
      name: 'Golbat',
      Number: 42,
      type: 'Poison, Flying',
      generation: '1',
      catchrate: 17.5,
    },  
    {
      name: 'Oddish',
      Number: 43,
      type: 'Grass, Poison',
      generation: '1',
      catchrate: 17.5,
    },  
    {
      name: 'Gloom',
      Number: 44,
      type: 'Grass, Poison',
      generation: '1',
      catchrate: 17.5,
    },  
    {
      name: 'Vileplume',
      Number: 45,
      type: 'Grass, Poison',
      generation: '1',
      catchrate: 17.5,
    }, 
    {
      name: 'Paras',
      Number: 46,
      type: 'Bug, Grass',
      generation: '1',
      catchrate: 17.5,
    },