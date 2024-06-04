import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';
import React from 'react';

const Header = ({ selectedName }) => {
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
    <div className="flex justify-between py-2 sm:py-3 text-3xl font-medium text-white bg-[#12412a]">
      {selectedName && (
        <Confetti
          width={screenSize.width}
          height={screenSize.height}
          run={true}
          gravity={0.075}
          tweenDuration={1500}
          opacity={0.8}
          recycle={true}
          numberOfPieces={300}
        />
      )}
      <h1 className="ml-6 bg-[#008a00] px-2 py-1 tracking-[-0.095em]">TD</h1>
      <h1 className="mr-6">Gala 2024</h1>
    </div>
  );
};

export default Header;
