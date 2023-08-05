import axios from 'axios';

// 예비 토큰
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdW5laGVlQGRyY2FsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJElVdUMzLlAzYVJ0RUcwZ2QxNWdaUy5tam9BemdWYjdvbmdYTWdXN3c1WnVVZkVtTlA3QVBTIiwiYXV0aCI6IlVTRVIiLCJpZCI6MTEsImV4cCI6MTY5MTM5NTk1MywidXNlcm5hbWUiOiLquYDspIDtnawiLCJzdGF0dXMiOiJBUFBST1ZFRCJ9.bcjiqSf7OTpTAAEDDuCUDZwzAWVG8JC7GZpmH5HJeCrbnjl0mjIrNuEGl-CNRMg4s8bprmtFSDqy_4XkDH7lOQ';

// 토큰 X
const instance = axios.create({
  baseURL: 'http://fastcampus-mini-project-env.eba-khrscmx7.ap-northeast-2.elasticbeanstalk.com',
  headers: { 'Content-Type': 'application/json' },
});

// 토큰 O
const authInstance = axios.create({
  baseURL: 'http://fastcampus-mini-project-env.eba-khrscmx7.ap-northeast-2.elasticbeanstalk.com',
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${localStorage.getItem('token')}`,
    Authorization: `Bearer ${token}`,
  },
});

// 요청 인터셉터
instance.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터
instance.interceptors.response.use(
  response => {
    if (response.status === 404) {
      // 404 페이지 연결
    }
  },
  error => {
    return Promise.reject(error);
  },
);

export { instance, authInstance };
