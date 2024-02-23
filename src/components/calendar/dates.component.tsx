import { FC, PropsWithChildren } from "react";
import { useModal } from "../../hooks/useModal";
import DateModal from "./dateModal.component";

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

  const { Modal, openModal } = useModal(DateModal);

  return (
    <>
      <Modal abc={'hello'} def={'word'}>
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
