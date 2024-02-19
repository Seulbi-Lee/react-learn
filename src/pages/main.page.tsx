import { FC, PropsWithChildren } from "react";
import Calendar from "../components/calendar/calendar.component";
import ModalRoot from "../components/shared/modalRoot.component";
import { ModalProvider } from "../contexts/modal.provider";


const MainPage: FC<PropsWithChildren> =()=> {

  return(
    <>
      <ModalProvider>
        <Calendar />
        <ModalRoot />
      </ModalProvider>
    </>
  )
}

export default MainPage;
