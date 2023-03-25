import React from 'react';
import App from './App';
import { createBrowserRouter } from 'react-router-dom';
import { Container } from 'reactstrap';

import { Uploader } from './components/Uploader';
import { Datasets } from './components/Datasets';
import { Dataset } from './components/Dataset';
import { Generate } from './components/Generate';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <Container>
            <Uploader />
          </Container>
        )
      },
      {
        path: '/generate',
        element: (
          <Container>
            <Generate />
          </Container>
        )
      },
      {
        path: '/datasets',
        element: (
          <Container>
            <Datasets />
          </Container>
        )
      },
      {
        path: '/dataset/:id',
        element: (
          <Container>
            <Dataset />
          </Container>
        )
      }
    ]
  }
]);
