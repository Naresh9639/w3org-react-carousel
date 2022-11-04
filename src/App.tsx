import React from 'react';
import Carousel from './Carousel';
import './App.css';

import teddy1 from './assets/ex-teddy1.jpg';
import teddy2 from './assets/ex-teddy2.jpg';
import teddy3 from './assets/ex-teddy3.jpg';

function App() {
  return (
    <div className="">
      <Carousel Images={[
        { src: teddy1, alt: `Space Teddy 1`},
        { src: teddy2, alt: `Space Teddy 2`},
        { src: teddy3, alt: `Space Teddy 3`}
      ]} />
    </div>
  )
}

export default App;
