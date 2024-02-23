import { FC, PropsWithChildren, useCallback, useId } from "react";
import { useModalAction, useModalStore } from "../contexts/modal.provider";
import { Modal, ModalCommonProps } from "../components/shared/modal/";

export const useModal = <T extends ModalCommonProps,>(
  Templete?: FC<PropsWithChildren<T>>,): {    // Templete을 component로 받을 수 있음/ ?: 비워놔도됨
    Modal: FC<PropsWithChildren<Omit<T, "closeModal">>>;
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  } => { 
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
        <Modal closeHandler={closeModal}>
          {children}
        </Modal>
      );
    };

    return (
      <Modal closeHandler={closeModal}>
        <Templete closeModal={closeModal} {...restprops}>
          {children}
        </Templete>
      </Modal>
    );
  }, [Templete, closeModal, isOpen]);

  return {
    Modal: modalComponent,
    openModal,
    closeModal,
    isOpen,
  }
}
