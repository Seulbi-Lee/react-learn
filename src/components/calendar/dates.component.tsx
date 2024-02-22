import { FC, PropsWithChildren } from "react";
import { useModal } from "../../hooks/useModal";

type DatesListProps = {
  dateInfo: any;
  date: number;
  yyyymd: any;
}

const DateModal: FC<PropsWithChildren<any>> = ({children, abc, def}) => {
  return (
    <>
      <div className="test">
        {children}
        <div>{abc}</div>
        <div>{def}</div>
      </div>
    </>  
  );
};

const Dates: FC<PropsWithChildren<DatesListProps>> = ({
  dateInfo,
  date,
  yyyymd,
}) => {
  const today = `${dateInfo}-${date}`;

  const { Modal, openModal } = useModal(DateModal);

  return (
    <>
      {/* case_1 */}
      {/* <Modal>
        {today}
      </Modal> */}

      {/* case_2 */}
      {/* <Modal>
        {today}
      </Modal> */}

      {/* case_3 */}
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
