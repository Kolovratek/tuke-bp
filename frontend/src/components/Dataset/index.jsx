import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';

import { MyTable } from '../MyTable';
import { APIDatabase } from '../../API';

export function Dataset() {
  let { id } = useParams();
  const [, setDropColumns] = React.useState([]);
  const [, setOneHotColumns] = React.useState([]);
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    const request = async () => {
      const data = await APIDatabase.get(id);
      setDataset(data);
    };
    request();
  }, []);

  const handleSaveChanges = async () => {};

  const handleOneHotEncoding = async () => {};

  return (
    <div>
      <h1>Dataset ID {id}</h1>
      {dataset && (
        <div>
          <MyTable
            data={dataset.data}
            setDropColumns={setDropColumns}
            setOneHotColumns={setOneHotColumns}
          />
          <Button onClick={handleSaveChanges}>Save Changes</Button>
          <Button onClick={handleOneHotEncoding}>One Hot Encoding</Button>
        </div>
      )}
    </div>
  );
}
