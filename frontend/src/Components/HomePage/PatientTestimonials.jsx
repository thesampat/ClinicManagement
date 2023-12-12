import React, { useEffect, useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import AOS from "aos";
import "aos/dist/aos.css";
import { AiTwotoneStar } from "react-icons/ai"

const TestimonialCard = ({ content, author, stars }) => {

    

    return (
        <div data-aos="fade-up" className="max-w-xl mx-auto py-4 px-8 bg-white shadow-lg rounded-lg my-8 ">
            <div>
                <h2 className="text-secondry-400 text-2xl font-bold">{author}</h2>
                <p className="mt-2 text-primary-400">"{content}"</p>
            </div>
            <div className="flex justify-end mt-4">
            {Array.from({ length: stars }).map((item)=>(

                <AiTwotoneStar color='orange' size={"20"} />
            ))}
            </div>
        </div>
    );
};


const testimonials = [
    {
        imageSrc: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
        title: 'Mukul Jatav',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error...',
        author: 'John Doe',
        stars: 3
    }, {
        imageSrc: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
        title: 'Rahul Sharma',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error...',
        author: 'John Doe',
        stars: 4
    }, {
        imageSrc: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
        title: 'Sundeep Singh',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error...',
        author: 'John Doe',
        stars: 3
    }, {
        imageSrc: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
        title: 'Neetu Singh',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error...',
        author: 'John Doe',
        stars: 2
    }, {
        imageSrc: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
        title: 'Sahil Kumar',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error...',
        author: 'John Doe',
        stars: 5
    }, {
        imageSrc: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
        title: 'Rohan kumar',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error...',
        author: 'John Doe',
        stars: 4
    }, {
        imageSrc: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
        title: 'Rajeev Singh',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error...',
        author: 'John Doe',
        stars: 3
    },
];


const PatientTestimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);



    const handlePrevClick = () => {
        setActiveIndex(prevIndex => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setActiveIndex(prevIndex => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    };

    const displayedTestimonials = testimonials.slice(activeIndex, activeIndex + (window.innerWidth > 768 ? 3 : 1));

    // Automatically include testimonials 1 and 2 when the last or second-to-last testimonial is active
    if ((activeIndex === testimonials.length - 1 || activeIndex === testimonials.length - 2) && window.innerWidth > 768) {
        displayedTestimonials.push(testimonials[0]);
        displayedTestimonials.push(testimonials[1]);
    }

    if (displayedTestimonials.length > 3) {
        displayedTestimonials.pop()
    }


    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <div className="bg-primary-300 min-h-screen py-24 px-4">
            <div className="max-w-screen-lg mx-auto" data-aos="fade-up">
                <h1 className="text-4xl text-primary-500 font-bold text-center mb-4">Patient Testimonials</h1>
                <p className="text-lg text-primary-50 text-center mb-24">
                    It’s always the word of mouth that’s the best advice. Here are some of our...
                </p>
                <div className="relative">
                    <div className="flex flex-wrap justify-center gap-6 items-center md:flex-nowrap">

                        {displayedTestimonials.map((testimonial, index) => (

                            <TestimonialCard key={index} {...testimonial} />
                        ))}
                    </div>
                    <div className="flex justify-center mt-4 " >
                        <button
                            data-aos="fade-right"
                            className="text-primary-50 transition duration-300 ease-in-out hover:bg-primary-500 hover:text-primary-400 bg-primary-300 px-4 py-2 rounded active:bg-primary-50"
                            onClick={handlePrevClick}
                        >
                            <BsArrowLeft size={24} />
                        </button>
                        <button
                            data-aos="fade-left"
                            className="text-primary-50 transition duration-300 ease-in-out hover:bg-primary-500 hover:text-primary-400 bg-primary-300  px-4 py-2 rounded active:bg-primary-50"

                            onClick={handleNextClick}
                        >
                            <BsArrowRight size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default PatientTestimonials;
