import mapAngle from "./convertor";

function getDirectionAndAngle(coord1, coord2) {
  // Calculate the differences in latitude and longitude
  const latDiff = mapAngle(coord2.latitude) - mapAngle(coord1.latitude);
  const lonDiff = mapAngle(coord2.longitude) - mapAngle(coord1.longitude);

  // Calculate the angle from the north (0 to 360 degrees)
  let angle = Math.atan2(lonDiff, latDiff) * (180 / Math.PI);
  angle = ((angle+90) % 360); // Ensure the angle is positive and within the range [0, 360)

  // Calculate the direction (N, NE, E, SE, S, SW, W, NW)
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const directionIndex = Math.round(angle / 45) % 8;
  const direction = directions[directionIndex];
  angle=Math.round(angle * 100) / 100;
  return { direction, angle };
}

export default getDirectionAndAngle;
