import http from './common/httpService';

export function getUsers() {
  return http.get('/adminui-problem/members.json')
}