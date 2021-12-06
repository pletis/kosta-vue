// 게시글 관련 API
import { instance } from "./index";

// 게시글 리스트 조회 API
function getPostList(team_id, board_id) {
  return instance.get(`/team/${team_id}/board/${board_id}/post`);
}

// 게시글 생성 API
function createPost(team_id, board_id, posts) {
  return instance.post(`/team/${team_id}/board/${board_id}/post/new`, posts);
}
// 게시글 수정 API
function updatePost(post_id, team_id, board_id, posts) {
  return instance.put(
    `/team/${team_id}/board/${board_id}/post/${post_id}`,
    posts
  );
}
// 게시글 삭제 API
function deletePost(post_id, team_id, board_id) {
  return instance.delete(`/team/${team_id}/board/${board_id}/post/${post_id}`);
}

export { getPostList, createPost, updatePost, deletePost };
