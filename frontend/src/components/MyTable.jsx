import React, { useMemo } from 'react';
import { Label, Input, Table } from 'reactstrap';

/* eslint react/prop-types: 0 */
export function MyTable({
  data,
  setDropColumns,
  setOneHotColumns,
  setImputationColums,
  setNormalizeColumns
}) {
  const { header, rows } = useMemo(() => {
    const header = data[0];
    const rows = Array.from(data).slice(0);
    return { header, rows };
  }, [data]);

  let headerArray = Object.values(header);
  const headerRender = headerArray.map((value, index) => (
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
                setImputationColums((state) =>
                  e.target.checked ? [...state, index] : state.filter((c) => c !== index)
                );
              }}
            />{' '}
            Inputation
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
        <div>
          <Label check>
            <Input
              type="checkbox"
              onChange={(e) => {
                setNormalizeColumns((state) =>
                  e.target.checked ? [...state, index] : state.filter((c) => c !== index)
                );
              }}
            />{' '}
            Normalize
          </Label>
        </div>
      </div>
    </th>
  ));

  let rowsArray = Object.values(rows);
  let rowsArray2 = rowsArray.map((row) => Object.values(row));
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
