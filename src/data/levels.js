const durationPerLevel = 20000;
const LEVELS = [
  {
    id: 'valle',
    number: 1,
    name: 'Nivel 1: Valle de Cusco',
    description: 'Un valle pacífico inspirado en el Qhapaq Ñan.',
    
    durationMs: durationPerLevel,

    difficulty: {
      speedMultiplier: 1,
      spawnMultiplier: 1
    }
  },

  {
    id: 'jungla',
    number: 2,
    name: 'Nivel 2: Jungla nocturna',
    description: 'Una ruta más oscura y peligrosa en zona selvática.',
    
    durationMs: durationPerLevel*1.25,

    difficulty: {
      speedMultiplier: 1.25,
      spawnMultiplier: 0.9
    }
  },

  {
    id: 'costa',
    number: 3,
    name: 'Nivel 3: Costa tormentosa',
    description: 'El tramo final, con tensión, tormenta y conflicto.',
    
    durationMs: durationPerLevel*1.5,

    difficulty: {
      speedMultiplier: 1.5,
      spawnMultiplier: 0.8
    }
  }
];

export default LEVELS;