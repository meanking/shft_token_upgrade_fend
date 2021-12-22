import React, { useEffect } from 'react';

import Toast from './Toast';
import css from './Toast.module.css';
import { IStateToast, useToast } from './ToastProvider';

interface IToastProps {
  toast: IStateToast;
}

const AnimatedToast: React.FC<IToastProps> = ({ toast }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, toast.timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [toast.id, removeToast]);

  return (
    <Toast
      title={toast.title}
      description={toast.description}
      type={toast.type}
      className={css.fadeToast}
      timeout={toast.timeout}
    />
  );
};

export default AnimatedToast;
