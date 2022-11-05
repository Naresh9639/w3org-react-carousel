import React, { useEffect, useRef, useState } from "react";

import { Controls } from "./Controls";
import { LiveRegion } from "./LiveRegion";

interface ICarouselProps {
    Images: Array<Image>,
    Config: { id: string, headerText: string }
}

interface Image { src: string, alt: string, class?: string }

function Carousel({ Images, Config }: ICarouselProps) {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0 as number);
    const [carouselImages, setCarouselImages] = useState(Images as Array<Image>);
    const [startAnimation, setStartAnimation] = useState(true as boolean);
    const [slideDirection, setSlideDirection] = useState(1 as number);
    const carouselRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let carouselRefElem = carouselRef.current;
        carouselRefElem?.addEventListener('mouseenter', () => setStartAnimation(false));
        carouselRefElem?.addEventListener('mouseleave', () => setStartAnimation(true));
        carouselRefElem?.addEventListener('focusin', () => setStartAnimation(false));
        carouselRefElem?.addEventListener('focusout', () => setStartAnimation(true));
        return () => {
            carouselRefElem?.removeEventListener('mouseenter', () => setStartAnimation(false));
            carouselRefElem?.removeEventListener('mouseleave', () => setStartAnimation(true));
            carouselRefElem?.removeEventListener('focusin', () => setStartAnimation(false));
            carouselRefElem?.removeEventListener('focusout', () => setStartAnimation(true));
        }
    }, []);

    useEffect(() => {
        let animationInterval: any;

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

        return () => {
            clearInterval(animationInterval);
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
        <section className="active carousel" aria-labelledby={Config.id} ref={carouselRef}>
            <h3 id={Config.id} className="visuallyhidden">{Config.headerText}</h3>

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
            <LiveRegion slideIndex={currentSlideIndex + 1} slidesLength={carouselImages.length}/>
        </section>
    )
}

export default Carousel;