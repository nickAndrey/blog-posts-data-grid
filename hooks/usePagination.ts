import { useEffect, useState } from 'react';

type Props<T> = {
  data: T[];
  pageSize: number;
};

const usePagination = <T>({ data, pageSize }: Props<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState(data);

  const totalPages = Math.ceil(data.length / pageSize);

  useEffect(() => {
    const begin = (currentPage - 1) * pageSize;
    const end = begin + pageSize;

    setCurrentData(data.slice(begin, end));
  }, [currentPage, data, pageSize]);

  const goNextPage = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  const goPrevPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  return { goNextPage, goPrevPage, currentData, totalPages, currentPage };
};

export default usePagination;
