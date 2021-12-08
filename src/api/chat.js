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

// 채팅방 내용 불러오기
function loadChatdetail(team_id, chatRoom_id) {
  return instance.get(`/team/${team_id}/chatroom/${chatRoom_id}/chat`);
}

// 채팅 멤버 불러오기
function loadChatMember(team_id) {
  return instance.get(`/team/${team_id}/chatroom/0/chatmember/6`);
}

// 채팅 전송 API
function sendChat(team_id, chatRoom_id, chat_contents) {
  return instance.post(
    `/team/${team_id}/chatroom/${chatRoom_id}/chat/new`,
    chat_contents
  );
}

export {
  createChatRoom,
  getChatRoomList,
  updateChatRoom,
  deleteChatRoom,
  loadChatdetail,
  sendChat,
  loadChatMember,
};
