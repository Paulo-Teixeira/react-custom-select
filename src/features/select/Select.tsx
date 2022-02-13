import React, { useRef, useEffect, useCallback, useState, ReactEventHandler } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  expand,
  collapse,
  setValue,
  setOptionIndex,
  selectIsExpanded,
  selectValue,
  selectCurrentIndex,
  selectState,
} from './selectSlice';
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
}) => {
  const isExpanded = useAppSelector(selectIsExpanded);
  const optionValue = useAppSelector(selectValue);
  const showState = useAppSelector(selectState);
  const optionIndex = useAppSelector(selectCurrentIndex);

  const dispatch = useAppDispatch();

  // Component wrapper.
  const selectRef = useRef<HTMLDivElement>(null);

  // Get the value of the list item.
  const optionMouseDownHandler = (e: React.MouseEvent): void => {
    e.preventDefault();
    const option = e.currentTarget as HTMLLIElement;

    dispatch(setValue(option.dataset.value));

    if (option.dataset.index) {
      dispatch(setOptionIndex(parseInt(option.dataset.index, 10)));
    }

    dispatch(collapse());
  };

  // Collapse list on click outside.
  // const handleClickOutside = (e: React.KeyboardEvent) => {
  //   if (!selectRef.current?.contains(e.currentTarget)) {
  //     dispatch(collapse());
  //   }
  // };

  // Close with Escape key.
  const handleEscClose = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      dispatch(collapse());
    }
  };

  // Handler for keydown events.
  const onKeyDownHandler = useCallback(
    (e) => {
      handleEscClose(e);
    },
    [handleEscClose]
  );

  // Open the select list options.
  const onInputClickHandler = (): void => {
    dispatch(expand());
  };

  // Close the select list options
  const onBlurHandler = (): void => {
    dispatch(collapse());
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDownHandler);

    return () => {
      document.removeEventListener('keydown', onKeyDownHandler);
    };
  }, [onKeyDownHandler]);

  return (
    <>
      <div className={styles.state}>
        <pre>{JSON.stringify(showState)}</pre>
      </div>
      <div className={`${styles.wrapper}`} ref={selectRef}>
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
          onBlur={onBlurHandler}
          onClick={onInputClickHandler}
          onChange={() => console.log('changed')}
          placeholder={placeholder}
          name={name}
          type="text"
          value={optionValue}
        />
        <SelectList isExpanded={isExpanded}>
          {options.map((option, index) => {
            const activeIndex = index === optionIndex;

            return (
              <SelectListItem
                key={option.size}
                option={option}
                onMouseDown={optionMouseDownHandler}
                dataIndex={index}
                isActive={activeIndex}
              />
            );
          })}
        </SelectList>
      </div>
    </>
  );
};

export default Select;
