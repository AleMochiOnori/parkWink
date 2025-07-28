import "./Table.css";
import React from "react";


type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
};

interface TableProps<T> {
  items: T[];
  columns: Column<T>[];
}


const TableComp = <T,>({ items, columns }: TableProps<T>) => {
  return (
    <table className="my-table">
      <thead>
        <tr className="styleHead">
          {columns.map((col, idx) => (
            <th className="colorText" key={idx}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="body_style">
        {items.map((item, index) => (
          <tr key={index}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>
                {col.render
                  ? col.render(item[col.accessor], item)
                  : (item[col.accessor] as React.ReactNode)}
              </td>
              
            ))}
          </tr>
          
        ))}
      </tbody>
    </table>
  );
};

export default TableComp;
