import { FC, PropsWithChildren } from "react";
import Calendar from "../components/calendar/calendar.component";

const MainPage: FC<PropsWithChildren> =()=> {
  return(
    <>
      <Calendar/>
      <div id="modalRoot"></div>
    </>
  )
}

export default MainPage;
