import React from 'react';
import Thumb from '../Thumb/Thumb';



const Brochure = ({ brochure }) => {


  return (
    <div
      className="shelf-item"
      
    >
      <Thumb
        classes="shelf-item__thumb"
        src={brochure.picture}
        alt="test"
      />
     
      <div className="shelf-item__price">
        <div className="val">
          <small>{brochure.date}</small>
          <b>{brochure.company}</b>
        </div>
        
      </div>
      
    </div>
  );
};



export default Brochure;
