import axios from "axios";

const instance = axios.create();

function registerUser(userData) {
  return instance.post("users/register", userData);
}

function loginUser(userData) {
  return instance.post("login", userData);
}

function updateUser(userData) {
  return instance.post("users/update", userData);
}

function fetchTeams() {
  return instance.get("team");
}

function createTeam(teamData) {
  return instance.post("team/new", teamData);
}

export { registerUser, loginUser, updateUser, createTeam, fetchTeams };
