import React from 'react'
import { useParams } from 'react-router-dom';
import PipeManufacturingPage from './PipeManufacturingPage';
import MachiningPage from './MachiningPage';

const PrintPageRouting = () => {
    const { tempID } = useParams();

    let element;
    if (tempID === 'MAC-0001') {
      element = <MachiningPage />;
    } else if (tempID === 'PIP-0001') {
      element = <PipeManufacturingPage />;
    } else {
      // Handle invalid tempID value
      element = <div>Invalid tempID value: {tempID}</div>;
    }
    return (
      <div>{element}</div>
    )
}

export default PrintPageRouting