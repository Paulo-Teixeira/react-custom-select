import { useRef, useEffect } from 'react';
import { FunctionComponent } from 'react';
import styles from './Input.module.scss';
import Icon from '../icon';

const setIcon = (iconName: string, className?: string) => (
  <Icon iconName={iconName} className={className} />
);

type Props = {
  autoFocus?: boolean;
  defaultValue?: string;
  iconRight?: string;
  id: string;
  isDisabled?: boolean;
  isValid?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  maxLength?: number;
  minLength?: number;
  name: string;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
  type: string;
  value?: string;
};

const Input: FunctionComponent<Props> = ({
  autoFocus,
  defaultValue,
  iconRight,
  id,
  isDisabled,
  isValid,
  hasError,
  hasWarning,
  maxLength = 120,
  minLength = 40,
  name,
  onClick,
  onChange,
  onFocus,
  placeholder,
  readOnly,
  type,
  value,
}) => {
  // Affiche picto à droite de l'input.
  let endIcon = iconRight && setIcon(iconRight);

  // Affiche picto de warning.
  endIcon = hasWarning ? setIcon('warning', 'warning') : endIcon;

  // Déplace le focus dans le champ à la demande.
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <div className={styles.wrapper}>
      <input
        className={`${styles.input} ${hasWarning ? styles.warning : ''}`}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        disabled={isDisabled}
        id={id}
        maxLength={maxLength}
        minLength={minLength}
        name={name}
        onClick={onClick}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        readOnly={readOnly}
        ref={inputRef}
        type={type}
        value={value}
      />
      {endIcon}
    </div>
  );
};

export default Input;
