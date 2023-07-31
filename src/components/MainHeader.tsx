import axios from 'axios';
import { useState, useEffect } from 'react';
import { MdOutlineLocalHospital } from 'react-icons/md';
import styled from 'styled-components';
import { hospitalDecode } from '@/utils/decode';

const MainHeader = () => {
  const [hospital, setHospital]: number = useState('병원명');

  // 유저 개인 정보 (mypage) - 재직 병원 확인
  const getUserHospital = () => {
    axios.get('/junehee/mypage.json').then(res => {
      if (res.status === 200) {
        console.log('재직중인 병원 코드 확인', res.data.item.hospital_id);
        const hospitalNum = res.data.item.hospital_id;
        setHospital(hospitalDecode[hospitalNum].hospital);
      }
    });
  };

  useEffect(() => {
    getUserHospital();
  }, []);

  return (
    <Container>
      <HosPital>
        <MdOutlineLocalHospital />
        <span className="hospital-name">{hospital}</span>
      </HosPital>
    </Container>
  );
};

export default MainHeader;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 4rem;
  color: ${props => props.theme.gray};
  font-weight: 500;
`;

const HosPital = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem;
  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`;
