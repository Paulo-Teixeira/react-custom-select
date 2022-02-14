import { useRef, useEffect, FunctionComponent, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  setOptionHeight,
  selectOptionHeight,
  selectOptionsList,
  setOptionIndex,
  selectCurrentIndex,
} from '../selectSlice';
import styles from './SelectList.module.scss';

type Props = {
  children: React.ReactElement[];
  isExpanded: boolean;
  numberOfVisibleOptions: number;
};

const SelectList: FunctionComponent<Props> = ({ children, isExpanded, numberOfVisibleOptions }) => {
  // List ref to interact with DOM node.
  const selectListRef = useRef<HTMLUListElement>(null);

  // Selectors from the Redux store.
  const optionHeight = useAppSelector(selectOptionHeight);
  const optionsList = useAppSelector(selectOptionsList);
  const optionIndex = useAppSelector(selectCurrentIndex);

  const dispatch = useAppDispatch();

  // Moves scroll with arrow key navigation.
  const scrollSelectedIntoView = () => {
    const list = selectListRef.current;

    if (!list) {
      return;
    }

    const item = list.querySelector('[aria-selected="true"]') as HTMLLIElement;
    const itemRealHeight = item.getBoundingClientRect().height;
    const listRealHeight = list.getBoundingClientRect().height;

    const isOutOfUpperView = item.offsetTop < list.scrollTop;
    const isOutOfLowerView = item.offsetTop + itemRealHeight > list.scrollTop + listRealHeight;

    if (isOutOfUpperView) {
      list.scrollTop = item.offsetTop;
    } else if (isOutOfLowerView) {
      list.scrollTop = item.offsetTop + itemRealHeight - listRealHeight;
    }
  };

  // Arrow key navigation.
  const handleKeyNavigation = useCallback(
    (e: React.KeyboardEvent) => {
      if (!optionsList) {
        return;
      }

      const optionsLength: number = optionsList.length - 1;

      if (optionsLength > 0) {
        const keyPressed: string = e.key;

        if (isExpanded && keyPressed === 'ArrowDown') {
          dispatch(setOptionIndex(optionIndex >= optionsLength ? 0 : optionIndex + 1));
        } else if (isExpanded && keyPressed === 'ArrowUp') {
          dispatch(setOptionIndex(optionIndex <= 0 ? optionsLength : optionIndex - 1));
        }
        scrollSelectedIntoView();
      }
    },
    [optionsList, isExpanded, optionIndex, dispatch]
  );

  // Handler for keydown events.
  const onKeyDownHandler = useCallback(
    (e) => {
      handleKeyNavigation(e);
    },
    [handleKeyNavigation]
  );

  // Get the option height to set list height on demand.
  useEffect(() => {
    if (isExpanded && selectListRef.current) {
      const item = selectListRef.current.querySelector('[aria-selected="true"]') as HTMLLIElement;
      const itemHeight = item.getBoundingClientRect().height;

      dispatch(setOptionHeight(itemHeight));
    }
  }, [isExpanded, dispatch]);

  // Attach and remove listeners.
  useEffect(() => {
    document.addEventListener('keydown', onKeyDownHandler);
    return () => {
      document.removeEventListener('keydown', onKeyDownHandler);
    };
  }, [onKeyDownHandler]);

  // Set the list container height to show chosen options.
  const listStyle = {
    maxHeight: `${optionHeight * numberOfVisibleOptions}px`,
  };

  return (
    <ul className={styles.list} style={listStyle} role="listbox" ref={selectListRef}>
      {children}
    </ul>
  );
};

export default SelectList;
