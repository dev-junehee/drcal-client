import { MdOutlineLocalHospital } from 'react-icons/md';
import styled from 'styled-components';

const MainHeader = () => {
  return (
    <Container>
      <HosPital>
        <MdOutlineLocalHospital />
        <span className="hospital-name">연세 세브란스 병원</span>
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
