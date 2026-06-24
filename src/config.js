const WIDTH = 1200;
const HEIGHT = 675;

// Por tanto, el camino ocupa el 65% inferior.
const ROAD_TOP = Math.round(HEIGHT * 0.45);
const ROAD_BOTTOM = Math.round(HEIGHT * 0.94);
const ROAD_HEIGHT = ROAD_BOTTOM - ROAD_TOP;

// Carriles dentro del camino
const LANE_1 = Math.round(ROAD_TOP + ROAD_HEIGHT * 0.25);
const LANE_2 = Math.round(ROAD_TOP + ROAD_HEIGHT * 0.55);
const LANE_3 = Math.round(ROAD_TOP + ROAD_HEIGHT * 0.85);

export const GAME_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  backgroundColor: '#2d1b00',

  layout: {
    backgroundRatio: 0.45,
    roadRatio: 0.55,
    roadTop: ROAD_TOP,
    roadBottom: ROAD_BOTTOM,
    roadHeight: ROAD_HEIGHT
  },

  lanes: [LANE_1, LANE_2, LANE_3],

  player: {
    x: Math.round(WIDTH * 0.16),
    width: 56,
    height: 80,
    texture: 'chasqui'
  },

  obstacle: {
    width: 60,
    height: 82,
    speedBase: 220,
    speedMax: 520,
    speedIncrement: 18,
    texture: 'conquistador'
  }
};