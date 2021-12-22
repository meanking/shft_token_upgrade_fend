import React, { useCallback, useContext, useState } from 'react';

import { IToast } from './Toast';
import ToastContainer from './ToastContainer';

export interface IStateToast extends IToast {
  id: number;
}

interface IToastContextState {
  toasts: Array<IToast>;
  addToast: (toast: IToast) => void;
  removeToast: (id: number) => void;
}

const contextDefaultValues: IToastContextState = {
  toasts: [],
  addToast: () => undefined,
  removeToast: () => undefined,
};

let id = 1;

const ToastContext = React.createContext<IToastContextState>(contextDefaultValues);

const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<IStateToast[]>([]);

  const addToast = useCallback(
    (toast: IToast) => {
      setToasts(toasts => [
        ...toasts,
        {
          id: id++,
          ...toast,
        },
      ]);
    },
    [setToasts],
  );

  const removeToast = useCallback(
    id => {
      setToasts(toasts => toasts.filter(t => t.id !== id));
    },
    [setToasts],
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
      }}>
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const toastHelpers = useContext(ToastContext);

  return toastHelpers;
};

export { ToastContext, useToast };
export default ToastProvider;
