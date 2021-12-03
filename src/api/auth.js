// 로그인, 회원가입, 회원 탈퇴
import { instance } from "./index";

// 회원가입 API
function registerUser(userData) {
  return instance.post("users/register", userData);
}

// 로그인 API
function loginUser(userData) {
  return instance.post("login", userData);
}

// 내정보 수정 API
function updateUser(userData) {
  return instance.post("users/update", userData);
}

// 비밀번호 찾기 API
function findUser(userData) {
  return instance.post("users/emailFindPw", userData);
}

export { registerUser, loginUser, updateUser, findUser };
