import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';

import { MyTable } from '../MyTable';
import { APIDatabase } from '../../API';
import { ErrorModal } from '../ErrorModal';
import { VisualizeModal } from '../VisualizeModal';

export function Dataset() {
  const { id } = useParams();
  const [dropColumns, setDropColumns] = useState([]);
  const [oneHotColumns, setOneHotColumns] = useState([]);
  const [visualizeColumns, setVisualizeColumns] = useState([]);
  const [normalizeColumns, setNormalizeColumns] = useState([]);
  const [imputationColumns, setImputationColumns] = useState([]);
  const [dataset, setDataset] = useState(null);
  const [error, setError] = useState(false);
  const [visualize, setVisualize] = useState(false);
  const [visualization, setVisualization] = useState(null);

  useEffect(() => {
    const request = async () => {
      const data = await APIDatabase.get(id);
      setDataset(data);
    };
    request();
  }, []);

  const handleRequest = useCallback(
    async (id, requestFn) => {
      try {
        const data = await requestFn();
        setDataset({
          data,
          id
        });
      } catch (error) {
        setError(true);
      }
    },
    [setDataset]
  );

  const handleDrop = async () => {
    if (dropColumns.length === 0) {
      return;
    }
    await handleRequest(id, () => APIDatabase.drop(dropColumns, id));
  };

  const handleOneHotEncoding = async () => {
    if (oneHotColumns.length !== 1) {
      return;
    }
    await handleRequest(id, () => APIDatabase.oneHotEncoding(oneHotColumns[0], id));
  };

  const handleNormalize = async () => {
    if (normalizeColumns.length !== 1) {
      return;
    }
    await handleRequest(id, () => APIDatabase.normalize(normalizeColumns[0], id));
  };

  const handleImputationZero = async () => {
    if (imputationColumns.length !== 1) {
      return;
    }

    const value = imputationColumns[0];
    try {
      const data = await APIDatabase.Imputation(value, '0', id);
      setDataset({
        data,
        id
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleImputationMean = async () => {
    if (imputationColumns.length !== 1) {
      return;
    }
    const value = imputationColumns[0];
    try {
      const data = await APIDatabase.Imputation(value, 'mean', id);
      setDataset({
        data,
        id
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleImputationMedian = async () => {
    if (imputationColumns.length !== 1) {
      return;
    }
    const value = imputationColumns[0];
    try {
      const data = await APIDatabase.Imputation(value, 'median', id);
      setDataset({
        data,
        id
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleVisualize = async () => {
    if (visualizeColumns.length < 2) {
      return;
    }
    const value = visualizeColumns;

    try {
      const response = await APIDatabase.visualize(value, id);
      setVisualization(response);
      setVisualize(true);
      console.log(visualize);
    } catch (error) {
      setError(true);
    }
  };

  const factoryHandleDownload = (key) => async () => APIDatabase.download(key, id);

  const handleClose = () => {
    setError(false);
    setVisualize(false);
  };

  return (
    <div>
      <h1>Dataset ID {id}</h1>
      {error && <ErrorModal onConfirm={handleClose} />}
      {visualize && <VisualizeModal onConfirm={handleClose} visualization={visualization} />}
      {dataset && (
        <div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <Button onClick={handleDrop}>Drop</Button>
            <Button onClick={handleImputationZero}>Imp. 0</Button>
            <Button onClick={handleImputationMean}>Imp. Mean</Button>
            <Button onClick={handleImputationMedian}>Imp. Median</Button>
            <Button onClick={handleOneHotEncoding}>One Hot Encoding</Button>
            <Button onClick={handleVisualize}>Visualize</Button>
            <Button onClick={handleNormalize}>Normalize</Button>
            <Button onClick={factoryHandleDownload('csv')}>CSV</Button>
            <Button onClick={factoryHandleDownload('json')}>JSON</Button>
            <Button onClick={factoryHandleDownload('xlsx')}>XLSX</Button>
          </div>
          <MyTable
            data={dataset.data}
            setDropColumns={setDropColumns}
            setOneHotColumns={setOneHotColumns}
            setNormalizeColumns={setNormalizeColumns}
            setImputationColumns={setImputationColumns}
            setVisualizeColumns={setVisualizeColumns}
          />
        </div>
      )}
    </div>
  );
}
