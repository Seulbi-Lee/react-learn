import { FC, PropsWithChildren } from "react";
import Calendar from "../components/calendar/calendar.component";
import { ModalProvider } from "../contexts/modal.provider";


const MainPage: FC<PropsWithChildren> =()=> {

  return(
    <>
      <ModalProvider>
        <Calendar />
      </ModalProvider>
    </>
  )
}

export default MainPage;
