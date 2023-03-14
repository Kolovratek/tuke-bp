import React, { useMemo } from 'react';
import { Label, Input, Table } from 'reactstrap';

/* eslint react/prop-types: 0 */
export function MyTable({ data, setDropColumns, setOneHotColumns }) {
  const { header, rows } = useMemo(() => {
    const header = Object.keys(data[0]);
    const rows = Array.from(data).slice(0);
    return { header, rows };
  }, [data]);

  const headerArray = Object.values(header);
  const headerRender = headerArray.map((value, index) => (
    <th key={index}>
      <div className="">
        <div>{value}</div>
        <div>
          <Label check>
            <Input
              type="checkbox"
              onChange={(e) => {
                setDropColumns((state) =>
                  e.target.checked ? [...state, index] : state.filter((c) => c !== index)
                );
              }}
            />
            <span>Drop</span>
          </Label>
        </div>
        <div>
          <Label check>
            <Input
              type="checkbox"
              onChange={(e) => {
                setOneHotColumns((state) =>
                  e.target.checked ? [...state, index] : state.filter((c) => c !== index)
                );
              }}
            />
            <span>One Hot</span>
          </Label>
        </div>
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
