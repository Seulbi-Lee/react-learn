import { FC, PropsWithChildren, useCallback, useId } from "react";
import { useModalAction, useModalStore } from "../contexts/modal.provider";
import ModalComponent from "../components/shared/modal.component";

export const useModal = (Templete?: FC<PropsWithChildren<any>>) => { // Templete을 component로 받을 수 있읍, ? : 비워놔도됨
  const modalStore = useModalStore();
  const modalAction = useModalAction();
  const modalId = useId();
  const isOpen = modalStore.has(modalId);

  const openModal = useCallback(() => {
    modalAction((prevSet) => {
      const nextSet = new Set(prevSet);
      nextSet.add(modalId);

      return nextSet;
    });
  }, [modalAction, modalId]);

  const closeModal = useCallback(() => {
    modalAction((prevSet) => {
      const nextSet = new Set(prevSet);
      nextSet.delete(modalId);

      return nextSet;
    });
  }, [modalAction, modalId]);

  const modalComponent: FC<PropsWithChildren<any>> = useCallback(({children, ...restprops}) => { // FC를 써서 함수임을 인식하도록 함
    if(!isOpen) return null;

    if(!Templete) {
      return (
        <ModalComponent closeHandler={closeModal}>
          {children}
        </ModalComponent>
      );
    };

    return (
      <ModalComponent closeHandler={closeModal}>
        <Templete {...restprops}>
          {children}
        </Templete>
      </ModalComponent>
    );
  }, [Templete, closeModal, isOpen]);

  return {
    Modal: modalComponent,
    openModal,
    closeModal,
    isOpen,
  }
}
