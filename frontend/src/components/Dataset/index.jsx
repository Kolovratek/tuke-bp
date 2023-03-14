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
  const [dataset, setDataset] = useState(null);
  const [error, setError] = useState(false);
  const [visualize, setVisualize] = useState(false);
  const [visualization, setVisualization] = useState(null);
  const [visualizeButton, setVisualizeButton] = useState(false);
  const [normalizeButton, setNormalizeButton] = useState(false);
  const [imputationZeroButton, setImputationZeroButton] = useState(false);
  const [imputationMedianButton, setImputationMedianButton] = useState(false);
  const [imputationMeanButton, setImputationMeanButton] = useState(false);

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
    try {
      const data = await APIDatabase.normalize(id);
      setDataset({
        data,
        id
      });
      setNormalizeButton(true);
    } catch (error) {
      setError(true);
    }
  };

  const handleImputationZero = async () => {
    try {
      const data = await APIDatabase.Imputation('0', id);
      setDataset({
        data,
        id
      });
      setImputationZeroButton(true);
    } catch (error) {
      setError(true);
    }
  };

  const handleImputationMean = async () => {
    try {
      const data = await APIDatabase.Imputation('mean', id);
      setDataset({
        data,
        id
      });
      setImputationMeanButton(true);
    } catch (error) {
      setError(true);
    }
  };

  const handleImputationMedian = async () => {
    try {
      const data = await APIDatabase.Imputation('median', id);
      setDataset({
        data,
        id
      });
      setImputationMedianButton(true);
    } catch (error) {
      setError(true);
    }
  };

  const handleVisualize = async () => {
    try {
      const response = await APIDatabase.visualize(id);
      setVisualization(response);
      setVisualize(true);
      setVisualizeButton(true);
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
            <Button onClick={handleOneHotEncoding}>One Hot Encoding</Button>
            <Button
              style={{ backgroundColor: imputationZeroButton ? 'green' : 'secondary' }}
              onClick={handleImputationZero}
            >
              Imp. 0
            </Button>
            <Button
              style={{ backgroundColor: imputationMeanButton ? 'green' : 'secondary' }}
              onClick={handleImputationMean}
            >
              Imp. Mean
            </Button>
            <Button
              style={{ backgroundColor: imputationMedianButton ? 'green' : 'secondary' }}
              onClick={handleImputationMedian}
            >
              Imp. Median
            </Button>

            <Button
              style={{ backgroundColor: visualizeButton ? 'green' : 'secondary' }}
              onClick={handleVisualize}
            >
              Visualize
            </Button>
            <Button
              style={{ backgroundColor: normalizeButton ? 'green' : 'secondary' }}
              onClick={handleNormalize}
            >
              Normalize
            </Button>
            <Button onClick={factoryHandleDownload('csv')}>CSV</Button>
            <Button onClick={factoryHandleDownload('json')}>JSON</Button>
            <Button onClick={factoryHandleDownload('xlsx')}>XLSX</Button>
          </div>
          <MyTable
            data={dataset.data}
            setDropColumns={setDropColumns}
            setOneHotColumns={setOneHotColumns}
          />
        </div>
      )}
    </div>
  );
}
