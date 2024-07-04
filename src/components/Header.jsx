import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';
import React from 'react';

const Header = ({ activeConfetti }) => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const responsiveConfetti = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', responsiveConfetti);

    return () => {
      window.removeEventListener('resize', responsiveConfetti);
    };
  }, [screenSize]);

  return (
    <div className="flex justify-between py-2 sm:py-3 text-lg md:text-2xl font-thin text-white bg-[#12412a] items-center">
      {activeConfetti && (
        <Confetti
          width={screenSize.width}
          height={screenSize.height}
          run={true}
          gravity={0.045}
          tweenDuration={9000}
          opacity={0.8}
          recycle={false}
          numberOfPieces={800}
        />
      )}
      <div className="flex justify-between items-center">
        <h1 className="ml-6 bg-[#008a00] px-2 py-1 tracking-[-0.095em] font-medium">
          TD
        </h1>
        <h1 className="pl-2">Canada Trust</h1>
      </div>

      <h1 className="mr-6">Gala 2024</h1>
    </div>
  );
};

export default Header;
