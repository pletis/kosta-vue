// 댓글 관련 API
import { instance } from "./index";

// /team/{team_num}/board/{board_num}/post/{post_num}/reply

// 댓글 작성 API
function insertReply(team_num, board_num, post_num, reply) {
  return instance.post(
    `/team/${team_num}/board/${board_num}/post/${post_num}/reply/new`,
    reply
  );
}

// 댓글 조회 API
function getListReply(team_num, board_num, post_num) {
  return instance.get(
    `/team/${team_num}/board/${board_num}/post/${post_num}/reply`
  );
}

// 댓글 수정 API
function updateReply(team_num, board_num, post_num, reply_num, reply) {
  return instance.put(
    `/team/${team_num}/board/${board_num}/post/${post_num}/reply/${reply_num}`,
    reply
  );
}

// 댓글 삭제 API
function deleteReply(team_num, board_num, post_num, reply_num) {
  return instance.delete(
    `/team/${team_num}/board/${board_num}/post/${post_num}/reply/${reply_num}`
  );
}

export { insertReply, getListReply, updateReply, deleteReply };
