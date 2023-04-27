import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APIDatabase } from '../../API';

import './Datasets.css';

export function Datasets() {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    const request = async () => {
      const res = await APIDatabase.getAll();
      setDatasets(res.datasets);
    };
    request();
  }, []);

  const handleDeleteDataset = async (datasetId) => {
    const res = await APIDatabase.delete_dataset(datasetId);
    if (res.status === 'success') {
      setDatasets(datasets.filter((dataset) => dataset.id !== datasetId));
    }
  };

  return (
    <div>
      <tbody>
        {datasets.map((dataset) => (
          <tr key={dataset.id}>
            <td>{dataset.id}</td>
            <td>
              <input type="checkbox" onClick={() => handleDeleteDataset(dataset.id)} />
            </td>
            <td>
              <Link to={`/dataset/${dataset.id}`}>{dataset.filename}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}
