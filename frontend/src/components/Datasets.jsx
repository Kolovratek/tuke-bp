import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { APIDatabase } from '../API';

export function Datasets() {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    const request = async () => {
      const res = await APIDatabase.getAll();
      setDatasets(res.datasets_ids);
    };
    request();
  }, []);

  return (
    <div>
      <Table>Datasets</Table>
      <tbody>
        {datasets.map((datasetId) => (
          <tr key={datasetId}>
            <td>{datasetId}</td>
            <td>
              <Link to={`/dataset/${datasetId}`}>Dataset {datasetId}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}
