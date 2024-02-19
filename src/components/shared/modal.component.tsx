import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { useSetModalContext } from "../../contexts/modal.provider";

const ModalComponent: FC<PropsWithChildren> = ({children}) => {
  const modalRoot = document.getElementById('modalRoot');

  console.log('modal component, close btn');

  const setIsOpen = useSetModalContext();
  
  if (!setIsOpen || !modalRoot) return null; 
  // portal로 modalRoot위치에 retrurn 되는 element를 넘겨줌
  return createPortal(
    <>
      <div className="modal">
        <div className="modal-inner">
          <div className="modal-close"><button>X</button></div>
          <div>{children}</div>
        </div>
      </div>
    </>,
    modalRoot,
  );
}

export default ModalComponent;
