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

    story: {
      before: [
        {
          imageKey: 'story_valle_4',
          text: 'El joven chasqui despierta en el valle de Cusco. Su misión es entregar mensajes a la capital del imperio.'
        },
        {
          imageKey: 'story_valle_1',
          text: 'El joven chasqui recibe un mensaje urgente. Debe correr por el Qhapaq Ñan y advertir del peligro.'
        }
      ],
      after: [
        {
          imageKey: 'story_valle_2',
          text: 'Tras cruzar el valle, el mensaje continúa su ruta hacia regiones más peligrosas.'
        }
      ]
    },

    obstacles: [
      {
        id: 'roca_valle',
        texture: 'obs_roca_valle',
        points: 50,
        bodyWidth: 0.65,
        bodyHeight: 0.55,
        yOffset: 8
      },
      {
        id: 'arbusto_valle',
        texture: 'obs_arbusto_valle',
        points: 50,
        bodyWidth: 0.7,
        bodyHeight: 0.5,
        yOffset: 8
      },
      {
        id: 'oso_valle',
        texture: 'obs_oso_valle',
        points: 75,
        bodyWidth: 0.65,
        bodyHeight: 0.75,
        yOffset: 0
      }
    ],

    theme: {
      skyColor: 0x79cfff,
      horizonColor: 0x8fcf72,
      roadColor: 0x8b5a2b,
      roadDarkColor: 0x6b3f1d,
      laneColor: 0xffdd88,
      hudTextColor: '#ffcc00',
      hudBarColor: 0xffcc00,
      obstacleTint: 0xffffff
    },

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

    story: {
      before: [
        {
          imageKey: 'story_jungla_1',
          text: 'La noche cae. La ruta se vuelve más peligrosa y cada paso exige mayor rapidez.'
        }
      ],
      after: [
        {
          imageKey: 'story_jungla_2',
          text: 'El chasqui logra salir de la espesura. Solo queda el tramo final.'
        }
      ]
    },

    obstacles: [
      {
        id: 'roca_noche',
        texture: 'obs_roca_noche',
        points: 50,
        bodyWidth: 0.65,
        bodyHeight: 0.55,
        yOffset: 8
      },
      {
        id: 'arbusto_noche',
        texture: 'obs_arbusto_noche',
        points: 50,
        bodyWidth: 0.7,
        bodyHeight: 0.5,
        yOffset: 8
      },
      {
        id: 'tronco_noche',
        texture: 'obs_tronco_noche',
        points: 65,
        bodyWidth: 0.8,
        bodyHeight: 0.45,
        yOffset: 12
      },
      {
        id: 'serpiente_noche',
        texture: 'obs_serpiente_noche',
        points: 80,
        bodyWidth: 0.8,
        bodyHeight: 0.35,
        yOffset: 16
      }
    ],

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

    story: {
      before: [
        {
          imageKey: 'story_costa_1',
          text: 'La costa aparece bajo tormenta. El destino está cerca, pero el tiempo se agota.'
        },
        {
          imageKey: 'story_costa_2',
          text: 'La costa aparece bajo tormenta. El destino está cerca, pero el tiempo se agota.'
        }
      ],
      after: [
        {
          imageKey: 'story_final_1',
          text: 'Llegó tarde. La costa ya había caído.'
        },
        {
          imageKey: 'story_final_1',
          text: 'Pero el chasqui aún debía correr… ahora por su vida.'
        }
      ]
    },

    obstacles: [
      {
        id: 'conquistador',
        texture: 'conquistador',
        points: 100,
        bodyWidth: 0.6,
        bodyHeight: 0.8,
        yOffset: 0
      },
      {
        id: 'cactus_costa',
        texture: 'obs_cactus_costa',
        points: 75,
        bodyWidth: 0.55,
        bodyHeight: 0.85,
        yOffset: 0
      }
    ],

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