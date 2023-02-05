import React, { useMemo } from 'react';
import { Label, Input, Table } from 'reactstrap';

// eslint-disable-next-line react/prop-types
export function MyTable({ data, setDropColumns, setOneHotColumns }) {
  const { header, rows } = useMemo(() => {
    const header = data[0];
    const rows = Array.from(data).slice(1);
    return { header, rows };
  }, [data]);

  const headerRender = header.map((value, index) => (
    <th key={index}>
      <div className="flex flex-column">
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
            />{' '}
            Drop
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
            />{' '}
            One Hot
          </Label>
        </div>
      </div>
    </th>
  ));

  const rowsRender = rows.map((row, index) => (
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
