import React from 'react';

import Brochure from './brochure';

const BrochureList = ({ brochures }) => {

  console.log(brochures);
  return brochures.map(p => {
    return <Brochure brochure={p} key={p.id} />;
  });
};

export default BrochureList;
