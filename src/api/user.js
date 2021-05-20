import { fetch } from "../utils/request";

export function getUserInfo(params = {}) {
  return fetch('/api/user_info', params)
}
