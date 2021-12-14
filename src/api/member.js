import { instance } from "./index";
// member API

// 팀에 해당하는 모든 member 조회 API
function getMembers(team_num) {
  return instance.get(`/team/${team_num}/member`);
}

// 초대가능 memeber 조회 API
function getInviteMember(team_num) {
  return instance.get(`/team/${team_num}/member/withoutmember`);
}

// 초대된 chatmember 제외하고 조회 API
function getInviteChatMember(team_num, chatroom_num) {
  return instance.get(
    `/team/${team_num}/member/withoutchatmember?chatroom_num=${chatroom_num}`
  );
}

// 속한 chatmember 조회 API
function getChatMember(team_num, chatRoom_num) {
  return instance.get(`/team/${team_num}/chatroom/${chatRoom_num}/chatmember`);
}

// member 초대 API
function inviteSelectMember(team_num, user) {
  return instance.post(`/team/${team_num}/member/invite`, user);
}

// chatmember 초대 API
function inviteChatMembers(team_num, chatRoom_num, invite_data) {
  return instance.post(
    `/team/${team_num}/chatroom/${chatRoom_num}/chatmember/new`,
    invite_data
  );
}

export {
  getInviteMember,
  inviteSelectMember,
  inviteChatMembers,
  getMembers,
  getInviteChatMember,
  getChatMember,
};
