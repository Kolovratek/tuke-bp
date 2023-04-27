import React, { useState } from 'react';
import { Form, FormGroup, Input, Label, Card, Button, Row, Col } from 'reactstrap';

import '../Generate/Generate.css';

export function Generate() {
  const [fileName, setFileName] = useState('Dataset');
  const [samples, setSamples] = useState(100);
  const [features, setFeatures] = useState(20);
  const [informative, setInformative] = useState(2);
  const [redundant, setRedundant] = useState(2);
  const [repeated, setRepeated] = useState(0);
  const [classes, setClasses] = useState(2);
  const [clustersPerClass, setClustersPerClass] = useState(2);

  const onSubmit = async () => {
    await fetch(`http://localhost:8000/dataset/generate/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName,
        samples,
        features,
        informative,
        redundant,
        repeated,
        classes,
        clustersPerClass
      })
    });
  };

  return (
    <Row>
      <Col sm="12" md={{ offset: 3, size: 6 }}>
        <Card
          className="mt-3"
          style={{ backgroundColor: '#455d7a', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
        >
          <Form className="p-3">
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="name">Name of dataset</Label>
                  <Input
                    type="text"
                    id="name"
                    value={fileName}
                    style={{ textAlign: 'center' }}
                    onChange={(event) => {
                      const fileName = event.target.value;
                      setFileName(fileName);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="n_samples">N_samples</Label>
                  <Input
                    type="number"
                    id="n_samples"
                    value={samples}
                    style={{ textAlign: 'center' }}
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
                    type="number"
                    id="n_features"
                    value={features}
                    style={{ textAlign: 'center' }}
                    onChange={(event) => {
                      const features = event.target.value;
                      setFeatures(features);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="n_informative">N_informative</Label>
                  <Input
                    type="number"
                    id="n_informative"
                    value={informative}
                    style={{ textAlign: 'center' }}
                    onChange={(event) => {
                      const informative = event.target.value;
                      setInformative(informative);
                    }}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label htmlFor="n_redundant">N_redundant</Label>
                  <Input
                    type="number"
                    id="n_redundant"
                    value={redundant}
                    style={{ textAlign: 'center' }}
                    onChange={(event) => {
                      const redundant = event.target.value;
                      setRedundant(redundant);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="n_repeated">N_repeated</Label>
                  <Input
                    type="number"
                    id="n_repeated"
                    value={repeated}
                    style={{ textAlign: 'center' }}
                    onChange={(event) => {
                      const repeated = event.target.value;
                      setRepeated(repeated);
                    }}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label htmlFor="classes">N_classes</Label>
                  <Input
                    type="number"
                    id="n_classes"
                    value={classes}
                    style={{ textAlign: 'center' }}
                    onChange={(event) => {
                      const classes = event.target.value;
                      setClasses(classes);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="n_clusters_per_class">N_clusters_per_class</Label>
                  <Input
                    type="number"
                    id="n_clusters_per_class"
                    value={clustersPerClass}
                    style={{ textAlign: 'center' }}
                    onChange={(event) => {
                      const clustersPerClass = event.target.value;
                      setClustersPerClass(clustersPerClass);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button block style={{ backgroundColor: '#f95959', margin: 0 }} onClick={onSubmit}>
              Generate
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
