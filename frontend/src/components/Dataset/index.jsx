import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';

import { MyTable } from '../MyTable';
import { APIDatabase } from '../../API';
import { ErrorModal } from '../ErrorModal';
import { VisualizeModal } from '../VisualizeModal';

import './index.css';

export function Dataset() {
  const { id } = useParams();
  const [dataset, setDataset] = useState(null);
  const [error, setError] = useState(false);
  const [visualize, setVisualize] = useState(false);
  const [visualization, setVisualization] = useState(null);
  const [title, setTitle] = useState(null);
  const [splitButton, setSplitButton] = useState(() => {
    const savedSplitButton = localStorage.getItem(`splitButton-${id}`);
    return savedSplitButton !== null ? JSON.parse(savedSplitButton) : false;
  });
  const [normalizeButton, setNormalizeButton] = useState(() => {
    const savedNormalizeButton = localStorage.getItem(`normalizeButton-${id}`);
    return savedNormalizeButton !== null ? JSON.parse(savedNormalizeButton) : false;
  });
  const [imputationZeroButton, setImputationZeroButton] = useState(false);
  const [imputationMedianButton, setImputationMedianButton] = useState(false);
  const [imputationMeanButton, setImputationMeanButton] = useState(false);
  const [imputationIsExpanded, setImputationIsExpanded] = useState(false);
  const [dropIsExpanded, setDropIsExpanded] = useState(false);
  const [oneHotIsExpanded, setOneHotIsExpanded] = useState(false);
  const [downloadIsExpanded, setDownloadIsExpanded] = useState(false);
  const [yIsExpanded, setYIsExpanded] = useState(false);
  const [visualizeIsExpanded, setVisualizeIsExpanded] = useState(false);

  useEffect(() => {
    const request = async () => {
      const data = await APIDatabase.get(id);
      setDataset(data);
    };
    request();
  }, []);

  useEffect(() => {
    localStorage.setItem(`normalizeButton-${id}`, JSON.stringify(normalizeButton));
  }, [normalizeButton, id]);

  useEffect(() => {
    localStorage.setItem(`splitButton-${id}`, JSON.stringify(splitButton));
  }, [splitButton, id]);

  const toggleDropdownY = () => {
    setYIsExpanded(!yIsExpanded);
  };

  const toggleDropdownVisualize = () => {
    setVisualizeIsExpanded(!visualizeIsExpanded);
  };

  const toggleDropdownDownload = () => {
    setDownloadIsExpanded(!downloadIsExpanded);
  };

  const toggleDropdownImputation = () => {
    setImputationIsExpanded(!imputationIsExpanded);
  };

  const toggleDropdownOneHot = () => {
    setOneHotIsExpanded(!oneHotIsExpanded);
  };

  const toggleDropdownDrop = () => {
    setDropIsExpanded(!dropIsExpanded);
  };

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

  const handleDrop = async (header) => {
    await handleRequest(id, () => APIDatabase.drop(header, id));
  };

  const handleOneHotEncoding = async (header) => {
    await handleRequest(id, () => APIDatabase.oneHotEncoding(header, id));
  };

  const handleLabel = async (header) => {
    await handleRequest(id, () => APIDatabase.label(header, id));
    setTitle(header);
  };

  const handleNormalize = async () => {
    await handleRequest(id, () => APIDatabase.normalize(id));
    setNormalizeButton(true);
  };

  const handleSplit = async () => {
    await handleRequest(id, () => APIDatabase.split(id));
    setSplitButton(true);
  };

  const handleImputationZero = async () => {
    await handleRequest(id, () => APIDatabase.Imputation('0', id));
    setImputationZeroButton(true);
  };

  const handleImputationMean = async () => {
    await handleRequest(id, () => APIDatabase.Imputation('mean', id));
    setImputationMeanButton(true);
  };

  const handleImputationMedian = async () => {
    await handleRequest(id, () => APIDatabase.Imputation('median', id));
    setImputationMedianButton(true);
  };

  const handleVisualizeTsne = async () => {
    try {
      const response = await APIDatabase.visualizeTsne(id);
      setVisualization(response);
      setVisualize(true);
    } catch (error) {
      setError(true);
    }
  };

  const handleVisualizePca = async () => {
    try {
      const response = await APIDatabase.visualizePca(id);
      setVisualization(response);
      setVisualize(true);
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
      {visualize && (
        <VisualizeModal onConfirm={handleClose} visualization={visualization} title={title} />
      )}
      {dataset && (
        <div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <div className="dropdown-container">
              <button className="main-button" onClick={toggleDropdownDrop}>
                Drop
              </button>
              {dropIsExpanded && (
                <div className="dropdown">
                  {Object.keys(dataset.data[0]).map((header, index) => {
                    if (header !== 'XY' && header !== 'special_main') {
                      return (
                        <button
                          key={index}
                          value={header}
                          className="dropdown-button"
                          onClick={() => handleDrop(header)}
                        >
                          {header}
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
            <div className="dropdown-container">
              <button className="main-button" onClick={toggleDropdownOneHot}>
                One Hot Encoding
              </button>
              {oneHotIsExpanded && (
                <div className="dropdown">
                  {Object.keys(dataset.data[0]).map((header, index) => {
                    if (header !== 'XY' && header !== 'special_main') {
                      return (
                        <button
                          key={index}
                          value={header}
                          className="dropdown-button"
                          onClick={() => handleOneHotEncoding(header)}
                        >
                          {header}
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
            <div className="dropdown-container">
              <button className="main-button" onClick={toggleDropdownImputation}>
                Select imputation method
              </button>
              {imputationIsExpanded && (
                <div className="dropdown">
                  <button
                    className="dropdown-button"
                    onClick={handleImputationZero}
                    style={{ backgroundColor: imputationZeroButton ? 'green' : 'secondary' }}
                  >
                    0
                  </button>
                  <button
                    className="dropdown-button"
                    onClick={handleImputationMean}
                    style={{ backgroundColor: imputationMeanButton ? 'green' : 'secondary' }}
                  >
                    Mean
                  </button>
                  <button
                    className="dropdown-button"
                    onClick={handleImputationMedian}
                    style={{ backgroundColor: imputationMedianButton ? 'green' : 'secondary' }}
                  >
                    Median
                  </button>
                </div>
              )}
            </div>
            <div className="dropdown-container">
              <button className="main-button" onClick={toggleDropdownY}>
                Label
              </button>
              {yIsExpanded && (
                <div className="dropdown">
                  {Object.keys(dataset.data[0]).map((header, index) => {
                    if (header !== 'XY') {
                      return (
                        <button
                          key={index}
                          value={header}
                          className="dropdown-button"
                          onClick={() => handleLabel(header)}
                        >
                          {header}
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
            <div className="dropdown-container">
              <button className="main-button" onClick={toggleDropdownVisualize}>
                Visualize
              </button>
              {visualizeIsExpanded && (
                <div className="dropdown">
                  <button className="dropdown-button" onClick={handleVisualizePca}>
                    PCA
                  </button>
                  <button className="dropdown-button" onClick={handleVisualizeTsne}>
                    TSNE
                  </button>
                </div>
              )}
            </div>
            <Button
              className="main-button"
              style={{ backgroundColor: normalizeButton ? 'green' : 'secondary' }}
              onClick={handleNormalize}
              disabled={normalizeButton}
            >
              Normalize
            </Button>
            <Button
              className="main-button"
              style={{ backgroundColor: splitButton ? 'green' : 'secondary' }}
              onClick={handleSplit}
              disabled={splitButton}
            >
              Split data
            </Button>
            <div className="dropdown-container">
              <button className="main-button" onClick={toggleDropdownDownload}>
                Select download method
              </button>
              {downloadIsExpanded && (
                <div className="dropdown">
                  <button className="dropdown-button" onClick={factoryHandleDownload('csv')}>
                    CSV
                  </button>
                  <button className="dropdown-button" onClick={factoryHandleDownload('json')}>
                    JSON
                  </button>
                  <button className="dropdown-button" onClick={factoryHandleDownload('xlsx')}>
                    XLSX
                  </button>
                </div>
              )}
            </div>
          </div>
          <MyTable data={dataset.data} />
        </div>
      )}
    </div>
  );
}
