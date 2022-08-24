import { useState, useEffect } from 'react';
import { ICategory, IProduct } from './../../../../store-be/types';


const calculateRange = (data: IProduct[] | ICategory[], rowsPerPage: number) => {
  const num: number = Math.ceil(data.length / rowsPerPage);
  return [...Array(num).keys()].map(num => num + 1);
};

const sliceData = (data: IProduct[] | ICategory[], page: number, rowsPerPage: number) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

const useTable = (data: any, page: number, rowsPerPage: number) => {
  const [tableRange, setTableRange] = useState<number[]>([]);
  const [slice, setSlice] = useState<any>([]);

  useEffect(() => {
    const range = calculateRange(data, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceData(data, page, rowsPerPage);
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice]);

  return { slice, range: tableRange };
};

export default useTable;