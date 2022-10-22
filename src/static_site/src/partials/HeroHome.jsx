import React, { useState } from 'react';
import Modal from '../utils/Modal';

import HeroImage from '../images/hero-image.png';

// import sound from "../scripts/beat.js";
import Slider from '@mui/material/Slider';

function HeroHome() {

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // create Oscillator node
  const oscillator_left = audioCtx.createOscillator();
  const oscillator_right = audioCtx.createOscillator();

  const gainNodeL = audioCtx.createGain();
  const gainNodeR = audioCtx.createGain();
  const merger = audioCtx.createChannelMerger(2); 

  const start_sound = () => {

    oscillator_left.connect(gainNodeL);
    oscillator_right.connect(gainNodeR);
    
    gainNodeL.connect(merger, 0, 0);
    gainNodeR.connect(merger, 0, 1);
    
    oscillator_left.type = 'sine';
    oscillator_left.frequency.setValueAtTime(200, audioCtx.currentTime);

    oscillator_right.type = 'sine';
    oscillator_right.frequency.setValueAtTime(215, audioCtx.currentTime);

    merger.connect(audioCtx.destination);

    oscillator_left.start();
    oscillator_right.start();
  }

  const stop_sound = () => {
    oscillator_left.stop();
    oscillator_right.stop();

    source.stop();
  }

  const myArrayBuffer = audioCtx.createBuffer(
    2,
    audioCtx.sampleRate * 120,
    audioCtx.sampleRate
  );


  const generatePink = () => {
    for (let channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
      // This gives us the actual ArrayBuffer that contains the data
  
      var b0, b1, b2, b3, b4, b5, b6;
      b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
  
      const nowBuffering = myArrayBuffer.getChannelData(channel);
      for (let i = 0; i < myArrayBuffer.length; i++) {
  
        var white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        nowBuffering[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        nowBuffering[i] *= 0.05; // (roughly) compensate for gain
        b6 = white * 0.115926;
      }
    }
  }

  generatePink();

  const source = audioCtx.createBufferSource();
  const gainNode = audioCtx.createGain()

  const playNoise = () => {

    source.buffer = myArrayBuffer;
    // connect the AudioBufferSourceNode to the
    // destination so we can hear the sound
    // source.connect(audioCtx.destination);
    // start the source playing

    gainNode.connect(audioCtx.destination)
    gainNode.gain.value = 0

    source.connect(gainNode)
    source.start();
  }

  playNoise();

  const changeVolume = (level) => {
    gainNode.gain.value = 0.01 * level
  }

  const stopNoise = () => {
    source.stop();
  }

  // playNoise();

  const [message, setMessage] = useState('');

  const handleChange = event => {
    setMessage(event.target.value);

    var level = event.target.value;

    changeVolume(level);

    console.log('level is:', level);
    console.log('gain is', gainNode.gain.value);
  };

  return (
    <section className="relative">

      {/* Illustration behind hero content */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none" aria-hidden="true">
        <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out"> <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Binaural Beats</span></h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Click below to listen to Binaural Beats</p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                <div className="text-center pb-12 md:pb-16">
                  <button type="button" className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0" href="#0" onClick={start_sound}>Binaural Beats</button>
                </div>
                <div>
                  <a className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="#0" onClick={stop_sound}>Stop Sound</a>
                </div>
            
                
              </div>

                <div className="text-center pb-12 md:pb-16" data-aos="zoom-y-out" data-aos-delay="150">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-400">Pink Noise</span>
                  <Slider defaultValue={0} aria-label="Small" valueLabelDisplay="auto" onChange={handleChange} value={message}/>
                </div>
              


            </div>
          </div>

          {/* Hero image */}
          <div>



          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroHome;