import styled from 'styled-components';
import dayjs from 'dayjs';

interface CalendarHeaderProps {
  prevMonth: () => void;
  nextMonth: () => void;
  currentMonth: dayjs.Dayjs;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ prevMonth, nextMonth, currentMonth }) => {
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <>
      <Header>
        <CalendarButtons>
          <button className="prev-button" onClick={prevMonth}>
            &lt;
          </button>
          <button className="next-button" onClick={nextMonth}>
            &gt;
          </button>
          <MonthWrapper>{currentMonth.format('YYYY년 M월')}</MonthWrapper>
        </CalendarButtons>
      </Header>
      <Weeks>
        {weekDays.map(day => (
          <Week className="weeks" key={day}>
            <div>{day}</div>
          </Week>
        ))}
      </Weeks>
    </>
  );
};

export default CalendarHeader;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  .prev-button,
  .next-button,
  .calendar-button,
  .list-button {
    height: 30px;
    border: none;
    outline: none;
    border: 1px solid ${props => props.theme.gray};
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.gray};
    cursor: pointer;
  }
  .calendar-button,
  .prev-button {
    width: 45px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: none;
  }
  .list-button,
  .next-button {
    width: 45px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const CalendarButtons = styled.div`
  display: flex;
`;

const MonthWrapper = styled.div`
  margin-left: 70px;
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.primary};
`;

const Weeks = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-left: 1px solid ${props => props.theme.gray};
  border-top: 1px solid ${props => props.theme.gray};
  border-right: 1px solid ${props => props.theme.gray};
  margin-top: 20px;
  background-color: ${props => props.theme.white};
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-right: 1px solid ${props => props.theme.gray};
    color: ${props => props.theme.gray};
    font-weight: 500;
    &:last-child {
      padding-right: 1px;
      border-right: none;
    }
  }
`;

const Week = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100% / 7);
`;
