import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const Thumb = props => (
  <div className={props.classes}>
    <Zoom>
    <img src={props.src} alt={props.alt} title={props.title} />
    </Zoom>
  </div>
);



export default Thumb;
