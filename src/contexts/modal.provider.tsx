import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react";

// provider
// 모달이 열렸는지 확인하는 isOpen, 모달을 열고 닫는 용도의 seIsOpen을 useState로 컨트롤
// useState를 갖다쓴 컴포넌트에서 리렌더링을 할지 판단하게 되는 State가 들어있는곳

const ModalContext = createContext<Set<string> | undefined>(undefined);
ModalContext.displayName = "ModalContext";

const SetModalContext = createContext<Dispatch<SetStateAction<Set<string>>> | undefined>(undefined);
SetModalContext.displayName = "SetModalContext";

// custom hook
// 이렇게 useContext를 custom hook으로 만들어 쓰면 여러곳에서 ustConext()를 쓰지 않고 custom hook을 불러와서 사용 가능해진다
// custom hook은 이런 용도로만 사용하는걸 권장
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModalIsOepn must be used within a ModalProvider");
  }
  return context;
}

export const useSetModalContext = () => {
  const context = useContext(SetModalContext);
  if (context === undefined) {
    throw new Error("useModalSetIsOpen must be used within a ModalProvider");
  }
  return context;
}

const ModalProviderComponent: FC<PropsWithChildren> = ({children}) => {
  const [isOpen, setIsOpen] = useState(new Set<string>());

  return (
    <>
      <ModalContext.Provider value={isOpen}>
        <SetModalContext.Provider value={setIsOpen}>
          {children}
        </SetModalContext.Provider>
      </ModalContext.Provider>
    </>
  )
};
ModalProviderComponent.displayName = "ModalProvider";

export const ModalProvider = ModalProviderComponent;