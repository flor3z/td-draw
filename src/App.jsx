import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

function App() {
  const getNames = () => {
    return JSON.parse(localStorage.getItem('names')) || [];
  };

  const [nameList, setNameList] = useState(getNames());
  const [textAreaVal, setTextAreaVal] = useState('');
  const [selectedName, setSelectedName] = useState('');

  useEffect(() => {
    console.log(nameList);
    localStorage.setItem('names', JSON.stringify(nameList));
  }, [nameList]);

  const handleSaveNames = (e) => {
    console.log(nameList);
    e.preventDefault();
    if (textAreaVal !== '') {
      const splitArray = textAreaVal.split(',').map((name) => name.trim());
      setNameList(splitArray);
    }
  };

  const handleRandomName = () => {
    const randomIndex = Math.floor(Math.random() * nameList.length);
    console.log(randomIndex);
    setSelectedName(nameList[randomIndex]);

    // setTimeout(() => {
    //   const shuffle = nameList.sort(() => Math.random() - 0.5);

    //   return setSelectedName(shuffle);
    // }, 3000);
  };

  return (
    <div className="flex flex-col justify-between">
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

      <div className="bg-[#12412a] py-3 flex justify-between text-3xl font-medium text-white">
        <h1 className="ml-6 bg-[#008a00] px-2 py-1 tracking-[-0.095em]">TD</h1>
        <h1 className="mr-6">Gala 2024</h1>
      </div>
      <div className="flex flex-col md:flex md:flex-row-reverse justify-evenly mb-auto">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl font-bold text-left my-6">
            Random Name Draw
          </h1>
          <h3 className="text-left mb-4">Enter names seperated by commas:</h3>
          <form
            onSubmit={handleSaveNames}
            className="flex flex-col items-center"
          >
            <textarea
              spellCheck={'false'}
              onChange={(e) => setTextAreaVal(e.target.value)}
              value={textAreaVal ? textAreaVal : ''}
              type="text"
              placeholder="Enter names..."
              rows={10}
              className="bg-neutral-100 w-80 outline-double outline-green-800 outline-2 rounded-sm shadow-md"
            ></textarea>
            <button className="px-2 py-1 rounded-md bg-[#008a00] hover:bg-[#007c16] text-white text-lg mt-4 active:scale-95 transition transform duration-200 ease-in-out">
              Save Names
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center justify-between py-40">
          {selectedName ? (
            <p className="text-4xl tracking-wider font-bold">
              {selectedName.toUpperCase()}
            </p>
          ) : (
            <p className="text-2xl  font-sans font-semibold">The Winner is..</p>
          )}
          <button
            onClick={handleRandomName}
            className="px-2 py-1 rounded-md bg-[#008a00] hover:bg-[#007c16] text-white text-lg mt-4 active:scale-95 transition transform duration-200 ease-in-out"
          >
            Random Name Selection
          </button>
        </div>
      </div>
      <div className="bg-[#12412a] py-3 flex justify-between text-3xl font-medium text-white">
        <h1 className="ml-6 bg-[#008a00] px-2 py-1 tracking-[-0.095em]">TD</h1>
        <h1 className="mr-6">Gala 2024</h1>
      </div>
    </div>
  );
}

export default App;
