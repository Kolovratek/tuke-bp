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

  const handleDeleteDataset = async (datasetId) => {
    const res = await APIDatabase.delete_dataset(datasetId);
    if (res.status === 'success') {
      setDatasets(datasets.filter((id) => id !== datasetId));
    }
  };

  return (
    <div>
      <Table>Datasets</Table>
      <tbody>
        {datasets.map((datasetId) => (
          <tr key={datasetId}>
            <td>{datasetId}</td>
            <td>
              <input type="checkbox" onClick={() => handleDeleteDataset(datasetId)} />
            </td>
            <td>
              <Link to={`/dataset/${datasetId}`}>Dataset Name</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}
