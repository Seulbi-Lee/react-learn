import { FC, useCallback, useEffect } from "react";
import { useModalAction, useModalStore } from "../../../contexts/modal.provider";

const ModalRootComponent: FC = () => {
  const modalStore = useModalStore();
  const modalAction = useModalAction();
  const isModalOpened = modalStore.size > 0;  // true, false

  const closeAllModals = useCallback(() => {
    modalAction(new Set());
  }, [modalAction]);

  useEffect(() => {
    if (!isModalOpened) return;
    
    const keyDown = (e: KeyboardEvent) => {
      if(e.code === "Escape") closeAllModals();
    }

    window.addEventListener("keydown", keyDown);

    return () => {
      window.addEventListener("keydown", keyDown);
    }
  }, [isModalOpened, closeAllModals]);

  return (
    <>
      <div className={isModalOpened ? "modal" : ""}>
        {isModalOpened && <div className="modal-bg" onClick={closeAllModals}></div>}
        <div id="modalRoot"></div>
      </div>
    </>
  );
}

export const ModalRoot = ModalRootComponent;