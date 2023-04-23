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
                color: props.visualization.map((row) => row.special_main),
                colorscale: 'Viridis',
                colorbar: { title: 'Special Main' }
              }
            }
          ]}
          layout={{
            legend: {
              title: { text: 'Special Main' },
              y: 0.5,
              traceorder: 'reversed'
            },
            xaxis: { title: 'Názov osi X', showticklabels: false },
            yaxis: { title: 'Názov osi Y', showticklabels: false }
          }}
        />
        {/* <Plot
          data={[
            {
              x: props.visualization.map((row) => row['t-SNE']),
              y: props.visualization.map((row) => row.special_main),
              mode: 'markers',
              marker: {
                color: props.visualization.map((row) => row.id),
                colorscale: 'Viridis'
              }
            }
          ]}
        /> */}
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
