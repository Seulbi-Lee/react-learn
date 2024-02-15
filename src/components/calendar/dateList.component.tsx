import { FC, PropsWithChildren, useState, useRef } from "react";
import ModalComponent from "../shared/modal.component";

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
  const [modal, setModal] = useState<boolean>(false);
  const refSelectDate = useRef<any>(null);

  const modalOpen = (e: any) => {
    refSelectDate.current = e.target.value;
    setModal(true);
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

      {/* 왜 이부분이 li 안에 들어갔을 때 {date}를 바로 받을 수 없는지 물어보기 */}
      <ModalComponent modal={modal} modalClose={setModal}>
        {/* 여기 내용이 madal component 로 children으로 들어감 */}
        {refSelectDate.current}
      </ModalComponent>
    </>
  )
}

export default DateList;