import React from 'react';
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-center bg-black w-full pt-5 items-center'>
      <div className='mt-4 flex flex-col sm:me-6 items-center sm:items-start'>
        <h1 className='font-poppins text-white text-4xl font-md text-center sm:text-left'>
          Hi, I'm <span className='text-sky-500'>Jaswanth</span>
        </h1>
        <h2 className='font-poppins text-white text-xl font-md my-1 text-center sm:text-left'>
          I make <span className='text-green-400'>full-stack</span> products
        </h2>
        <h2 className='font-poppins text-white text-xl font-md text-center sm:text-left'>
          that people <span className='text-red-400'>love ❤️</span>
        </h2>
        <div className='social-icons flex mt-4 justify-center sm:justify-start'>
          <a href='https://github.com/jaswanthinvalley'>
            <FaGithub className='text-sky-500 transform hover:scale-125 transition-transform duration-300 text-2xl' />
          </a>
          <a href='https://www.linkedin.com/in/jaswanth-venkatesan-754142212/'>
            <FaLinkedin className='text-sky-500 transform hover:scale-125 transition-transform duration-300 text-2xl mx-3' />
          </a>
          <a href='https://x.com/Jaswant23480367'>
            <FaSquareXTwitter className='text-sky-500 transform hover:scale-125 transition-transform duration-300 text-2xl mx-3' />
          </a>
          <a href='https://www.instagram.com/jash.explorer/'>
            <FaInstagram className='text-sky-500 transform hover:scale-125 transition-transform duration-300 text-2xl mx-3' />
          </a>
        </div>
      </div>
      <div className='mt-4 sm:mt-0'>
        <img
          className='h-60 rounded-md hover:scale-105 transition-transform duration-200 relative z-10 sm:h-40'
          src='https://pbs.twimg.com/profile_images/1961454395281051648/bKAXAb0v_400x400.jpg'
          alt='Profile'
        />
                <button className='bg-sky-950 opacity-90 text-sky-500 p-3 lg:p-2 rounded-md mx-3 lg:mx-0 lg:me-2 my-4 font-poppins '>Resume</button>
                <button className='bg-sky-950 opacity-90 text-sky-500 p-3 lg:p-2 rounded-md mx-3 lg:mx-0 my-4 font-poppins'>Hire me</button>
      </div>

    </div>
  );
}

export default Hero;
