import { FC } from "react";
import { useModalContext } from "../../contexts/modal.provider";

const ModalRoot: FC = () => {
  const isOpen = useModalContext();

  return (
    <>
      {isOpen && <div className="modal-bg"></div>}
      <div id="modalRoot"></div>
    </>
  );
}

export default ModalRoot;