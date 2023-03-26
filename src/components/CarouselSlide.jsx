import React, { useState } from 'react'
import '../styles/CarouselSlide.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Skeleton } from '@mui/material';

function CarouselSlide() {

    const [timer, setTimer] = useState(true)

    setTimeout(() => {
        setTimer(false)
    }, 6000)

    return (
        <Carousel showThumbs={false}>
            <div>
                {
                    timer ? <Skeleton sx={{ bgcolor: 'grey.900', margin:'10px' }} variant="rectangular" animation="wave" height={300} /> :
                        <>
                            <iframe width="420" height="315"
                                src="https://www.youtube.com/embed/bpOSxM0rNPM" title='Video 1'>
                            </iframe>
                            <p className="legend" style={{ opacity: '1', fontSize: '24px', backgroundColor: 'rgb(0,0,0,0.1)' }}>Crawling Back To You</p>
                        </>
                }
            </div>
            <div>
                <iframe width="420" height="315"
                    src="https://www.youtube.com/embed/_t431MAUQlQ" title='Video 2'>
                </iframe>
                <p className="legend" style={{ opacity: '1', fontSize: '24px', backgroundColor: 'rgb(0,0,0,0.1)' }}>All alone, all alone, uh</p>
            </div>
            <div>
                <iframe width="420" height="315"
                    src="https://www.youtube.com/embed/rLJlppzru4Q" title='Video 3'>
                </iframe>
                <p className="legend" style={{ opacity: '1', fontSize: '24px', backgroundColor: 'rgb(0,0,0,0.1)' }}>Yahin hai kahin</p>
            </div>
        </Carousel>
    )
}

export default CarouselSlide