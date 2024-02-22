import { FC, PropsWithChildren } from "react";
import Modal from "../shared/modal.component";
import { useModal } from "../../hooks/useModal";

type DatesListProps = {
  dateInfo: any;
  date: number;
  yyyymd: any;
}

const Dates: FC<PropsWithChildren<DatesListProps>> = ({
  dateInfo,
  date,
  yyyymd,
}) => {
  const today = `${dateInfo}-${date}`;

  const { openModal, closeModal, isOpen} = useModal();

  return (
    <>
      <Modal closeHandler={closeModal} isOpen={isOpen}>
        {today}
      </Modal>

      <button
        type='button'
        className={yyyymd === today ? "date-btn today" : "date-btn"} 
        value={today}
        onClick={openModal}
      >
        {date}
      </button>
    </>
  )
}

export default Dates;
