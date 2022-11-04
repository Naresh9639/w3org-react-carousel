import React from "react";
import leftArrow from './assets/chevron-left.png';
import rightArrow from './assets/chevron-right.png';

export function Controls({ prevSlide, nextSlide }: { prevSlide: (event: React.MouseEvent<HTMLButtonElement>) => void; nextSlide: (event: React.MouseEvent<HTMLButtonElement>) => void; }) {

    return (
        <ul className="controls">
            <li>
                <button type="button" className="btn-prev" onClick={prevSlide}>
                    <img src={leftArrow} alt="Previous Item" />
                </button>
            </li>
            <li>
                <button type="button" className="btn-next" onClick={nextSlide}>
                    <img src={rightArrow} alt="Next Item" />
                </button>
            </li>
        </ul>
    );
}
