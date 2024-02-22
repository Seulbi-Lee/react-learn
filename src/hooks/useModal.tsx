import { useId } from "react";
import { useModalAction, useModalStore } from "../contexts/modal.provider";

export const useModal = () => {
  const modalStore = useModalStore();
  const modalAction = useModalAction();

  const modalId = useId();
  const isOpen = modalStore.has(modalId);
  
  // console.log(modalId);
  
  const openModal = () => {
    modalAction((prevSet) => {
      const nextSet = new Set(prevSet);
      nextSet.add(modalId);
      return nextSet;
    });
  };

  const closeModal = () => {
    modalAction((prevSet) => {
      const nextSet = new Set(prevSet);
      nextSet.delete(modalId);
      return nextSet;
    });
  };

  return {
    openModal,
    closeModal,
    isOpen,
  }
}