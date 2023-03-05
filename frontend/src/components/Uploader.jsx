import React from 'react';
import { Form, FormGroup, Label, Input, Card, Button, Row, Col } from 'reactstrap';

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
    if (!['csv', 'txt', 'xlsx'].includes(file.name.split('.')[1])) {
      setError('Invalid file type. Please select a CSV, TXT or XLSX file.');
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
    <Row>
      <Col sm="12" md={{ offset: 3, size: 6 }}>
        <Card className="mt-3">
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
            <Button block color="primary" onClick={onSubmit}>
              Submit
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
