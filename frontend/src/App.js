import React from 'react';
import "./App.css";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Card,
  Button,
  Row,
  Col,
} from "reactstrap";

function App() {
  const [file, setFile] = React.useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("file", file);
    await fetch(`http://localhost:8000/polls/upload`, {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col sm="12" md={{ offset: 3, size: 6 }}>
            <Card className="mt-3">
              <Form className="p-3">
                <FormGroup>
                  <Label htmlFor="file-upload">File upload</Label>
                  <Input type="file" id="file-upload" 
                    onChange={(event) => {
                      const file = event.target.files[0];
                      setFile(file);
                    }}
                  />
                </FormGroup>
                <Button block color="primary" onClick={onSubmit}>
                  Submit
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
