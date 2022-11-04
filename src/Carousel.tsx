import React, { useEffect, useRef, useState } from "react";

import { Controls } from "./Controls";

interface Image {
    src: string,
    alt: string,
    class?: string
}

function Carousel({ Images }: { Images: Array<Image> }) {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0 as number);
    const [carouselImages, setCarouselImages] = useState(Images as Array<Image>);
    const [startAnimation, setStartAnimation] = useState(true as boolean);
    const [slideDirection, setSlideDirection] = useState(1 as number);
    const carouselRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let animationInterval: any;
        let carouselRefElem = carouselRef.current;

        if (startAnimation) {
            animationInterval = setInterval(() => {
                setSlideDirection(1);
                setCurrentSlideIndex((currentSlideIndex) => currentSlideIndex + 1 === Images.length ? 0 : currentSlideIndex + 1);
            }, 5000);
        }

        let slideImagesLength = Images.length;
        setCarouselImages((carouselImages): Array<Image> => {
            let images = carouselImages.map(img => {
                img.class = '';
                return img;
            });

            images[currentSlideIndex].class = 'current';
            images[currentSlideIndex - 1 < 0 ? slideImagesLength - 1 : currentSlideIndex - 1].class = `${slideDirection === 1 ? 'in-transition prev' : 'prev'}`;
            images[currentSlideIndex + 1 === slideImagesLength ? 0 : currentSlideIndex + 1].class = `${slideDirection === 2 ? 'in-transition next' : 'next'}`;
            return images;
        });
        carouselRefElem?.addEventListener('mouseenter', () => setStartAnimation(false));
        carouselRefElem?.addEventListener('mouseleave', () => setStartAnimation(true));
        carouselRefElem?.addEventListener('focusin', () => setStartAnimation(false));
        carouselRefElem?.addEventListener('focusout', () => setStartAnimation(true));

        return () => {
            clearInterval(animationInterval);
            carouselRefElem?.removeEventListener('mouseenter', () => setStartAnimation(false));
            carouselRefElem?.removeEventListener('mouseleave', () => setStartAnimation(true));
            carouselRefElem?.removeEventListener('focusin', () => setStartAnimation(false));
            carouselRefElem?.removeEventListener('focusout', () => setStartAnimation(true));
        }
    }, [Images, currentSlideIndex, startAnimation, slideDirection]);

    const prevSlide = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setCurrentSlideIndex(() => currentSlideIndex - 1 < 0 ? carouselImages.length - 1 : currentSlideIndex - 1);
        setSlideDirection(2);
    }
    const nextSlide = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setCurrentSlideIndex(() => currentSlideIndex + 1 === carouselImages.length ? 0 : currentSlideIndex + 1);
        setSlideDirection(1);
    }

    return (
        <section className="active carousel" aria-labelledby="carouselheading" ref={carouselRef}>
            <h3 id="carouselheading" className="visuallyhidden">Recent news</h3>

            <ul>
                {carouselImages.map((img, imgIndex) => {
                    return (
                        <li className={`${[img.class, 'slide'].join(' ').trim()}`} key={imgIndex} aria-hidden={img.class !== 'current'}>
                            <img src={img.src} alt={img.alt} />
                        </li>
                    )
                })}
            </ul>

            <Controls prevSlide={prevSlide} nextSlide={nextSlide} />

            <ul className="slidenav">
                {
                    startAnimation ?
                        <li><button data-action="stop" onClick={() => setStartAnimation(false)}><span className="visuallyhidden">Stop Animation </span>￭</button></li>
                        :
                        <li><button data-action="start" onClick={() => setStartAnimation(true)}><span className="visuallyhidden">Start Animation </span>▶</button></li>
                }

                {
                    Array.from({ length: carouselImages.length }, (img, imgIndex) => {
                        return (
                            <li key={imgIndex}>
                                <button className={imgIndex === currentSlideIndex ? 'current' : ''} onClick={() => { setCurrentSlideIndex(imgIndex); setSlideDirection(0); }}>
                                    <span className="visuallyhidden">News</span>
                                    {imgIndex + 1}
                                </button>
                            </li>
                        )
                    })
                }

            </ul>
            <div aria-live="polite" aria-atomic="true" className="liveregion visuallyhidden">
                {`Item ${currentSlideIndex + 1} of ${carouselImages.length}`}
            </div>
        </section>
    )
}

export default Carousel;