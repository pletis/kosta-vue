// 채팅 리스트 조작 관련된 CRUD API 파일
import { instance } from "./index";

function getChatList(team_id, id) {
  return instance.get(`/team/${team_id}/chat/list/${id}`);
}

export { getChatList };
