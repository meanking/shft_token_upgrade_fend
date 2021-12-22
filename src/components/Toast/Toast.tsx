import React from 'react';
import css from './Toast.module.css';
import { ReactComponent as SuccessIcon } from 'assets/images/svgs/success-icon.svg';
import { ReactComponent as WarningIcon } from 'assets/images/svgs/warning-icon.svg';
import { ReactComponent as ErrorIcon } from 'assets/images/svgs/error-icon.svg';

interface IToastProps {
  title?: string;
  description?: string;
  className?: string;
  type: TToastType;
  timeout: number;
}

export interface IToast {
  title: string;
  description: string;
  type: TToastType;
  timeout: number;
}

export type TToastType = 'TOAST_SUCCESS' | 'TOAST_ERROR' | 'TOAST_WARNING';

const Toast: React.FC<IToastProps> = ({
  className = '',
  title,
  description = '',
  type = 'TOAST_SUCCESS',
  timeout = 10100,
}) => {
  if (type === 'TOAST_SUCCESS') {
    return (
      <div
        className={`relative z-50 flex p-3 mt-3 mx-2 md:mx-0 md:mt-4 mb-4 md:mb-0 bg-green-400 rounded-lg shadow-2xl md:w-full w-auto ${css.toastWidth} ${className}`}>
        <div className="mr-4">
          <SuccessIcon />
        </div>
        <div>
          {title && <p className="text-sm text-gray-700 font-bold">{title}</p>}
          {description && <p className="text-sm text-gray-700 font-semibold break-words">{description}</p>}
        </div>
      </div>
    );
  } else if (type === 'TOAST_ERROR') {
    return (
      <div
        className={`relative z-50 flex p-3 mt-3 mx-2 md:mx-0 md:mt-4 mb-4 md:mb-0 bg-pink-200 rounded-lg shadow-2xl md:w-full w-auto ${css.toastWidth} ${className}`}>
        <div className="mr-4">
          <ErrorIcon />
        </div>
        <div>
          {title && <p className="text-sm text-gray-700 font-bold">{title}</p>}
          {description && <p className="text-sm text-gray-700 font-semibold break-words">{description}</p>}
        </div>
      </div>
    );
  } else if (type === 'TOAST_WARNING') {
    return (
      <div
        className={`relative z-50 flex p-3 mt-3 mx-2 md:mx-0 md:mt-4 mb-4 md:mb-0 bg-yellow-100 rounded-lg shadow-2xl md:w-full w-auto ${css.toastWidth} ${className}`}>
        <div className="mr-4">
          <WarningIcon />
        </div>
        <div>
          {title && <p className="text-sm text-gray-700 font-bold">{title}</p>}
          {description && <p className="text-sm text-gray-700 font-semibold break-words">{description}</p>}
        </div>
      </div>
    );
  }
  return null;
};

export default Toast;
