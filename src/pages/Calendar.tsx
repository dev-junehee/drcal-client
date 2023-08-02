import CalendarHeader from '@/components/Calendar/CalendarHeader';
import { styled } from 'styled-components';
import { useState } from 'react';
import dayjs from 'dayjs';
import CalendarBody from '@/components/Calendar/CalendarBody';
import CalendarList from '@/components/Calendar/CalendarList';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [toggleButton, settoggleButton] = useState(true);
  const [dutyActive, setdutyActive] = useState(false);
  const [annualActive, setannualActive] = useState(false);

  const prevMonth = () => {
    setCurrentMonth(prevMonth => prevMonth.subtract(1, 'month'));
  };

  const nextMonth = () => {
    setCurrentMonth(prevMonth => prevMonth.add(1, 'month'));
  };

  const handleClickToggle = () => {
    settoggleButton(!toggleButton);
  };

  const handleClickToday = () => {
    setCurrentMonth(dayjs(dayjs().format('YYYY-MM-DD')));
  };

  const handleClickDuty = () => {
    setdutyActive(!dutyActive);
  };

  const handleClickAnnual = () => {
    setannualActive(!annualActive);
  };

  return (
    <Container>
      <ToggleButton>
        <Button className={toggleButton ? 'calendar-button active' : 'calendar-button'} onClick={handleClickToggle}>
          달력
        </Button>
        <Button className={toggleButton ? 'list-button' : 'list-button active'} onClick={handleClickToggle}>
          목록
        </Button>
      </ToggleButton>
      {toggleButton ? (
        <>
          <button className="today-button" onClick={handleClickToday}>
            오늘
          </button>
          <FilterButtons>
            <button className={dutyActive ? 'duty-button active' : 'duty-button'} onClick={handleClickDuty}>
              당직
            </button>
            <button className={annualActive ? 'annual-button active' : 'annual-button'} onClick={handleClickAnnual}>
              휴가
            </button>
          </FilterButtons>
          <CalendarHeader prevMonth={prevMonth} nextMonth={nextMonth} currentMonth={currentMonth} />
          <CalendarBody currentMonth={currentMonth} dutyactive={dutyActive} annualactive={annualActive} />
        </>
      ) : (
        <CalendarList />
      )}
    </Container>
  );
};

export default Calendar;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 64px);
  padding: 20px;
  box-sizing: border-box;
  .today-button {
    position: absolute;
    left: 120px;
    width: 45px;
    height: 30px;
    border: none;
    outline: none;
    border: 1px solid ${props => props.theme.gray};
    border-radius: 4px;
    color: ${props => props.theme.gray};
    background-color: ${props => props.theme.white};
    cursor: pointer;
  }
`;

const ToggleButton = styled.div`
  position: absolute;
  right: 20px;
`;

const Button = styled.button`
  height: 30px;
  border: none;
  outline: none;
  border: 1px solid ${props => props.theme.gray};
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.gray};
  cursor: pointer;
  &.calendar-button {
    width: 45px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: none;
  }
  &.list-button {
    width: 45px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  &.active {
    border: 2px solid ${props => props.theme.primary};
    background-color: rgba(37, 64, 135, 0.3);
    color: ${props => props.theme.primary};
  }
`;

const FilterButtons = styled.div`
  position: absolute;
  right: 0px;
  display: flex;
  margin-right: 120px;
  gap: 5px;
  button {
    width: 45px;
    height: 30px;
    outline: none;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.gray};
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.gray};
    cursor: pointer;
    &.active {
      background-color: ${props => props.theme.primary};
      color: ${props => props.theme.white};
    }
  }
`;
