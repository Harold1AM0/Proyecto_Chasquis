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
    },

    assets: {
      background: 'bg_valle',
      road: 'road_valle',
      music: 'music_valle',
      backgroundScrollSpeed: 0.6,
      roadScrollSpeed: 5,
      showDebugLanes: false
    },

    theme: {
      skyColor: 0x79cfff,
      horizonColor: 0x8fcf72,
      roadColor: 0x8b5a2b,
      roadDarkColor: 0x6b3f1d,
      laneColor: 0xffdd88,
      hudTextColor: '#ffcc00',
      hudBarColor: 0xffcc00,
      obstacleTint: 0xffffff
    }
  },

  {
    id: 'jungla',
    number: 2,
    name: 'Nivel 2: Jungla nocturna',
    description: 'Una ruta más oscura y peligrosa en zona selvática.',

    durationMs: durationPerLevel * 1.25,

    difficulty: {
      speedMultiplier: 1.25,
      spawnMultiplier: 0.9
    },

    assets: {
      background: 'bg_jungla',
      road: 'road_jungla',
      music: 'music_jungla',
      backgroundScrollSpeed: 0.7,
      roadScrollSpeed: 6,
      showDebugLanes: false
    },

    theme: {
      skyColor: 0x071421,
      horizonColor: 0x12351f,
      roadColor: 0x22401f,
      roadDarkColor: 0x10240f,
      laneColor: 0x77cc66,
      hudTextColor: '#99ff88',
      hudBarColor: 0x77cc66,
      obstacleTint: 0x99ff99
    }
  },

  {
    id: 'costa',
    number: 3,
    name: 'Nivel 3: Costa tormentosa',
    description: 'El tramo final, con tensión, tormenta y conflicto.',

    durationMs: durationPerLevel * 1.5,

    difficulty: {
      speedMultiplier: 1.5,
      spawnMultiplier: 0.8
    },

    assets: {
      background: 'bg_costa',
      road: 'road_costa',
      music: 'music_costa',
      backgroundScrollSpeed: 0.8,
      roadScrollSpeed: 7,
      showDebugLanes: false
    },

    theme: {
      skyColor: 0x2c3440,
      horizonColor: 0x1c4f66,
      roadColor: 0x5a4738,
      roadDarkColor: 0x2a211c,
      laneColor: 0xff6644,
      hudTextColor: '#ff6644',
      hudBarColor: 0xff4422,
      obstacleTint: 0xffbbbb
    }
  }
];

export default LEVELS;