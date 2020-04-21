import React from 'react';
import Zoom from 'react-img-zoom'

const Thumb = props => (
  <div className={props.classes}>
    
    <Zoom
  img={props.src}
  zoomScale={3}
  width={250}
  height={300}
/>

  </div>
);



export default Thumb;
