// 팀 조작과 관련된 CRUD API 파일
import { instance } from "./index";
import { posts } from "./index";

// 팀 생성 API
function createTeam(teamData) {
  return posts.post("/1", teamData);
}

// 팀 목록 불러오는 API
function fetchTeams() {
  return posts.get(`/1`);
}

// 특정 팀 조회 API
function fetchTeam(teamId) {
  return instance.get(`1/${teamId}`);
}

// 팀 수정 API
function updateTeam(teamId, teamData) {
  return instance.put(`${teamId}`, teamData);
}

// 팀 삭제 API
function deleteTeam(teamId) {
  return posts.delete(`${teamId}`);
}

export { fetchTeams, fetchTeam, createTeam, updateTeam, deleteTeam };
