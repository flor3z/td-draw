import Confetti from 'react-confetti';

import React from 'react';

const Header = ({ selectedName }) => {
  return (
    <div className="flex justify-between py-2 sm:py-3 text-3xl font-medium text-white bg-[#12412a]">
      {selectedName && (
        <Confetti
          className="w-full h-full"
          run={true}
          tweenDuration={1500}
          opacity={0.8}
          recycle={true}
          numberOfPieces={200}
        />
      )}
      <h1 className="ml-6 bg-[#008a00] px-2 py-1 tracking-[-0.095em]">TD</h1>
      <h1 className="mr-6">Gala 2024</h1>
    </div>
  );
};

export default Header;
