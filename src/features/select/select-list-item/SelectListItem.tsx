import { FunctionComponent } from 'react';
import styles from './SelectListItem.module.scss';
import { Option } from '../selectAPI';

type Props = {
  option: Option;
  onMouseDown: (event: React.MouseEvent<HTMLLIElement>) => void;
  dataIndex: number;
  isActive: boolean;
};

const SelectListItem: FunctionComponent<Props> = ({ option, onMouseDown, dataIndex, isActive }) => {
  return (
    <li
      className={`${styles.item} ${isActive ? styles.isActive : ''}`}
      role="option"
      aria-checked={isActive}
      aria-selected={isActive}
      onMouseDown={onMouseDown}
      data-value={option.size}
      data-index={dataIndex}
      data-stock={option.stock}
    >
      <div className={styles.optionWrap}>
        <em className={styles.startLabel}>{option.size}</em>
        <p className={styles.text}>{option.info}</p>
        <em className={styles.endLabel}>{option.price}</em>
      </div>
    </li>
  );
};

export default SelectListItem;
