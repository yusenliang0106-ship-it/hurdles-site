// Geometry for the schematic drawings on /track. Shapes only: none of this is
// measured data, and the drawings say so where it matters.

export const story = {
  viewBox: "0 120 600 200",
  groundY: 270,
  hurdle: { x: 330, top: 196 },
  // Approach along the ground, flight over the barrier, run-off after landing.
  path: "M30 270 L236 270 Q330 70 424 270 L580 270",
  footfalls: [62, 112, 160, 202, 236, 424, 468, 516, 562],
  // Where the dot sits for each of the five moments, as x positions on the path.
  stops: [130, 236, 330, 424, 540],
};

export const takeoff = {
  viewBox: "0 60 600 190",
  groundY: 200,
  hurdle: { x: 380, top: 134 },
  steps: [70, 150, 222],
  baseTakeoff: 292,
  maxShift: 60,
  landing: 470,
};

const hurdles = Array.from({ length: 10 }, (_, i) => 70 + i * 52);

export const raceHurdles = hurdles;

function line(points: [number, number][]) {
  return points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
}

// Athlete A: speed holds early, then fades across the race.
export const speedFade = line(
  Array.from({ length: 61 }, (_, i) => {
    const t = i / 60;
    return [40 + t * 540, 52 + Math.pow(t, 1.7) * 92];
  })
);

// Athlete C: speed holds between barriers but dips around each clearance.
export const clearanceDips = line(
  Array.from({ length: 241 }, (_, i) => {
    const x = 40 + (i / 240) * 540;
    const dip = hurdles.reduce((d, h) => d + 46 * Math.exp(-Math.pow((x - h) / 9, 2)), 0);
    return [x, 56 + dip];
  })
);

// Athlete B: three steps between barriers. Even for most intervals, uneven in a few.
const uneven: Record<number, number[]> = { 3: [0.18, 0.4, 0.82], 6: [0.3, 0.52, 0.66], 7: [0.16, 0.6, 0.86] };
export const footfallIntervals = hurdles.slice(0, -1).map((h, i) => {
  const spots = uneven[i] ?? [0.25, 0.5, 0.75];
  return { irregular: i in uneven, xs: spots.map((s) => h + s * 52) };
});
