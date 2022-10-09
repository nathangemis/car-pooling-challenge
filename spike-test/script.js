import http from "k6/http";
import { vu } from "k6/execution";
import { check, sleep } from "k6";

const randomNmb = () => {
  return Math.floor(Math.random() * (6 - 1 + 1) + 1);
};

const generateCars = (nmbOfCars) => {
  const cars = [];

  for (let n = 1; n <= nmbOfCars; n++) {
    const car = {
      id: n,
      seats: randomNmb(),
    };
    cars.push(car);
  }

  return JSON.stringify(cars);
};

const jsonParams = {
  headers: {
    "Content-Type": "application/json",
  },
};

const formParams = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const baseUrl = "http://127.0.0.1:9091";

const startJourney = (id) => {
  const payload = JSON.stringify({
    id: id,
    people: randomNmb(),
  });
  const journeyUrl = `${baseUrl}/journey`;
  return http.post(journeyUrl, payload, jsonParams);
};

const locateGroup = (id) => {
  const groupId = { ID: id };
  const locateUrl = `${baseUrl}/locate`;
  return http.post(locateUrl, groupId, formParams);
};

const dropOff = (id) => {
  const dropOffUrl = `${baseUrl}/dropoff`;
  const dropId = { ID: id };
  return http.post(dropOffUrl, dropId, formParams);
};

export const options = {
  scenarios: {
    journeys: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "10s", target: 100 },
        { duration: "20s", target: 1000 },
        { duration: "1m", target: 4000 },
        { duration: "20s", target: 1000 },
        { duration: "10s", target: 100 },
      ],
      gracefulRampDown: "0s",
      exec: "lotOfJourney",
    },
  },
  thresholds: {
    http_req_duration: ["p(99)<1000"],
    "checks{tag:journey}": ["rate>0.9"],
    "checks{tag:dropoff}": ["rate>0.9"],
    "checks{tag:locate}": ["rate>0.9"],
  },
};

export function setup() {
  const url = `${baseUrl}/cars`;
  const payload = generateCars(50000);

  const res = http.put(url, payload, jsonParams);
}

export function lotOfJourney() {
  const j = startJourney(vu.idInTest);
  check(
    j,
    {
      "status is 200": (r) => r.status == 200,
    },
    { tag: "journey" }
  );
  sleep(1);
  const locate = locateGroup(vu.idInTest);
  check(
    locate,
    {
      "status is 200": (r) => r.status == 200,
    },
    { tag: "locate" }
  );
  sleep(1);
  const drop = dropOff(vu.idInTest);
  check(
    drop,
    {
      "status is 200": (r) => r.status == 200,
    },
    { tag: "dropoff" }
  );
  sleep(1);
}
