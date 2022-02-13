import { useRef, useEffect, FunctionComponent, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { collapse, setOptionHeight, selectOptionHeight, selectOptionsList } from '../selectSlice';
import styles from './SelectList.module.scss';

type Props = {
  children: React.ReactElement[];
  isExpanded: boolean;
};

const SelectList: FunctionComponent<Props> = ({ children, isExpanded }) => {
  const selectListRef = useRef<HTMLUListElement>(null);

  const optionHeight = useAppSelector(selectOptionHeight);
  const optionsList = useAppSelector(selectOptionsList);

  const dispatch = useAppDispatch();

  // Get the list options height.
  useEffect(() => {
    if (isExpanded) {
      const item = selectListRef.current?.querySelector('[aria-selected="true"]');
      const itemHeight = item?.clientHeight;

      dispatch(setOptionHeight(itemHeight));
    }
  }, [isExpanded, dispatch]);

  const listStyle = {
    maxHeight: `${optionHeight * 6}px`,
  };

  return (
    <ul className={styles.list} style={listStyle} role="listbox" ref={selectListRef}>
      {children}
    </ul>
  );
};

export default SelectList;
