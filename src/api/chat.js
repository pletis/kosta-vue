// 채팅 리스트 조작 관련된 CRUD API 파일
import { instance } from "./index";

function createChatRoom(team_id, chatRoom_data) {
  return instance.post(`/team/${team_id}/chatroom/new`, chatRoom_data);
}

function getChatRoomList(team_id) {
  return instance.get(`/team/${team_id}/chatroom/`);
}

function updateChatRoom(team_id, chatRoom_id, chatRoom_data) {
  return instance.put(
    `/team/${team_id}/chatroom/${chatRoom_id}`,
    chatRoom_data
  );
}

function deleteChatRoom(team_id, chatRoom_id) {
  return instance.delete(`/team/${team_id}/chatroom/${chatRoom_id}`);
}

export { createChatRoom, getChatRoomList, updateChatRoom, deleteChatRoom };
