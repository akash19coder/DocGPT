import http from "k6/http";
import { check, sleep } from "k6";
import { uuidv4 } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export const options = {
  cloud: {
    projectID: 3753666,
    // Test runs with the same name groups test runs together
    name: "sign up stress api test",
  },
  stages: [
    { duration: "1m", target: 10 },
    { duration: "1m", target: 20 },
    { duration: "1m", target: 30 },
    { duration: "1m", target: 40 },
    { duration: "1m", target: 50 },
    { duration: "1m", target: 100 },
  ],
};

export default function () {
  function generateUsername() {
    const chars = "abcdefghijklmnopqrstuvwxyz123456789_";

    let username = "user_";

    for (let i = 0; i < 8; i++) {
      username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return username;
  }

  const payload = JSON.stringify({
    username: `user_${generateUsername()}`,
    name: `Test User`,
    email: `test${uuidv4()}@gmail.com`,
    password: "StrongPassword@123",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(
    "https://483c-36-252-209-101.ngrok-free.app/api/v1/user/signup",
    payload,
    params,
  );

  check(res, {
    "Signup sucess": (r) => r.status == 200,
    "Response time < 500ms": (r) => r.timings.duration < 500,
  });
  sleep(1);
}
