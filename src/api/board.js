import { instance } from "./index";

// 게시판 리스트 조회 API
function getBoard(team_id) {
  return instance.get(`/team/${team_id}/board`);
}

// 게시판 생성 API
function createBoard(team_id, data) {
  return instance.post(`/team/${team_id}/board/new`, data);
}

// 게시판 수정 API
function updateBoard(team_id, board_id, data) {
  return instance.put(`/team/${team_id}/board/${board_id}`, data);
}

// 게시판 삭제 API
function deleteBoard(team_id, board_id) {
  return instance.delete(`/team/${team_id}/board/${board_id}`);
}

export { getBoard, createBoard, updateBoard, deleteBoard };

// 특정 게시판 조회 API
