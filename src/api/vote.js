// 투표 관련 API
import { instance } from "./index";

// 투표 생성 API
function createVote(team_num, vote) {
  return instance.post(`/team/${team_num}/vote/new`, vote);
}

function voteInsert(team_num, vote_num, vote) {
  return instance.post(`/team/${team_num}/vote/${vote_num}/insert`, vote);
}

// 투표 조회 API
function getVotes(team_num) {
  return instance.get(`/team/${team_num}/vote/list`);
}

// 완료된 투표 조회 API
function getEndVotes(team_num) {
  return instance.get(`/team/${team_num}/vote/endlist`);
}

// 투표 결과 조회 API
function getVoteResult(team_num, vote_num) {
  return instance.get(`/team/${team_num}/vote/${vote_num}/result`);
}

// 특정 투표 멤버 조회 API
function getVoteMemberList(team_num, vote_num) {
  return instance.get(`/team/${team_num}/vote/${vote_num}/result/member`);
}

// 특정 투표 1번 투표한 멤버 조회 API
function getVoteMember1(team_num, vote_num) {
  return instance.get(`/team/${team_num}/vote/${vote_num}/result/1`);
}

// 특정 투표 2번 투표한 멤버 조회 API
function getVoteMember2(team_num, vote_num) {
  return instance.get(`/team/${team_num}/vote/${vote_num}/result/2`);
}

// 특정 투표 3번 투표한 멤버 조회 API
function getVoteMember3(team_num, vote_num) {
  return instance.get(`/team/${team_num}/vote/${vote_num}/result/3`);
}

// 특정 투표 4번 투표한 멤버 조회 API
function getVoteMember4(team_num, vote_num) {
  return instance.get(`/team/${team_num}/vote/${vote_num}/result/4`);
}

// 특정 투표 5번  투표한 멤버 조회 API
function getVoteMember5(team_num, vote_num) {
  return instance.get(`/team/${team_num}/vote/${vote_num}/result/5`);
}

// 투표 수정 API
function updateVote(team_num, vote) {
  return instance.put(`/team/${team_num}/vote`, vote);
}

// 투표 마감 API
function deleteVote(team_num, vote_num) {
  return instance.delete(`/team/${team_num}/vote/${vote_num}/end`);
}

export {
  createVote,
  voteInsert,
  getVotes,
  getEndVotes,
  getVoteResult,
  getVoteMember1,
  getVoteMember2,
  getVoteMember3,
  getVoteMember4,
  getVoteMember5,
  getVoteMemberList,
  updateVote,
  deleteVote,
};
