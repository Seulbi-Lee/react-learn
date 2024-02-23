import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type DatePrpos = {
  closeHandler: () => void;
}

const ModalComponent: FC<PropsWithChildren<DatePrpos>> = ({
  closeHandler,
  children,
}) => {
  const modalRoot = document.getElementById('modalRoot');

  if (!modalRoot) return null;
  return createPortal(  // portal로 modalRoot위치에 retrurn 되는 element를 넘겨줌
    <>
      <div className="modal-inner">
        <div className="modal-header">
          <div className="btn-modal-close"><button onClick={closeHandler}>X</button></div>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </>,
    modalRoot,
  );
}

export const Modal =  ModalComponent;
