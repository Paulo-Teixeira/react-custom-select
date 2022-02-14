import { FunctionComponent } from 'react';
import styles from './Icon.module.scss';
import { icons } from '../../assets/icons';

interface IconLib {
  [key: string]: string;
}

type Props = {
  iconName: string;
  className?: string;
};

const Icon: FunctionComponent<Props> = ({ iconName, className }) => {
  const propClass = className ? styles[className] : '';

  const lib: IconLib = icons;

  return (
    <svg className={styles.svg} width="20" height="20" viewBox="0 0 20 20">
      <title>{iconName}</title>
      <path className={`${styles.path} ${propClass}`} d={lib[iconName]} />
    </svg>
  );
};

export default Icon;
