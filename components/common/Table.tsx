import { ReactNode } from 'react';
import TableColumn from './TableColumn';

type Props = {
  title: string;
  headers: { id: number; title: string }[];
  children: ReactNode;
};

const Table = ({ title, headers, children }: Props) => {
  return (
    <table className='table-fixed w-full border-collapse border border-yellow-400'>
      <thead>
        <tr>
          <th className='bg-yellow-400 py-5 text-white text-2xl'>{title}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <table className='w-full'>
              <thead>
                <tr>
                  {headers.map(({ id, title }) => (
                    <TableColumn className='bg-emerald-500' key={id}>
                      {title}
                    </TableColumn>
                  ))}
                </tr>
              </thead>
              <tbody>{children}</tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
