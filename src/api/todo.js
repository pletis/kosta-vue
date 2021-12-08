import { instance } from "./index";
// todo리스트 API

// todo리스트 생성 API
function createTodo(team_num, todo) {
  return instance.post(`/team/${team_num}/todo/new`, todo);
}

// todo 조회 API
function getTodo(team_num, todo_num) {
  return instance.get(`/team/${team_num}/todo/${todo_num}`);
}

// todo리스트 조회 API
function getTodoList(team_num, member_num) {
  return instance.get(`/team/${team_num}/todo/list/${member_num}`);
}

// todo리스트 수정 API
function updateTodo(team_num, todo_num, todo) {
  return instance.put(`/team/${team_num}/todo/${todo_num}`, todo);
}

// todo리스트 삭제 API
function deleteTodo(team_num, todo_num) {
  return instance.delete(`/team/${team_num}/todo/${todo_num}`);
}

export { createTodo, getTodo, getTodoList, updateTodo, deleteTodo };
