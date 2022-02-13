import { useRef } from 'react';
import { FunctionComponent } from 'react';
import styles from './SelectList.module.scss';

type Props = {
  children: React.ReactElement[];
};

const SelectList: FunctionComponent<Props> = ({ children }) => {
  const selectListRef = useRef<HTMLUListElement>(null);

  return (
    <ul className={styles.list} role="listbox" ref={selectListRef}>
      {children}
    </ul>
  );
};

export default SelectList;
