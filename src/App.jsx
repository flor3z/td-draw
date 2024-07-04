import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const getNames = () => {
    return JSON.parse(localStorage.getItem('names')) || [];
  };

  const [nameList, setNameList] = useState(getNames());
  const [textAreaVal, setTextAreaVal] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [activeConfetti, setActiveConfetti] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      handleSaveNames();
      localStorage.setItem('names', JSON.stringify(nameList));
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [textAreaVal, nameList]);

  const handleSaveNames = () => {
    if (textAreaVal !== '' || textAreaVal !== ' ') {
      let splitArray = textAreaVal.split(',').map((name) => name.trim());
      if (splitArray[splitArray.length - 1] === '') {
        splitArray.pop();
      } else {
        splitArray;
      }
      setNameList(splitArray);
    }
  };

  const clearLocalNames = (e) => {
    e.preventDefault();
    setTextAreaVal('');
    setSelectedName('');
    return localStorage.removeItem('names');
  };

  const handleRandomName = () => {
    if (textAreaVal != '') {
      setActiveConfetti(false);
      const interval = setInterval(
        () =>
          setSelectedName(
            nameList[Math.floor(Math.random() * nameList.length)]
          ),
        50
      );

      const timer = setTimeout(() => {
        clearInterval(interval);
        setActiveConfetti(true);
      }, 3500);

      return () => clearTimeout(timer);
    } else {
      return null;
    }
  };

  const activeSaveName =
    textAreaVal != ''
      ? 'px-2 py-1 rounded-md bg-[#008a00] hover:bg-[#007c16] text-white text-xl hover:scale-105 shadow-md  mt-4 active:scale-95 transition transform duration-200 ease-in-out'
      : 'px-2 py-1 rounded-md border-[2px] border-[#008a00] hover:border-[#007c16] text-[#007c16] text-xl hover:scale-105 shadow-md  mt-4 active:scale-95 transition transform duration-200 ease-in-out';

  return (
    <div className="flex flex-col justify-between h-screen">
      <Header selectedName={selectedName} activeConfetti={activeConfetti} />
      <div className="flex-col justify-between md:flex md:flex-row-reverse md:justify-evenly -mt-20 sm:mt-0">
        <div className="flex flex-col items-center pb-6 md:pb-0">
          <h1 className="text-2xl md:text-4xl font-bold text-left py-2 sm:py-6 tracking-wider">
            Random Name Draw
          </h1>
          <h3 className="text-lg mb-4">Enter names seperated by commas:</h3>
          <form className="flex flex-col">
            <textarea
              spellCheck={'false'}
              onChange={(e) => setTextAreaVal(e.target.value)}
              value={textAreaVal ? textAreaVal : ''}
              type="text"
              placeholder="Enter names..."
              rows={10}
              className="bg-neutral-100 w-64 h-52 sm:h-full  sm:w-80  outline-double outline-green-800 outline-2 rounded-md"
            ></textarea>
            <div className="flex justify-evenly">
              <button
                onClick={clearLocalNames}
                className="px-2 py-1 rounded-md border-[2px] border-[#008a00] hover:border-[#007c16] text-[#007c16] text-xl hover:scale-105 shadow-md  mt-4 active:scale-95 transition transform duration-200 ease-in-out"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col items-center justify-evenly text-center md:w-96 -mb-16 sm:-mb-0">
          {selectedName ? (
            <p className="text-4xl md:text-5xl tracking-wider font-bold break-words h-20 pt-4 sm:h-24 text-wrap">
              {selectedName.toUpperCase()}
            </p>
          ) : (
            <p className="text-4xl  font-sans font-semibold">The Winner is..</p>
          )}
          <button
            onClick={handleRandomName}
            className={nameList && activeSaveName}
          >
            Random Name Selection
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
