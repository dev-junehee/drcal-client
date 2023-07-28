import { styled } from 'styled-components';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaRegPaperPlane } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import AnnualBtn from '@/components/Buttons/AnnualBtn';
import DutyBtn from '@/components/Buttons/DutyBtn';
import { useEffect, useState } from 'react';
import { data } from '@/MockData/User';

interface UserData {
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

const initialUserData: UserData = {
  id: 0,
  emp_no: 0,
  name: '',
  email: '',
  phone: '',
  hospital_id: 0,
  dept_id: 0,
  level: '',
  auth: '',
  status: '',
  annual: 0,
  duty: 0,
  profile_image_url: '',
  hiredate: '',
  created_at: '',
  updated_at: '',
};

const SideBar = () => {
  const [User, setUser] = useState<UserData>(initialUserData);

  useEffect(() => {
    const obj = data.user;
    setUser(obj);
  }, []);

  //과
  const getDept = () => {
    if (User.dept_id == 1) {
      return '소아과';
    } else if (User.dept_id == 2) {
      return '흉부외과';
    }
  };

  //직급
  const getLevel = () => {
    if (User.level == 'PK') {
      return '본과실습생';
    } else if (User.level == 'INTERN') {
      return '인턴';
    } else if (User.level == 'RESIDENT') {
      return '전공의';
    } else if (User.level == 'FELLOW') {
      return '전문의';
    }
  };

  //그래프 퍼센트 계산
  const percentData = (data: number, max: number) => {
    return Math.floor((data / max) * 100);
  };

  return (
    <Container>
      <Logo>Dr.Cal</Logo>
      <Menu>
        <MenuItem to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          <AiOutlineClockCircle />
          <span>전체 캘린더</span>
        </MenuItem>
        <MenuItem to="/request" className={({ isActive }) => (isActive ? 'active' : '')}>
          <FaRegPaperPlane />
          <span>요청 내역 확인</span>
        </MenuItem>
        <MenuItem to="/mypage" className={({ isActive }) => (isActive ? 'active' : '')}>
          <BsFillPersonFill />
          <span>개인 정보 수정</span>
        </MenuItem>
      </Menu>
      <Wrapper>
        <UserInfo>
          <span className="user-name">{User.name}</span>
          <span className="user-dept">{getDept()}</span>
          <span className="user-level">{getLevel()}</span>
        </UserInfo>
        <UserData>
          <DataRow>
            <span className="label">남은 연차</span>
            <ProgressBar>
              <Progress className="annual" percent={percentData(User.annual, 15)}></Progress>
            </ProgressBar>
            <span>{User.annual}일</span>
          </DataRow>
          <DataRow>
            <span className="label">이번달 당직</span>
            <ProgressBar>
              <Progress className="duty" percent={percentData(User.duty, 15)}></Progress>
            </ProgressBar>
            <span>{User.duty}일</span>
          </DataRow>
        </UserData>
        <AnnualBtn />
        <DutyBtn />
        <LogoutBtn>로그아웃</LogoutBtn>
        <Mark>©Dr.Cal</Mark>
      </Wrapper>
    </Container>
  );
};

export default SideBar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  width: 18.75rem;
  height: 100%;
  background-color: ${props => props.theme.white};
`;

const Logo = styled.span`
  margin-top: 2.5rem;
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 3.125rem;
`;

const MenuItem = styled(NavLink)`
  font-weight: 700;
  display: flex;
  align-items: center;
  span {
    margin-left: 1rem;
    box-sizing: border-box;
    height: 1.5rem;
  }
  &.active {
    color: ${props => props.theme.primary};
    span {
      border-bottom: 2px solid ${props => props.theme.primary};
    }
  }
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const UserInfo = styled.div`
  width: 15rem;
  display: flex;
  align-items: baseline;
  .user-name {
    font-size: 1.125rem;
    font-weight: 700;
    margin-right: 0.5rem;
  }
  .user-dept,
  .user-level {
    font-size: 0.75rem;
    color: ${props => props.theme.gray};
    margin-right: 0.3125rem;
  }
`;

const UserData = styled.div`
  width: 15rem;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 1.25rem;
`;

const DataRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .label {
    width: 5rem;
  }
`;

const ProgressBar = styled.div`
  width: 5rem;
  height: 0.3125rem;
  background-color: ${props => props.theme.middleGray};
  border-radius: 1.875rem;
`;

const Progress = styled.div<{ percent: number }>`
  width: ${props => props.percent + '%'};
  height: 100%;
  background-color: ${props => props.theme.primary};
  border-radius: 1.875rem;
`;

const LogoutBtn = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  color: ${props => props.theme.primary};
  font-size: 0.8125rem;
  margin-bottom: 2.5rem;
  font-weight: 500;
  cursor: pointer;
`;

const Mark = styled.span`
  color: ${props => props.theme.lightGray};
  font-size: 0.8125rem;
`;
