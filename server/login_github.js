require("dotenv").config();
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const login = require("./public/db/User_Schema");
let client_id = process.env.GITHUB_CLIENT_ID;
let client_secret = process.env.GITHUB_CLIENT_SECRET;
let users = [];
router.get("/", (req, res) => {
  const redirect_uri = "http://localhost:3000/Login_github/CallBack";
  res.send({
    link: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user%20repo&redirect_uri=${redirect_uri}`,
  });
});
router.post("/user/signin/callback", async (req, res) => {
  const code = req.body.Code;
  const access_token = await getAccessToken({ code, client_id, client_secret });
  if (access_token) {
    let User = await fetchGitHubUser(access_token);
    let findUserIsRegistered = await login.find({
      username: User.login,
      password: User.node_id,
    });
    if (!findUserIsRegistered) {
      let registUser = new login({
        username: User.login,
        password: User.node_id,
        githubToken: access_token,
      });
      await registUser.save(function (err, result) {
        if (err) {
          console.log("loi dang ky");
        } else {
          console.log(result);
        }
      });
    }
    res.send({
      redirect: `/github_login_client/?username=${User.login}&password=${User.node_id}&githubToken=${access_token}`,
    });
  } else {
    res.send("Login did not succeed!");
  }
});
router.post("/createRepo/", async (req, res) => {
  let NameRepo = req.body.text;
  let token = users[0].access_token;
  let dataUser = await fetchGitHubCreateRepository(token, NameRepo);
  res.send(dataUser);
});
async function registerUser(User, access_token) {
  console.log("dang ky thanh vien tu github");
  await fetch("http://localhost:4000/register", {
    method: "POST",
    body: JSON.stringify({
      username: User.login,
      password: User.node_id,
      githubToken: access_token,
    }),
  }).then((response) => {
    console.log(response.data);
  });
}
async function fetchGitHubUser(token) {
  const request = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: "token " + token,
    },
  });
  return await request.json();
}

async function fetchGitHubCreateRepository(token, NameRepo) {
  console.log(token + " " + NameRepo);
  const request = await fetch("https://api.github.com/user/repos", {
    method: "POST",
    headers: {
      Authorization: "token " + token,
    },
    body: JSON.stringify({
      name: NameRepo,
    }),
  });
  return await request.json();
}
async function getAccessToken({ code, client_id, client_secret }) {
  const request = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code,
    }),
  });
  const text = await request.text();
  const params = new URLSearchParams(text);
  return params.get("access_token");
}
module.exports = router;
