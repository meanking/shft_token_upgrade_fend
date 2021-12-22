import Button from 'components/Buttons/Button';
import React from 'react';
import classes from './TokenInput.module.scss';

interface ITokenInputProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  onBlur?: (value?: any) => void;
  onClickMax?: () => void;
  disabled?: boolean;
}

const TokenInput: React.FC<ITokenInputProps> = ({
  label,
  value,
  onChange,
  onBlur,
  onClickMax,
  disabled
}) => {

  return (
    <div className={`${classes.input_wrapper} dark:bg-black-900`}>
      <input
        className={`${classes.token_input} dark:text-white-300 dark:placeholder-white-300 dark:bg-transparent`}
        type="number"
        value={value}
        min={0}
        disabled={disabled}
        onChange={e => onChange && onChange(e.target.value)}
        onBlur={e => onBlur && onBlur(e.target.value)}
        onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
      />
      {onClickMax && <Button variant="outline" className="ml-4" onClick={onClickMax}>Max</Button>}
      <div className={`${classes.label} dark:text-white-300`}>
        {label}
      </div>
    </div>
  )
}

export default TokenInput
