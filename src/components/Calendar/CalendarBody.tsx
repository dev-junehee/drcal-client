import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { styled } from 'styled-components';
import axios from 'axios';
import { useModal } from '@/hooks/useModal';
import { CalAnnualModal } from '../Modals/CalAnnualModal';
import { CalDutylModal } from '../Modals/CalDutyModal';

interface Calendar {
  id: number;
  name: string;
  level: string;
  hospital_id: number;
  category: string;
  start_date: string;
  end_date: string;
  evaluation: string;
}

const getLevel = (level: string) => {
  if (level === 'PK') {
    return '본과실습생';
  } else if (level === 'INTERN') {
    return '인턴';
  } else if (level === 'RESIDENT') {
    return '전공의';
  } else if (level === 'FELLOW') {
    return '전문의';
  }
};

const CalendarBody = ({
  currentMonth,
  dutyactive,
  annualactive,
}: {
  currentMonth: dayjs.Dayjs;
  dutyactive: boolean;
  annualactive: boolean;
}) => {
  const monthStart = currentMonth.startOf('month');
  const firstDayOfMonth = monthStart.day();
  const firstDate = monthStart.subtract(firstDayOfMonth, 'day');

  const [calendarData, setCalendarData] = useState<Calendar[]>([]);

  //달력 데이터 받아오기
  const getUser = async () => {
    try {
      const data = await axios.get('http://127.0.0.1:5173/daseul/Calendar.json');
      setCalendarData(data.data.item);
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

  const { openModal } = useModal();

  const handleClickDuty = (date: dayjs.Dayjs) => {
    const clickDate = date.format('YYYY-MM-DD');

    const modalData = {
      isOpen: true,
      title: '금일 응급실 당직',
      content: <CalDutylModal date={clickDate} />,
    };

    openModal(modalData);

    console.log('당직클릭', date.format('YYYY-MM-DD'));
  };

  const handleClickAnnual = (date: dayjs.Dayjs) => {
    const clickDate = date.format('YYYY-MM-DD');

    const modalData = {
      isOpen: true,
      title: '금일 휴가 인원',
      content: <CalAnnualModal date={clickDate} />,
    };

    openModal(modalData);
    console.log('휴가클릭', date.format('YYYY-MM-DD'));
  };

  //달력 7일 6주 고정
  const Date = (firstDate: dayjs.Dayjs) => {
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = firstDate.add(i, 'day');
      days.push(day);
    }
    return days;
  };
  const mapToDate = (dateArray: dayjs.Dayjs[]) => {
    return dateArray.map((date, index) => {
      const dateObj = dayjs(date);
      const arrAnnual = [];
      const arrDuty: string[] = [];

      Object.keys(calendarData).map(item => {
        const index = parseInt(item, 10);
        const cal = calendarData[index];

        //휴가 출력
        if (cal.category === 'ANNUAL') {
          if (dayjs(cal.end_date).diff(cal.start_date, 'day') > 0) {
            const diffInDays = dayjs(cal.end_date).diff(cal.start_date, 'day');

            const dateRange = [];
            for (let i = 0; i <= diffInDays; i++) {
              dateRange.push(dayjs(cal.start_date).add(i, 'day').format('YYYY-MM-DD'));
            }

            dateRange.map(item => {
              if (item === dateObj.format('YYYY-MM-DD')) {
                arrAnnual.push(item);
              }
            });
          } else {
            if (cal.start_date === dateObj.format('YYYY-MM-DD')) {
              arrAnnual.push(cal.id);
            }
          }
        }
        //당직 출력
        if (cal.category === 'DUTY' && cal.start_date === dateObj.format('YYYY-MM-DD')) {
          arrDuty.push(cal.name, cal.level);
        }
      });

      //클래스이름 부여
      const className = () => {
        const className = 'dates';
        if (dateObj.format('M') !== currentMonth.format('M')) {
          if (34 < index && index < 42) {
            return className + ' outdate lastline';
          }
          return className + ' outdate';
        } else {
          if (dateObj.format('YYYY-MM-DD') == dayjs().format('YYYY-MM-DD')) {
            return className + ' today';
          } else if (index % 7 === 0) {
            if (34 < index && index < 42) {
              return className + ' date-sun lastline';
            }
            return className + ' date-sun';
          } else if (index % 7 === 6) {
            if (34 < index && index < 42) {
              return className + ' date-sat lastline';
            }
            return className + ' date-sat';
          } else {
            if (34 < index && index < 42) {
              return className + ' date-weekday lastline';
            }
            return className + ' date-weekday';
          }
        }
      };

      return (
        <div key={index} className={className()}>
          <span className="calendar-date">{dateObj.format('D')}</span>
          {dutyactive && !annualactive ? (
            <Duty onClick={() => handleClickDuty(dateObj)}>
              <span className="duty-name">{arrDuty.length > 0 ? '• ' + arrDuty[0] : ''}</span>
              <span>{arrDuty.length > 0 ? getLevel(arrDuty[1]) : ''}</span>
            </Duty>
          ) : (
            ''
          )}
          {annualactive && !dutyactive ? (
            <Annual onClick={() => handleClickAnnual(dateObj)}>
              {arrAnnual.length > 0 ? '• 휴가' + arrAnnual.length + '명' : ''}
            </Annual>
          ) : (
            ''
          )}

          {!annualactive && !dutyactive ? (
            <>
              <Duty onClick={() => handleClickDuty(dateObj)}>
                <span className="duty-name">{arrDuty.length > 0 ? '• ' + arrDuty[0] : ''}</span>
                <span>{arrDuty.length > 0 ? getLevel(arrDuty[1]) : ''}</span>
              </Duty>
              <Annual onClick={() => handleClickAnnual(dateObj)}>
                {arrAnnual.length > 0 ? '• 휴가' + arrAnnual.length + '명' : ''}
              </Annual>
            </>
          ) : (
            ''
          )}
          {annualactive && dutyactive ? (
            <>
              <Duty onClick={() => handleClickDuty(dateObj)}>
                <span className="duty-name">{arrDuty.length > 0 ? '• ' + arrDuty[0] : ''}</span>
                <span>{arrDuty.length > 0 ? getLevel(arrDuty[1]) : ''}</span>
              </Duty>
              <Annual onClick={() => handleClickAnnual(dateObj)}>
                {arrAnnual.length > 0 ? '• 휴가' + arrAnnual.length + '명' : ''}
              </Annual>
            </>
          ) : (
            ''
          )}
        </div>
      );
    });
  };

  return <Container>{mapToDate(Date(firstDate))}</Container>;
};

export default CalendarBody;

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  width: 100%;
  height: calc(100% - 90px);
  border-right: 1px solid ${props => props.theme.gray};
  border-left: 1px solid ${props => props.theme.gray};
  border-bottom: 1px solid ${props => props.theme.gray};
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: ${props => props.theme.white};
  box-sizing: border-box;
  .dates {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid ${props => props.theme.gray};
    border-right: 1px solid ${props => props.theme.gray};
    padding: 5px;
    font-weight: 700;
    &:nth-child(35) {
      border-right: none;
    }
    //날짜
    .calendar-date {
      position: absolute;
      top: 5px;
      left: 5px;
    }
    &:last-child {
      border-right: none;
    }
    &.outdate {
      color: #c9c8c8;
    }
    &.date-sun {
      color: #ecbbbb;
      border-left: none;
    }
    &.date-sat {
      color: #a0c0da;
      border-right: none;
    }
    &.date-weekday {
      /* color: green; */
    }
    &.lastline {
      border-bottom: none;
    }
    &.today {
      color: ${props => props.theme.primary};
      .calendar-date {
        display: flex;
        width: 10px;
        border-bottom: 3px solid ${props => props.theme.primary};
      }
    }
  }
`;

const Duty = styled.div`
  display: flex;
  align-items: center;
  width: 75%;
  height: 20px;
  font-weight: 400;
  color: ${props => props.theme.primary};
  box-sizing: border-box;
  .duty-name {
    margin-right: 5px;
    font-weight: 700;
  }
`;

const Annual = styled.div`
  display: flex;
  align-items: center;
  width: 75%;
  height: 20px;
  color: ${props => props.theme.gray};
  font-weight: 400;
  box-sizing: border-box;
`;
