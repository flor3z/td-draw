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

  useEffect(() => {
    localStorage.setItem('names', JSON.stringify(nameList));
  }, [nameList]);

  const handleSaveNames = (e) => {
    e.preventDefault();
    if (textAreaVal !== '') {
      const splitArray = textAreaVal.split(',').map((name) => name.trim());
      setNameList(splitArray);
    }
  };

  const clearLocalNames = () => {
    return localStorage.removeItem('names');
  };

  const handleRandomName = () => {
    const randomIndex = Math.floor(Math.random() * nameList.length);
    setSelectedName(nameList[randomIndex]);

    // setTimeout(() => {
    //   const shuffle = nameList.sort(() => Math.random() - 0.5);

    //   return setSelectedName(shuffle);
    // }, 3000);
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <Header selectedName={selectedName} />
      <div className="flex flex-col md:flex md:flex-row-reverse justify-evenly -mt-20 sm:mt-0">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-4xl font-bold text-left  my-2 sm:my-6">
            Random Name Draw
          </h1>
          <h3 className="text-xl mb-4">Enter names seperated by commas:</h3>
          <form onSubmit={handleSaveNames} className="flex flex-col">
            <textarea
              spellCheck={'false'}
              onChange={(e) => setTextAreaVal(e.target.value)}
              value={textAreaVal ? textAreaVal : ''}
              type="text"
              placeholder="Enter names..."
              rows={10}
              className="bg-neutral-100 w-80 outline-double outline-green-800 outline-2 rounded-sm shadow-md"
            ></textarea>
            <div className="flex justify-evenly">
              <button className="px-2 py-1 rounded-md bg-[#008a00] hover:bg-[#007c16] text-white text-xl hover:scale-105 shadow-md  mt-4 active:scale-95 transition transform duration-200 ease-in-out">
                Save Names
              </button>
              <button
                onClick={clearLocalNames}
                className="px-2 py-1 rounded-md border-[2px] border-[#008a00] hover:border-[#007c16] text-[#007c16] text-xl hover:scale-105 shadow-md  mt-4 active:scale-95 transition transform duration-200 ease-in-out"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col items-center justify-evenly mb-10 md:max-w-md text-center">
          {selectedName ? (
            <p className="text-5xl tracking-wider font-bold break-words animate-jump-in animate-duration-1000">
              {selectedName.toUpperCase()}
            </p>
          ) : (
            <p className="text-4xl  font-sans font-semibold">The Winner is..</p>
          )}
          <button
            onClick={handleRandomName}
            className="px-2 py-1 rounded-md bg-[#008a00] hover:bg-[#007c16] shadow-md text-white text-xl hover:scale-105 mt-4 active:scale-95 transition transform duration-200 ease-in-out"
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
