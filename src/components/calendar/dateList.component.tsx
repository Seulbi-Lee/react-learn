import { FC, PropsWithChildren } from "react";
import Dates from "./dates.component";

// 이렇게 type 잡아주면 props.이런거 안붙여줘도 됨
type CalendarDateProps = {
  lastdate: number;
  monthlyFirstDay: any;
  thisYear: number;
  thisMonth: number;
  yyyymd: any;
};

const DateList: FC<PropsWithChildren<CalendarDateProps>> = ({ 
  lastdate,
  monthlyFirstDay,
  thisYear,
  thisMonth,
  yyyymd,
}) => {
  const pervDates = Array.from({length: monthlyFirstDay}, v => '');   // 빈칸 갯수
  const dateArray = Array.from({length: lastdate}, (v, i) => i + 1);  // 시작일
  const dateInfo = `${thisYear}-${thisMonth}`;  // yyyy-m
  
  console.log('date list')

  return (
    <>
      <ul className="calendar-body">
        {pervDates.map((empty: any, index: any) => (
          <li className="date-number" key={-index}>{empty}</li>
        ))}
        {dateArray.map((date: number, index: any) => (
          <li className="date-number" key={index}>
            <Dates dateInfo = {dateInfo} date = {date} yyyymd = {yyyymd}/>
          </li>
        ))}
      </ul>
    </>
  )
}

export default DateList;