import React, { useMemo } from 'react';
import { Table } from 'reactstrap';

/* eslint react/prop-types: 0 */
export function MyTable({ data }) {
  const { header, rows } = useMemo(() => {
    const header = Object.keys(data[0]).filter((col) => col !== 'XY');
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

  const trainRows = rows.filter((row) => row.XY === 'train');
  const trainRowsArray = trainRows.map((row) => {
    const { XY, ...rest } = row;
    return Object.values(rest);
  });
  const trainRowsRender = trainRowsArray.map((row, index) => (
    <tr key={index}>
      {row.map((value, index) => {
        return value !== null ? (
          <td key={index}>{value}</td>
        ) : (
          <td key={index} style={{ color: 'red' }}>
            NaN
          </td>
        );
      })}
    </tr>
  ));

  const testRows = rows.filter((row) => row.XY === 'test');
  const testRowsArray = testRows.map((row) => {
    const { XY, ...rest } = row;
    return Object.values(rest);
  });
  const testRowsRender = testRowsArray.map((row, index) => (
    <tr key={index}>
      {row.map((value, index) => {
        return value !== null ? (
          <td key={index}>{value}</td>
        ) : (
          <td key={index} style={{ color: 'red' }}>
            NaN
          </td>
        );
      })}
    </tr>
  ));

  return (
    <>
      <Table>
        <thead>
          <tr>{headerRender}</tr>
        </thead>
        <tbody>{trainRowsRender}</tbody>
      </Table>
      <Table>
        <thead>
          <tr>{headerRender}</tr>
        </thead>
        <tbody>{testRowsRender}</tbody>
      </Table>
    </>
  );
}
