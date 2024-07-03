import { useState, useCallback , useEffect , useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [passw, setPass] = useState();

  //use ref hook 
  const passref = useRef(null)

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMmnbvcxzasdfghjklpoiuytrewq";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}[]<>";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPass(pass);
  }, [length, numberAllowed, charAllowed, setPass]);

  const copyPasswordToClickboard = useCallback(()=>{
    passref.current?.select()
    window.navigator.clipboard.writeText(passw)
  },[passw])

  useEffect(()=>{
    passGenerator()
  },[length,charAllowed,numberAllowed,passGenerator])

  return (
    <>
      <div className="w-full max-w-md  mx-auto shadow-md rounded-lg px-4 my-8 bg-grey-800 text-orange-500 ">
        <h1 className="text-4xl text-center text-white my-3 ">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={passw}
            className="oulineline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passref}
          />
          <button
          onClick={copyPasswordToClickboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 ">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>length : {length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={(e) => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={(e) => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
