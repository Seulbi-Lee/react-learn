import { FC, PropsWithChildren } from "react";
import { ModalCommonProps } from "../shared/modal";


type DateModalProps = ModalCommonProps & {
  abc: string;
  def: string;
}

const DateModal: FC<PropsWithChildren<DateModalProps>> = ({
  children,
  closeModal,
  abc,
  def,
}) => {
  return (
    <>
      <div className="test">
        {children}
        <div>{abc}</div>
        <div>{def}</div>
        <button onClick={closeModal}>close</button>
      </div>
    </>
  );
};

export default DateModal;