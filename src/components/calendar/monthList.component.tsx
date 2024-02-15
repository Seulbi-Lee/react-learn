import { FC, PropsWithChildren } from 'react';

type CalendarMonthPorps = {
  monthList: any[];
  thisMonth: number;
  calculateMonth: (number: number) => void;
}

const MonthList: FC<PropsWithChildren<CalendarMonthPorps>> = ({
  monthList,
  thisMonth,
  calculateMonth,
}) => {
  // useEffect(() => {
  //   const monthBtnArr: any = document.querySelectorAll('.month-btn');

  //   for(const monthBtn of monthBtnArr) {
  //     if(monthBtn !== null) {
  //       if(+monthBtn.value === thisMonth) {
  //         monthBtn.classList.add('this-month');
  //       }else{
  //         monthBtn.classList.remove('this-month');
  //       }
  //     }
  //   }
  // }, [thisMonth]);

  return (
    <ul className="month-list">
      {monthList.map((month: any) => (
        <li className="month-name" key={month.num}>
          <button className={month.num === thisMonth ? "month-btn this-month" : "month-btn"} onClick={() => calculateMonth(month.num)} value={month.num}>{month.name}</button>
        </li>
      ))}
    </ul>
  );
}

export default MonthList;
