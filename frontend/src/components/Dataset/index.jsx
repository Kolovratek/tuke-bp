import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';

import { MyTable } from '../MyTable';
import { APIDatabase } from '../../API';

export function Dataset() {
  let { id } = useParams();
  const [dropColumns, setDropColumns] = useState([]);
  const [oneHotColumns, setOneHotColumns] = useState([]);
  const [normalizeColumns, setNormalizeColumns] = useState([]);
  const [imputationColumns, setImputationColumns] = useState([]);
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    const request = async () => {
      const data = await APIDatabase.get(id);
      setDataset(data);
    };
    request();
  }, []);

  const handleDrop = async () => {
    if (dropColumns.length === 0) {
      return;
    }
    const value = dropColumns;
    const data = await APIDatabase.drop(value, id);
    let data2 = {
      data,
      id
    };
    setDataset(data2);
  };

  const handleOneHotEncoding = async () => {
    if (oneHotColumns.length !== 1) {
      return;
    }
    const value = oneHotColumns[0];
    const data = await APIDatabase.oneHotEncoding(value, id);
    let data2 = {
      data,
      id
    };
    setDataset(data2);
  };

  const handleNormalize = async () => {
    if (normalizeColumns.length !== 1) {
      return;
    }
    const value = normalizeColumns[0];
    const data = await APIDatabase.normalize(value, id);
    let data2 = {
      data,
      id
    };
    setDataset(data2);
  };

  const handleImputationZero = async () => {
    if (imputationColumns.length !== 1) {
      return;
    }
    const value = imputationColumns[0];
    const data = await APIDatabase.Imputation(value, '0', id);
    let data2 = {
      data,
      id
    };
    setDataset(data2);
  };

  const handleImputationMean = async () => {
    if (imputationColumns.length !== 1) {
      return;
    }
    const value = imputationColumns[0];
    const data = await APIDatabase.Imputation(value, 'mean', id);
    let data2 = {
      data,
      id
    };
    setDataset(data2);
  };

  const handleImputationMedian = async () => {
    if (imputationColumns.length !== 1) {
      return;
    }
    const value = imputationColumns[0];
    const data = await APIDatabase.Imputation(value, 'median', id);
    let data2 = {
      data,
      id
    };
    setDataset(data2);
  };

  const handleDownloadCsv = async () => {
    APIDatabase.download('csv', id);
  };

  const handleDownloadJson = async () => {
    APIDatabase.download('json', id);
  };

  const handleDownloadXlsx = async () => {
    APIDatabase.download('xlsx', id);
  };

  return (
    <div>
      <h1>Dataset ID {id}</h1>
      {dataset && (
        <div>
          <MyTable
            data={dataset.data}
            setDropColumns={setDropColumns}
            setOneHotColumns={setOneHotColumns}
            setNormalizeColumns={setNormalizeColumns}
            setImputationColums={setImputationColumns}
          />
          <Button onClick={handleDrop}>Drop</Button>
          <Button onClick={handleImputationZero}>Imp. 0</Button>
          <Button onClick={handleImputationMean}>Imp. Mean</Button>
          <Button onClick={handleImputationMedian}>Imp. Median</Button>
          <Button onClick={handleOneHotEncoding}>One Hot Encoding</Button>
          <Button onClick={handleNormalize}>Normalize</Button>
          <Button onClick={handleDownloadCsv}>CSV</Button>
          <Button onClick={handleDownloadJson}>JSON</Button>
          <Button onClick={handleDownloadXlsx}>XLSX</Button>
        </div>
      )}
    </div>
  );
}
