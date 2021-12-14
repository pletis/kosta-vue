// 팀 조작과 관련된 CRUD API 파일
import { instance } from "./index";
import { posts } from "./index";

// 팀 생성 API
function createTeam(user_num, teamData) {
  return posts.post(`/${user_num}`, teamData);
}

// 팀 목록 불러오는 API
function fetchTeams(user_num) {
  return posts.get(`/getlist/${user_num}`);
}

// 특정 팀 조회 API
function fetchTeam(user_num, teamId) {
  return instance.get(`${user_num}/${teamId}`);
}

// 팀 수정 API
function updateTeam(teamId, teamData) {
  return instance.put(`${teamId}`, teamData);
}

// 팀 삭제 API
function deleteTeam(teamId) {
  return posts.delete(`${teamId}`);
}

// 해당하는 팀에 대한 자신의 멤버 정보 불러오는 API
function loadTeamMember(user_num, team_num) {
  return instance.get(`/team/${team_num}/member/${user_num}`);
}

export {
  fetchTeams,
  fetchTeam,
  createTeam,
  updateTeam,
  deleteTeam,
  loadTeamMember,
};
