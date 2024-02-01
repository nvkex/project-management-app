/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { type FunctionComponent } from "react";

interface DataItem {
    [key: string]: any;
}

interface ColumnItem {
    name: any,
    cell: (row: any) => any,
    maxWidth?: string
}

type Props = {
    data: Array<DataItem>,
    columns: Array<ColumnItem>
}

const Table: FunctionComponent<Props> = ({ columns, data }) => {
    const headCells = columns.map(column => column.name)
    return (
        <div className="overflow-x-auto">
            <div className="inline-block min-w-full overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            {
                                headCells.map(column => (
                                    <th key={`table-column-${column}`} className="px-5 py-3 border-b-2 border-teal-100 bg-teal-50 text-left text-xs font-bold text-[hsl(280,13.34%,24.04%)] uppercase tracking-wider">
                                        {column}
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((d, ri) => (
                                <tr key={`table-row-${ri}`}>
                                    {
                                        columns.map((column, ci) => (
                                            <td key={`table-row-${ri}-column-${ci}`} className="px-5 py-3 border-b border-gray-200 bg-white text-sm" style={{ maxWidth: column.maxWidth ?? 'unset' }}>
                                                {column.cell(d)}
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table;
