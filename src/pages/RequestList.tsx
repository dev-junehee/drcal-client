import { getRequest2 } from '@/lib/api';
import { UserDataState } from '@/states/stateUserdata';
import { getCategory, getEvaluation } from '@/utils/decode';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

const RequestList = () => {
  const userDataState = useRecoilValue(UserDataState);
  const [requestLists, setRequestLists] = useState({});
  const userID = userDataState.id;

  useEffect(() => {
    const getList = async () => {
      console.log(userID);
      const res = await getRequest2(userID);
      setRequestLists(res.item);
    };
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(requestLists);
  return (
    <Container>
      <Header>
        <h1>요청 내역</h1>
        <Select name="filterMenu">
          <option value="최신순">최신순</option>
          <option value="오래된순">오래된순</option>
        </Select>
      </Header>
      <TableContainer>
        <DataWrap>
          <div className="box1">No.</div>
          <div className="box2">유형</div>
          <div className="box3">신청날짜</div>
          <div className="box4">희망날짜</div>
          <div className="box5">상태</div>
          <div className="box6">변경</div>
        </DataWrap>
        {requestLists &&
          Object.keys(requestLists).map(key => (
            <DataWrap key={key}>
              <div className="box1">{Number(key) + 1}</div>
              <div className="box2">{getCategory(requestLists[key].category)}</div>
              <div className="box3">{requestLists[key].createdAt.slice(0, 10)}</div>
              <div className="box4">
                {requestLists[key].startDate === requestLists[key].endDate
                  ? requestLists[key].startDate
                  : requestLists[key].startDate + '~' + requestLists[key].endDate}
              </div>
              <div className="box5">
                <BtnBox className={requestLists[key].evaluation}>
                  <Dot />
                  {getEvaluation(requestLists[key].evaluation)}
                </BtnBox>
              </div>
              <div className="box6">변경</div>
            </DataWrap>
          ))}
      </TableContainer>
    </Container>
  );
};
const Container = styled.div`
  padding: 50px 100px;
`;
const Select = styled.select`
  width: 100px;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
`;
const TableContainer = styled.div`
  background-color: ${props => props.theme.white};
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-bottom: 1px solid ${props => props.theme.gray};
  border-top: 1px solid ${props => props.theme.gray};
`;
const DataWrap = styled.div`
  padding: 16px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  &:first-child {
    border-bottom: 1px solid ${props => props.theme.gray};
    font-weight: 700;
  }
  &:last-child {
    margin-bottom: 16px;
  }
  div {
    text-align: center;
  }
  .box1 {
    flex: 0.5;
  }
  .box2 {
    flex: 2;
  }
  .box3 {
    flex: 2;
  }
  .box4 {
    flex: 3;
  }
  .box5 {
    flex: 1;
  }
  .box6 {
    flex: 2;
  }
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  border-radius: 20px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
  margin: 0;

  &.STANDBY {
    background-color: ${props => props.theme.green};
  }
  &.APPROVED {
    background-color: ${props => props.theme.blue};
  }
  &.REJECTED {
    background-color: ${props => props.theme.red};
  }
  &.CANCELED {
    background-color: ${props => props.theme.middleGray};
  }
`;
const Dot = styled.div`
  width: 12px;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  margin-right: 8px;
`;
export default RequestList;
