import { styled } from 'styled-components';
import ExelBtn from '../Buttons/ExelBtn';
import { useState } from 'react';
import { Schedule } from '@/lib/types';
import { getLevel } from '@/utils/decode';

const CalendarList = ({ scheduleData }: { scheduleData: Schedule[] }) => {
  const [listData] = useState<Schedule[]>(scheduleData);

  return (
    <Container>
      <Header>
        <ExelBtn />
      </Header>
      <ListHead>
        <span className="date">날짜</span>
        <span className="category">유형</span>
        <span className="name">이름</span>
        <span className="dept">파트</span>
        <span className="level">직급</span>
      </ListHead>
      <ListBody>
        {listData.map((data, index) => (
          <ListItem key={index} className={index % 2 === 0 ? 'line' : ''}>
            {data.category === 'DUTY' ? (
              <span className="date">{data.startDate}</span>
            ) : (
              <span className="date">{data.startDate + ' - ' + data.endDate}</span>
            )}
            <span className="category">휴가</span>
            <span className="name">{data.name}</span>
            <span className="dept">{data.deptName}</span>
            <span className="level">{getLevel(data.level)}</span>
          </ListItem>
        ))}
      </ListBody>
    </Container>
  );
};

export default CalendarList;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
`;

const ListHead = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  border: 1px solid ${props => props.theme.gray};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: ${props => props.theme.white};
  box-sizing: border-box;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 0;
    box-sizing: border-box;
  }
  .date {
    flex-grow: 1.5;
    flex-basis: 0;
  }
  .category {
    flex-grow: 0.5;
  }
  .name {
    flex-grow: 1;
  }
  .dept {
    flex-grow: 1;
  }
  .level {
    flex-grow: 1;
    padding-right: 17px;
  }
`;

const ListBody = styled.div`
  width: 100%;
  height: calc(100% - 90px);
  overflow-y: scroll;
  border: 1px solid ${props => props.theme.gray};
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: ${props => props.theme.white};
  box-sizing: border-box;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  border-bottom: 1px solid ${props => props.theme.gray};
  color: ${props => props.theme.black};
  &.line {
    background-color: ${props => props.theme.bgColor};
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 0;
    height: 100%;
    border-right: 1px solid ${props => props.theme.gray};
  }
  .date {
    flex-grow: 1.5;
  }
  .category {
    flex-grow: 0.5;
  }
  .name {
    flex-grow: 1;
  }
  .dept {
    flex-grow: 1;
  }
  .level {
    flex-grow: 1;
  }
`;
