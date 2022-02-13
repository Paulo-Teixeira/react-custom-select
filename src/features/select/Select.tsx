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
  selectTitle: string;
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

  // Keyboard Navigation.
  const handleKeyNavigation = useCallback(
    (e: React.KeyboardEvent) => {
      const optionsLength: number = options.length - 1;

      if (optionsLength > 0) {
        const keyPressed: string = e.key;

        if (isExpanded && keyPressed === 'ArrowDown') {
          dispatch(setOptionIndex(optionIndex >= optionsLength ? 0 : optionIndex + 1));
        } else if (isExpanded && keyPressed === 'ArrowUp') {
          dispatch(setOptionIndex(optionIndex <= 0 ? optionsLength : optionIndex - 1));
        }
      }
    },
    [options.length, isExpanded, optionIndex, dispatch]
  );

  // Select option with Enter key.
  const handleEnterKeySelection = useCallback(
    (e: React.KeyboardEvent) => {
      if (isExpanded && e.key === 'Enter') {
        e.preventDefault();
        dispatch(setValue(options[optionIndex].size));
        dispatch(setOptionIndex(optionIndex));
        dispatch(collapse());
      }
    },
    [options, isExpanded, optionIndex, dispatch]
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
      if (!selectRef.current?.contains(e.currentTarget)) {
        dispatch(collapse());
      }
    },
    [dispatch]
  );

  // Handler for keydown events.
  const onKeyDownHandler = useCallback(
    (e) => {
      handleEscClose(e);
      handleKeyNavigation(e);
      handleEnterKeySelection(e);
    },
    [handleEscClose, handleKeyNavigation, handleEnterKeySelection]
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
          <SelectList>
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
      </div>
    </>
  );
};

export default Select;
