import { useRef, useEffect } from 'react';
import { FunctionComponent } from 'react';
import styles from './SelectListItem.module.scss';
import { Option } from '../selectAPI';

type Props = {
  option: Option;
  ariaChecked: boolean;
  ariaSelected: boolean;
};

const SelectListItem: FunctionComponent<Props> = ({ option, ariaChecked, ariaSelected }) => {
  return (
    <li
      className={styles.item}
      role="option"
      aria-checked={ariaChecked}
      aria-selected={ariaSelected}
    >
      <em className={styles.startLabel}>{option.size}</em>
      <p className={styles.text}>{option.info}</p>
      <em className={styles.endLabel}>{option.price}</em>
    </li>
  );
};

export default SelectListItem;
