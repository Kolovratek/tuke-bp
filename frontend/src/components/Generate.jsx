import React, { useState } from 'react';
import { Form, FormGroup, Input, Label, Card, Button, Row, Col } from 'reactstrap';

export function Generate() {
  const [samples, setSamples] = useState('');
  const [features, setFeatures] = useState('');
  const [informative, setInformative] = useState('');
  // const [file] = React.useState(null);
  // const [fileName] = React.useState('');

  // const onSubmit = async (event) => {
  //   event.preventDefault();

  //   const formData = new FormData();
  //   formData.append('file', file, fileName);
  //   await fetch(`http://localhost:8000/dataset/`, {
  //     method: 'POST',
  //     body: formData
  //   });
  // };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('n_samples', samples.trim());
    formData.append('n_features', features.trim());
    formData.append('n_informative', informative.trim());
    await fetch(`http://localhost:8000/dataset/generate-syntactic/`, {
      method: 'POST',
      body: formData
    });
  };

  return (
    <Row>
      <Col sm="12" md={{ offset: 3, size: 6 }}>
        <Card className="mt-3">
          <Form className="p-3">
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="n_samples">N_samples</Label>
                  <Input
                    type="text"
                    id="n_samples"
                    onChange={(event) => {
                      const samples = event.target.value;
                      setSamples(samples);
                    }}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label htmlFor="n_features">N_features</Label>
                  <Input
                    type="text"
                    id="n_features"
                    onChange={(event) => {
                      const features = event.target.value;
                      setFeatures(features);
                    }}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label htmlFor="n_informative">N_informative</Label>
                  <Input
                    type="text"
                    id="n_informative"
                    onChange={(event) => {
                      const informative = event.target.value;
                      setInformative(informative);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button block color="primary" onClick={onSubmit}>
              Generate
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
