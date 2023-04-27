import React from 'react';
import { Form, FormGroup, Label, Input, Card, Button, Row, Col } from 'reactstrap';

import '../Uploader/Uploader.css';

export function Uploader() {
  const [file, setFile] = React.useState(null);
  const [fileName, setFileName] = React.useState('');
  const [error, setError] = React.useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    if (!['csv', 'xlsx', 'json'].includes(file.name.split('.')[1])) {
      setError('Invalid file type. Please select a CSV, JSON or XLSX file.');
      return;
    }
    if (file.size > 100000000) {
      setError('File size too large. Please select a file under 100MB.');
      return;
    }
    setError('');

    const formData = new FormData();
    formData.append('file', file, fileName);
    await fetch(`http://localhost:8000/dataset/`, {
      method: 'POST',
      body: formData
    });
  };

  return (
    <Row className="upload-form">
      <Col sm="12" md={{ offset: 3, size: 6 }}>
        <Card style={{ backgroundColor: '#455d7a', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <Form className="p-3">
            <FormGroup>
              <Label htmlFor="file-upload">File upload</Label>
              <Input
                type="file"
                id="file-upload"
                onChange={(event) => {
                  const file = event.target.files[0];
                  setFile(file);
                  setFileName(file.name);
                }}
              />
              {error && <p className="text-danger">{error}</p>}
            </FormGroup>
            <Button block style={{ backgroundColor: '#f95959', margin: 0 }} onClick={onSubmit}>
              Submit
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
