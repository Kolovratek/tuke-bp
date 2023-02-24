import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
//import Plot from 'react-plotly.js';
import { MyTable } from '../MyTable';
import { APIDatabase } from '../../API';
import { ErrorModal } from '../ErrorModal';

export function Dataset() {
  let { id } = useParams();
  const [dropColumns, setDropColumns] = useState([]);
  const [oneHotColumns, setOneHotColumns] = useState([]);
  //const [visualizeColumns, setVisualizeColumns] = useState([]);
  const [normalizeColumns, setNormalizeColumns] = useState([]);
  const [imputationColumns, setImputationColumns] = useState([]);
  const [dataset, setDataset] = useState(null);
  const [error, setError] = useState(false);
  //const [visualize, setVisualize] = useState(false);
  //const [visualization, setVisualization] = useState(null);

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
    try {
      const data = await APIDatabase.drop(value, id);
      let data2 = {
        data,
        id
      };
      setDataset(data2);
    } catch (error) {
      setError(true);
    }
  };

  const handleOneHotEncoding = async () => {
    if (oneHotColumns.length !== 1) {
      return;
    }
    const value = oneHotColumns[0];
    try {
      const data = await APIDatabase.oneHotEncoding(value, id);
      let data2 = {
        data,
        id
      };
      setDataset(data2);
    } catch (error) {
      setError(true);
    }
  };

  const handleNormalize = async () => {
    if (normalizeColumns.length !== 1) {
      return;
    }
    const value = normalizeColumns[0];
    try {
      const data = await APIDatabase.normalize(value, id);
      let data2 = {
        data,
        id
      };
      setDataset(data2);
    } catch (error) {
      setError(true);
    }
  };

  const handleImputationZero = async () => {
    if (imputationColumns.length !== 1) {
      return;
    }

    const value = imputationColumns[0];
    try {
      const data = await APIDatabase.Imputation(value, '0', id);
      let data2 = {
        data,
        id
      };
      setDataset(data2);
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
      let data2 = {
        data,
        id
      };
      setDataset(data2);
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
      let data2 = {
        data,
        id
      };
      setDataset(data2);
    } catch (error) {
      setError(true);
    }
  };

  // const handleVisualize = async () => {
  //   if (visualizeColumns.length === 0) {
  //     return;
  //   }

  //   const value = visualizeColumns;
  //   try {
  //     const response = await APIDatabase.visualize(value, id);
  //     setVisualization(response.data);
  //     setVisualize(true);
  //   } catch (error) {
  //     setError(true);
  //   }
  // };

  const handleDownloadCsv = async () => {
    APIDatabase.download('csv', id);
  };

  const handleDownloadJson = async () => {
    APIDatabase.download('json', id);
  };

  const handleDownloadXlsx = async () => {
    APIDatabase.download('xlsx', id);
  };

  const handleClose = () => {
    setError(false);
  };

  return (
    <div>
      <h1>Dataset ID {id}</h1>
      {error && <ErrorModal onConfirm={handleClose} />}
      {/* {visualize && (
        <Modal>
          <Plot
            data={[
              {
                x: visualization.map((row) => row['t-SNE_1']),
                y: visualization.map((row) => row['t-SNE_2']),
                mode: 'markers',
                marker: { color: visualization.map((row) => row['kategoria']) }
              }
            ]}
          />
        </Modal>
      )} */}
      {dataset && (
        <div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <Button onClick={handleDrop}>Drop</Button>
            <Button onClick={handleImputationZero}>Imp. 0</Button>
            <Button onClick={handleImputationMean}>Imp. Mean</Button>
            <Button onClick={handleImputationMedian}>Imp. Median</Button>
            <Button onClick={handleOneHotEncoding}>One Hot Encoding</Button>
            {/* <Button onClick={handleVisualize}>Visualize</Button> */}
            <Button onClick={handleNormalize}>Normalize</Button>
            <Button onClick={handleDownloadCsv}>CSV</Button>
            <Button onClick={handleDownloadJson}>JSON</Button>
            <Button onClick={handleDownloadXlsx}>XLSX</Button>
          </div>
          <MyTable
            data={dataset.data}
            setDropColumns={setDropColumns}
            setOneHotColumns={setOneHotColumns}
            setNormalizeColumns={setNormalizeColumns}
            setImputationColumns={setImputationColumns}
            //setVisualizeColumns={setVisualizeColumns}
          />
        </div>
      )}
    </div>
  );
}
