import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalFooter, ModalHeader } from 'reactstrap';
import Plot from 'react-plotly.js';

export const VisualizeModal = (props) => {
  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal isOpen={true}>
        <ModalHeader></ModalHeader>
        <Plot
          data={[
            {
              x: props.visualization.map((row) => row['t-SNE_1']),
              y: props.visualization.map((row) => row['t-SNE_2']),
              mode: 'markers',
              marker: {
                color: props.visualization.map((row) => row.id),
                colorscale: 'Viridis'
              }
            }
          ]}
        />
        <ModalFooter>
          <Button variant="secondary" onClick={props.onConfirm}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

VisualizeModal.propTypes = {
  visualization: PropTypes.array.isRequired,
  onConfirm: PropTypes.func.isRequired
};
