import { FC, PropsWithChildren, useState, useRef } from 'react';
import Weekdays from './weekdays.component';
import DateList from './dateList.component';
import MonthList from './monthList.component';
import Schedule from "./schedule.component";

const Calendar: FC<PropsWithChildren> = () => {
  const [addMonth, setAddMonth] = useState<number>(0);  // addMonth가 변하면 달력 다시 생성

  const today = new Date();
  const yyyymd = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;  // 오늘 yyyy-m-d  // 2024-2-8
  const lastdate = new Date(today.getFullYear(), today.getMonth() + addMonth + 1, 0).getDate();  // 현재 년, 다음 월, 0일 기준 (= 이번달 마지막 일 31인지 30인지 확인) // 29
  const monthlyFirstDate = new Date(today.getFullYear(), today.getMonth() + addMonth, 1);  // 현재 년, 월, 1일  // Thu Feb 01 2024
  const monthlyFirstDay = monthlyFirstDate.getDay();  // 일요일 = 0 // 4
  const thisYear = monthlyFirstDate.getFullYear();  // yyyy // 2024
  const thisMonth = monthlyFirstDate.getMonth() + 1;  // JAN = 1  // 2
  const monthList = [
    {num: 1, name: 'JAN'},
    {num: 2, name: 'FEB'},
    {num: 3, name: 'MAR'},
    {num: 4, name: 'APR'},
    {num: 5, name: 'MAY'},
    {num: 6, name: 'JUN'},
    {num: 7, name: 'JUL'},
    {num: 8, name: 'AUG'},
    {num: 9, name: 'SEP'},
    {num: 10, name: 'OCT'},
    {num: 11, name: 'NOV'},
    {num: 12, name: 'DEC'},
  ];
  const thisDay = useRef<any>(yyyymd);

  // 월 이동
  const calculateMonth = (number: number)=> {
    const addNumber = number - thisMonth; // 클릭 한 달(1월) - 현재 달 (2월)
    setAddMonth(add => add + addNumber);  // = 0 - 1 달로 이동
  }

  return (
    <>
      <main className="wrap">
        <section className="calendar-wrap">
          <h1 className="hidden">Calendar</h1>

          <article className="schedule">
            <h2 className="today-title">FRIDAY<br/>{monthList[thisDay.current.split('-')[1]-1].name} {thisDay.current.split('-')[2]}TH</h2>
            <Schedule />
          </article>

          <article className="calendar">
            <h2 className="year-title"><button>{thisYear}</button></h2>

            <MonthList
              monthList = {monthList}
              thisMonth = {thisMonth}
              calculateMonth= {calculateMonth}
            />

            <div className="calendar-table">
              <div className="month-change">
                <button className="month-prev" onClick={() => calculateMonth(thisMonth-1)} value='prev'>prev</button>
                <button className="month-next" onClick={() => calculateMonth(thisMonth+1)} value='next'>next</button>
              </div>

              <Weekdays/>
              
              <DateList 
                lastdate = {lastdate}
                monthlyFirstDay = {monthlyFirstDay}
                thisYear = {thisYear}
                thisMonth = {thisMonth}
                yyyymd = {yyyymd}
              />
            </div>
          </article>
        </section>
      </main>
    </>
  );
}

export default Calendar;

