import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from 'axios';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaRegPaperPlane } from 'react-icons/fa';
import AnnualBtn from '@/components/Buttons/AnnualBtn';
import DutyBtn from '@/components/Buttons/DutyBtn';
import { hospitalDecode } from '@/utils/decode';

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

interface MenuItemProps {
  to: string;
  onClick?: () => void;
  isactive?: string;
}

interface SubMenuProps {
  open?: boolean;
}

interface ProgressProps {
  $percent: number;
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
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isMyPageActive, setIsMyPageActive] = useState('false');

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const data = await axios.get('http://127.0.0.1:5173/daseul/User.json');
      setUser(data.data.item);
      return data;
    } catch (error) {
      console.warn(error);
      console.warn('fail');
      return false;
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  //직급 구분 출력
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

  const handleClickMyPage = () => {
    setIsSubMenuOpen(true);
  };

  const handleClickMenu = () => {
    setIsSubMenuOpen(false);
    setIsMyPageActive('false');
  };

  const handleClickSubMenu = () => {
    setIsMyPageActive('true');
  };

  const handleClickLogout = () => {
    //토큰 받아오기 성공 이후 토큰날리기 작업 추가 필요
    navigate('/login');
  };

  return (
    <Container>
      <NavLink to={'/'}>
        <Logo></Logo>
      </NavLink>
      <Menu>
        <MenuItem to="/" onClick={handleClickMenu}>
          <AiOutlineClockCircle />
          <span>전체 캘린더</span>
        </MenuItem>
        <MenuItem to="/request" onClick={handleClickMenu}>
          <FaRegPaperPlane />
          <span>요청 내역 확인</span>
        </MenuItem>
        <MenuItem to="/userinfo" onClick={handleClickMyPage} isactive={isMyPageActive}>
          <BsFillPersonFill />
          <span className="mypage">마이페이지</span>
        </MenuItem>
      </Menu>
      <SubMenu open={isSubMenuOpen}>
        <SubMenuItem to="/userinfo" onClick={handleClickSubMenu}>
          개인정보 수정
        </SubMenuItem>
        <SubMenuItem to="/password" onClick={handleClickSubMenu}>
          비밀번호 변경
        </SubMenuItem>
      </SubMenu>

      <Wrapper>
        <UserInfo>
          <span className="user-name">{User.name}</span>
          <span className="user-dept">{hospitalDecode[User.hospital_id]?.dept[User.dept_id]}</span>
          <span className="user-level">{getLevel()}</span>
        </UserInfo>
        <UserData>
          <DataRow>
            <span className="label">남은 연차</span>
            <ProgressBar>
              <Progress className="annual" $percent={percentData(User.annual, 20)}></Progress>
            </ProgressBar>
            <span>{User.annual}일</span>
          </DataRow>
          <DataRow>
            <span className="label">이번달 당직</span>
            <ProgressBar>
              <Progress className="duty" $percent={percentData(User.duty, 20)}></Progress>
            </ProgressBar>
            <span>{User.duty}일</span>
          </DataRow>
        </UserData>
        <AnnualBtn />
        <DutyBtn />
        <LogoutBtn onClick={handleClickLogout}>로그아웃</LogoutBtn>
        <Mark>©Dr.Cal</Mark>
      </Wrapper>
    </Container>
  );
};

export default SideBar;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  width: 300px;
  height: 100%;
  background-color: ${props => props.theme.white};
`;

const Logo = styled.div`
  margin-top: 60px;
  background-image: url('src/assets/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  width: 160px;
  height: 35px;
  background-position: center;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 50px;
`;

const MenuItem = styled(NavLink)<MenuItemProps>`
  font-weight: 700;
  display: flex;
  align-items: center;
  span {
    margin-left: 16px;
    box-sizing: border-box;
    height: 24px;
  }
  &.active {
    color: ${props => props.theme.primary};
    span {
      border-bottom: 2px solid ${props => props.theme.primary};
    }
  }
  .mypage {
    border-bottom: ${props => (props.isactive == 'true' ? '2px' : '0')} solid ${props => props.theme.primary};
  }
`;

const SubMenu = styled.div<SubMenuProps>`
  display: ${props => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  margin-left: 20px;
`;

const SubMenuItem = styled(NavLink)`
  align-items: center;
  font-size: 0.875rem;
  color: ${props => props.theme.lightGray};
  &.active {
    font-weight: 700;
    color: ${props => props.theme.black};
  }
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  margin-bottom: 15px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: baseline;
  width: 240px;
  .user-name {
    margin-right: 10px;
    font-size: 1.125rem;
    font-weight: 700;
  }
  .user-dept,
  .user-level {
    margin-right: 5px;
    font-size: 0.75rem;
    color: ${props => props.theme.gray};
  }
`;

const UserData = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  gap: 16px;
  margin-bottom: 20px;
`;

const DataRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .label {
    width: 80px;
  }
`;

const ProgressBar = styled.div`
  width: 80px;
  height: 5px;
  border-radius: 30px;
  background-color: ${props => props.theme.middleGray};
`;

const Progress = styled.div<ProgressProps>`
  width: ${props => props.$percent + '%'};
  height: 100%;
  border-radius: 30px;
  background-color: ${props => props.theme.primary};
`;

const LogoutBtn = styled.button`
  border: none;
  outline: none;
  margin-top: 20px;
  background-color: transparent;
  color: ${props => props.theme.primary};
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
`;

const Mark = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.lightGray};
`;
