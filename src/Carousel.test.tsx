import React from "react";
import { render, screen } from '@testing-library/react';
import Carousel from './Carousel';

import teddy1 from './assets/ex-teddy1.jpg';
import teddy2 from './assets/ex-teddy2.jpg';
import teddy3 from './assets/ex-teddy3.jpg';

test(`renders Carousel`, () => {
    render(<Carousel Images={[
        { src: teddy1, alt: `Space Teddy 1`},
        { src: teddy2, alt: `Space Teddy 2`},
        { src: teddy3, alt: `Space Teddy 3`}
      ]} Config={{
        id: `carouselheading`,
        headerText: 'Recent news',
      }}/>)
    const headerElement = screen.getByText(/Recent news/i);
    expect(headerElement).toBeInTheDocument();
});


