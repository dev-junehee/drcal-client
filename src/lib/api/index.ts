import axios from 'axios';
import {
  LoginBody,
  SignUpBody,
  EditMyPageBody,
  editPasswordBody,
  CreateAnnualBody,
  EditAnnualBody,
  CreateDutyBody,
  EditDutyBody,
} from '@/lib/types';

const instance = axios.create({
  baseURL: 'http://fastcampus-mini-project-env.eba-khrscmx7.ap-northeast-2.elasticbeanstalk.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const authToken = localStorage.getItem('authToken');
const token = authToken || '';

const authInstance = axios.create({
  baseURL: 'http://fastcampus-mini-project-env.eba-khrscmx7.ap-northeast-2.elasticbeanstalk.com',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${token}`,
  },
});

// 로그인
export const login = async (body: LoginBody) => {
  try {
    const res = await instance.post('/user/login', body);
    return res;
  } catch (error) {
    console.log('로그인 실패', error);
  }
};

// 로그아웃
export const logout = async () => {
  try {
    const res = await instance.post('/user/logout');
    return res.data;
  } catch (error) {
    console.log('로그아웃 실패');
  }
};

// 회원가입
export const signUp = async (body: SignUpBody) => {
  try {
    const res = await instance.post('/user/register', body);
    return res.data;
  } catch (error) {
    console.log('회원가입 실패', error);
  }
};

// 마이페이지
export const getMyPage = async () => {
  try {
    const res = await authInstance.get('/user/myPage');
    return res.data;
  } catch (error) {
    console.log('마이페이지 조회 실패', error);
  }
};

// 마이페이지 다른헤더
export const getMyPage2 = async () => {
  try {
    const res = await instance.get('/user/myPage', {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log('마이페이지 조회 실패', error);
  }
};

// 마이페이지 수정
export const editMyPage = async (body: EditMyPageBody) => {
  try {
    const res = await authInstance.post('/user/editUser', body);
    return res.data;
  } catch (error) {
    console.log('마이페이지 수정 실패', error);
  }
};

// 비밀번호 변경
export const editPassword = async (body: editPasswordBody) => {
  try {
    const res = await authInstance.post('/user/updatePassword', body);
    return res.data;
  } catch (error) {
    console.log('비밀번호 변경 실패', error);
  }
};

// 메인 캘린더 조회
export const getSchedule = async () => {
  try {
    const res = await instance.get('/schedule/', {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log('캘린더 조회 실패', error);
  }
};

// 날짜별 휴가 인원 조회
export const getAnnual = async (date: string) => {
  try {
    const res = await instance.get(`/schedule/date?chooseDate=${date}&category=ANNUAL`, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log('휴가 인원 조회 실패', error);
  }
};

// 날짜별 당직 인원 조회
export const getDuty = async (date: string) => {
  try {
    const res = await instance.get(`/schedule/date?chooseDate=${date}&category=DUTY`, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log('당직 인원 조회 실패', error);
  }
};

// 요청 내역 확인
export const getRequest = async (userId: number) => {
  try {
    const res = await authInstance.get(`/schedule/${userId}`);
    return res.data;
  } catch (error) {
    console.log('요청 내역 확인 실패', error);
  }
};

// 연차 등록
export const createAnnual = async (body: CreateAnnualBody) => {
  try {
    const res = await authInstance.post('/schedule/create/annual', body);
    return res.data;
  } catch (error) {
    console.log('연차 등록 요청 실패', error);
  }
};

// 연차 내용 수정
export const editAnnual = async (body: EditAnuualBody, scheduleId: number) => {
  try {
    const res = await authInstance.post(`/schedule/annual/${scheduleId}/update`, body);
    return res.data;
  } catch (error) {
    console.log('연차 내용 수정 실패', error);
  }
};

// 연차 신청 취소
export const cancelAnnual = async (scheduleId: number) => {
  try {
    const res = await authInstance.post(`/schedule/annual/delete?id=${scheduleId}`);
    return res.data;
  } catch (error) {
    console.log('연차 신청 취소 실패', error);
  }
};

// 당직 등록 (사용 여부 체크!)
export const createDuty = async (body: CreateDutyBody) => {
  try {
    const res = await authInstance.post('/schedule/create/duty', body);
    return res.data;
  } catch (error) {
    console.log('당직 등록 실패', error);
  }
};

// 당직 내용 수정
export const editDuty = async (body: EditDutyBody, scheduleId: number) => {
  try {
    const res = await authInstance.post(`/schedule/duty/${scheduleId}/update`, body);
    return res.data;
  } catch (error) {
    console.log('당직 내용 수정 실패', error);
  }
};

// 병원 정보 리스트
export const getHospitalList = async () => {
  try {
    const res = await instance.get('/hospital/list');
    return res.data;
  } catch (error) {
    console.log('병원 정보 리스트 조회 실패', error);
  }
};

// 병원 과 리스트
export const getDeptList = async (hospitalId: number) => {
  try {
    const res = await instance.get(`/dept/${hospitalId}/list`);
    return res.data;
  } catch (error) {
    console.log('병원 과 리스트 조회 실패', error);
  }
};
