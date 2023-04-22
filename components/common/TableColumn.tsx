import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: ReactNode;
  className?: string;
};

const TableColumn = ({ children, className }: Props) => {
  const defaultClasses = 'border border-2 border-yellow-400 px-4 py-2';

  const mergedClasses = twMerge(defaultClasses, className ?? '');

  return <td className={mergedClasses}>{children}</td>;
};

export default TableColumn;
