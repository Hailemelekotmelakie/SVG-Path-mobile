import cordinateDistanceCalculator from "./cordinateDistanceCalculator";

// Function to calculate the equation of the line
const lineEquation = (x1, x2, y1, y2) => {
  let additive = 100;
  let newy1 = y1;
  let newy2 = y2;

  while (cordinateDistanceCalculator(x1, x2, newy1, newy2) < 90) {
    newy1 = newy1 + additive;
    newy2 = increaser(x1, x2, y1, y2, newy1);
    console.log("Adder");
  }
  console.log("Return", cordinateDistanceCalculator(x1, x2, newy1, newy2));
  return { newy1, newy2 };
};

export default lineEquation;

const increaser = (x1, x2, y1, y2, newValue) => {
  const slope = (y2 - y1) / (x2 - x1);
  const intercept = y1 - slope * x1;
  const finalResult = slope * newValue + intercept;
  console.log("first", finalResult);

  return finalResult;
};
