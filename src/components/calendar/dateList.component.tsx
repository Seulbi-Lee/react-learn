import { FC, PropsWithChildren, useRef, useContext } from "react";
import ModalComponent from "../shared/modal.component";
import { useModalContext, useSetModalContext } from "../../contexts/modal.provider";

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
  const refSelectDate = useRef<any>(null);

  console.log('date list, click');

  const isOpen = useModalContext();
  const setIsOpen = useSetModalContext();

  const modalOpen = (e: any) => {
    refSelectDate.current = e.target.value;
    if (!setIsOpen) return;
    // setIsOpen(true);
  }
  
  return (
    <>
      <ul className="calendar-body">
        {pervDates.map((empty: any, index: any) => (
          <li className="date-number" key={-index}>{empty}</li>
        ))}
        {dateArray.map((date: number, index: any) => (
          <li className="date-number" key={index}>
            <button
              type='button'
              className={yyyymd === `${dateInfo}-${date}` ? "date-btn today" : "date-btn"} 
              onClick={(e)=>{modalOpen(e)}} value={`${dateInfo}-${date}`}
            >
              {date}
            </button>
          </li>
        ))}
      </ul>

      {isOpen &&
        <ModalComponent>
          {refSelectDate.current}
        </ModalComponent>
      }
    </>
  )
}

export default DateList;