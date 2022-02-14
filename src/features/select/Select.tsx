import React, { useRef, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  expand,
  collapse,
  setValue,
  setOptionIndex,
  selectIsExpanded,
  selectValue,
  selectCurrentIndex,
  setOptions,
  selectOptionsList,
  selectOptionHeight,
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
  selectTitle: string;
  numberOfVisibleOptions: number;
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
  selectTitle,
  numberOfVisibleOptions,
}) => {
  const isExpanded = useAppSelector(selectIsExpanded);
  const optionValue = useAppSelector(selectValue);
  const optionIndex = useAppSelector(selectCurrentIndex);
  const optionsList = useAppSelector(selectOptionsList);
  const optionHeight = useAppSelector(selectOptionHeight);

  const dispatch = useAppDispatch();

  // Send fake data to store.
  dispatch(setOptions(options));

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

  // Select option with Enter key.
  const handleEnterKeySelection = useCallback(
    (e: React.KeyboardEvent) => {
      if (isExpanded && e.key === 'Enter') {
        e.preventDefault();
        dispatch(setValue(optionsList[optionIndex].size));
        dispatch(setOptionIndex(optionIndex));
        dispatch(collapse());
      }
    },
    [optionsList, isExpanded, optionIndex, dispatch]
  );

  // Close with Escape key.
  const handleEscClose = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(collapse());
      }
    },
    [dispatch]
  );

  // Collapse list on click outside.
  const handleClickOutside = useCallback(
    (e) => {
      if (!selectRef.current?.contains(e.target)) {
        dispatch(collapse());
      }
    },
    [dispatch]
  );

  // Handler for keydown events.
  const onKeyDownHandler = useCallback(
    (e) => {
      handleEscClose(e);
      handleEnterKeySelection(e);
    },
    [handleEscClose, handleEnterKeySelection]
  );

  // Open the select list on focus.
  const onFocusHandler = (): void => {
    dispatch(expand());
  };

  // Open the select list on click.
  const onInputClickHandler = (): void => {
    dispatch(expand());
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', onKeyDownHandler);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', onKeyDownHandler);
    };
  }, [handleClickOutside, onKeyDownHandler]);

  return (
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
        onClick={onInputClickHandler}
        onChange={() => console.log('changed')}
        onFocus={onFocusHandler}
        placeholder={placeholder}
        name={name}
        type="text"
        value={optionValue}
      />
      <div className={`${styles.listWrapper} ${isExpanded ? styles.isExpanded : ''}`}>
        <p className={styles.selectLabel}>{selectTitle} :</p>
        <SelectList isExpanded={isExpanded} numberOfVisibleOptions={numberOfVisibleOptions}>
          {optionsList.map((option, index) => {
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
    </div>
  );
};

export default Select;
