import axios from "axios";
import { setInterceptors } from "./common/interceptors";

// 액시오스 초기화 함수
function createInstance() {
  return axios.create({});
}

function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: url,
  });
  return setInterceptors(instance);
}

export const instance = createInstance();
export const posts = createInstanceWithAuth("team");
