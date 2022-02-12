import { FunctionComponent } from 'react';
import styles from './Icon.module.scss';
import { icons } from '../../assets/icons';

type Props = {
  iconName: string;
};

const Icon: FunctionComponent<Props> = ({ iconName }) => {
  return (
    <svg className={styles.svg} width="20" height="20" viewBox="0 0 20 20">
    <title>{iconName}</title>
      {/* @ts-ignore */}
      <path className={styles.path} d={icons[iconName]} />
    </svg>
  );
};

export default Icon;