// 게시글 관련 API
import { instance } from "./index";

function getPostList(team_id, board_id) {
  return instance.get(`/team/${team_id}/board/${board_id}/post`);
}

export { getPostList };
