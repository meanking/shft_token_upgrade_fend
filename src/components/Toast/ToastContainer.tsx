import React from 'react';

import AnimatedToast from './AnimatedToast';
import { IStateToast } from './ToastProvider';

interface IToastContainerProps {
  toasts: IStateToast[];
}

const ToastContainer: React.FC<IToastContainerProps> = ({ toasts }) => {
  return (
    <div className="fixed top-0 z-50 w-full mt-3 md:top-auto md:left-6 md:bottom-6 md:w-auto">
      {toasts.map((toast, key) => (
        <AnimatedToast key={key} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
