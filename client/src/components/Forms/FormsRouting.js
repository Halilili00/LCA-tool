import React from 'react'
import { useParams } from 'react-router-dom';
import MachiningsForm from './MachinigsForm';
import PipeManufacturingForm from './PipeManufacturingForm';

const FormsRouting = () => {
  const { tempID } = useParams();

  let element;
  if (tempID === 'MAC-0001') {
    element = <MachiningsForm />;
  } else if (tempID === 'PIP-0001') {
    element = <PipeManufacturingForm />;
  } else {
    // Handle invalid tempID value
    element = <div>Invalid tempID value: {tempID}</div>;
  }
  return (
    <div>{element}</div>
  )
}

export default FormsRouting