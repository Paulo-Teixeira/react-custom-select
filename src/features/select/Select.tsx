import { useRef, useEffect, useState } from 'react';
import { FunctionComponent } from 'react';
import styles from './Select.module.scss';
import Input from '../input';
import SelectList from './select-list';
import SelectListItem from './select-list-item';
import { Option } from './selectAPI';

type Props = {
  autoFocus?: boolean;
  defaultValue?: string;
  id: string;
  isDisabled?: boolean;
  isValid?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  name: string;
  options: Option[];
  placeholder?: string;
  value?: string;
};

const Select: FunctionComponent<Props> = ({
  autoFocus,
  defaultValue,
  id,
  isDisabled,
  isValid,
  hasError,
  hasWarning,
  name,
  options,
  placeholder,
  value,
  ...props
}) => {
  // Récupération des options mockées.

  return (
    <div className={styles.wrapper}>
      <Input
        readOnly
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        isDisabled={isDisabled}
        iconRight="chevronDown"
        hasError={hasError}
        hasWarning={hasWarning}
        id={id}
        isValid={isValid}
        onChange={() => console.log('changed')}
        placeholder={placeholder}
        name={name}
        type="text"
        value={value}
        {...props}
      />
      <SelectList>
        {options.map((option, index) => {
          const activeIndex = index;
          return <SelectListItem key={option.size} option={option} />;
        })}
      </SelectList>
    </div>
  );
};

export default Select;
