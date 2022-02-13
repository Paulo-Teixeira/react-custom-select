import { useRef, useEffect } from 'react';
import { FunctionComponent } from 'react';
import styles from './SelectList.module.scss';

type Props = {
  children: React.ReactElement[];
  isExpanded: boolean;
};

const SelectList: FunctionComponent<Props> = ({ children, isExpanded }) => {
  const selectListRef = useRef<HTMLUListElement>(null);

  return (
    <ul
      className={`${styles.list} ${isExpanded ? styles.expanded : ''}`}
      role="listbox"
      ref={selectListRef}
    >
      {children}
    </ul>
  );
};

export default SelectList;
