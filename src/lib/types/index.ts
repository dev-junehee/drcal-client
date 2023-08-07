// 프로젝트에 사용되는 types 정리 //

// 사용자 데이터
export interface UserData {
  id: number;
  emp_no: number;
  name: string;
  email: string;
  phone: string;
  hospital_id: number;
  dept_id: number;
  level: string;
  auth: string;
  status: string;
  annual: number;
  duty: number;
  profile_image_url: string;
  hiredate: string;
  created_at: string;
  updated_at: string;
}

// 로그인
export interface LoginBody {
  email: string;
  password: string;
}

// 회원가입
export interface SignUpBody {
  email: string;
  password: string;
  phone: string;
  name: string;
  hospital_id: number;
  dept_id: number;
}

//비밀번호 변경
export interface editPasswordBody {
  new_password: string;
  old_password: string;
}

//마이페이지 수정
export interface EditMyPageBody {
  name: string;
  dept_id: number;
  phone: string;
  image: string;
}

//연차 등록
export interface CreateAnnualBody {
  startDate: Date;
  endDate: Date;
  reason: string;
}

//연차 내용 수정
export interface EditAnuualBody {
  startDate: Date;
  endDate: Date;
  reason: string;
}

//당직 등록
export interface CreateDutyBody {
  startDate: Date;
}

//당직 내용 수정
export interface EditDutyBody {
  startDate: Date;
}

//캘린더 조회
export interface Schedule {
  category: string;
  deptName: string;
  endDate: string;
  evaluation: string;
  hospitalName: string;
  id: number;
  level: string;
  name: string;
  startDate: string;
}

//날짜별 휴가 조회
export interface AnnualData {
  deptName: string;
  id: number;
  level: string;
  phone: string;
  username: string;
}

//날짜별 당직 조회
export interface DutyData {
  deptName: string;
  email: string;
  id: number;
  level: string;
  phone: string;
  profileImageUrl: string;
  userId: number;
  username: string;
}
