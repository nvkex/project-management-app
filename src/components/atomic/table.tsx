/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import React, { type FunctionComponent } from "react";

interface DataItem {
  [key: string]: any;
}

interface ColumnItem {
  name: string;
  cell: (row: DataItem) => React.ReactNode;
  maxWidth?: string;
}

type TableProps = {
  data: DataItem[];
  columns: ColumnItem[];
};

const Table: FunctionComponent<TableProps> = ({ columns, data }) => {
  // Extracting column names for the table header
  const headCells = columns.map(column => column.name);

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              {/* Generating table header cells */}
              {headCells.map((column, index) => (
                <th key={`table-column-${index}`} className="px-5 py-3 border-b-2 border-teal-100 bg-teal-50 text-left text-xs font-bold text-[hsl(280,13.34%,24.04%)] uppercase tracking-wider">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Generating table rows and cells */}
            {data.map((rowData, rowIndex) => (
              <tr key={`table-row-${rowIndex}`}>
                {columns.map((column, colIndex) => (
                  <td key={`table-row-${rowIndex}-column-${colIndex}`} className="px-5 py-3 border-b border-gray-200 bg-white text-sm" style={{ maxWidth: column.maxWidth ?? 'unset' }}>
                    {column.cell(rowData)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
