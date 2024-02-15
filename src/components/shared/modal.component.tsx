import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type modalProps = {
  modal: boolean;
  modalClose: (value: boolean) => void;
}

const ModalComponent: FC<PropsWithChildren<modalProps>> = ({
  modal,
  modalClose,
  children,
}) => {
  const modalRoot = document.getElementById('modalRoot');

  if (!modal || !modalRoot) return null; 

  return createPortal(
    <>
      <div className="modal-bg" onClick={() => {modalClose(false)}}></div>
      <div className="modal">
        <div className="modal-inner">
          <button onClick={() => modalClose(false)}>X</button>
          <div>{children}</div>
        </div>
      </div>
    </>,
    modalRoot,
  );
}

export default ModalComponent;
