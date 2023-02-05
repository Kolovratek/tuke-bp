import React, { useCallback } from 'react';
import { Button } from 'reactstrap';
import { APIDatabase } from '../../API';
import './style.css';

export function Downloader() {
  const [fileType, setFileType] = React.useState('csv');

  const handleDownloadClick = useCallback(async () => {
    const data = await APIDatabase.download(fileType);
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `table.${fileType}`);
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
  }, [fileType]);

  return (
    <div className="Download">
      <select value={fileType} onChange={(e) => setFileType(e.target.value)}>
        <option value="csv">CSV</option>
        <option value="json">JSON</option>
        <option value="xlsx">XLSX</option>
        <option value="arff">ARFF</option>
      </select>
      <Button onClick={handleDownloadClick}>Download</Button>
    </div>
  );
}
