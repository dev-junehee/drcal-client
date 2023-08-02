import { styled } from 'styled-components';
import ExelBtn from '../Buttons/ExelBtn';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { hospitalDecode } from '@/utils/decode';

interface Calendar {
  id: number;
  name: string;
  level: string;
  hospital_id: number;
  dept_id: number;
  category: string;
  start_date: string;
  end_date: string;
  evaluation: string;
}

const CalendarList = () => {
  const [listData, setListData] = useState<Calendar[]>([]);

  const getUser = async () => {
    try {
      const data = await axios.get('http://127.0.0.1:5173/daseul/Calendar.json');
      setListData(data.data.item);
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

  const getLevel = (level: string) => {
    if (level == 'PK') {
      return '본과실습생';
    } else if (level == 'INTERN') {
      return '인턴';
    } else if (level == 'RESIDENT') {
      return '전공의';
    } else if (level == 'FELLOW') {
      return '전문의';
    }
  };

  const getCategory = (category: string) => {
    if (category == 'DUTY') {
      return '당직';
    } else {
      return '휴가';
    }
  };

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
              <span className="date">{data.start_date}</span>
            ) : (
              <span className="date">{data.start_date + ' - ' + data.end_date}</span>
            )}
            <span className="category">{getCategory(data.category)}</span>
            <span className="name">{data.name}</span>
            <span className="dept">{hospitalDecode[data.hospital_id].dept[data.dept_id]}</span>
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
  &:last-child {
    border-bottom: none;
  }
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
