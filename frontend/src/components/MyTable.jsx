import React, { useMemo } from 'react';
import { Table } from 'reactstrap';

/* eslint react/prop-types: 0 */
export function MyTable({ data }) {
  const { header, rows } = useMemo(() => {
    const header = Object.keys(data[0]);
    const rows = Array.from(data).slice(0);
    return { header, rows };
  }, [data]);

  const headerArray = Object.values(header);
  const headerRender = headerArray.map((value, index) => (
    <th key={index}>
      <div>
        <div>{value}</div>
      </div>
    </th>
  ));

  const rowsArray = Object.values(rows);
  const rowsArray2 = rowsArray.map((row) => Object.values(row));
  const rowsRender = rowsArray2.map((row, index) => (
    <tr key={index}>
      {row.map((value, index) => (
        <td key={index}>{value}</td>
      ))}
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>{headerRender}</tr>
      </thead>
      <tbody>{rowsRender}</tbody>
    </Table>
  );
}
