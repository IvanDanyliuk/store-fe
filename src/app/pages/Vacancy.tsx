import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';


const Vacancy: React.FC = () => {
  const { id } = useParams();

  return (
    <div>Vacancy has an id: {id}</div>
  );
};

export default Vacancy;