import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(0);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const styleRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let char = '!@#$%^&*()_+{}[]|:;"<>,.?/~';
    if (number) str += num;
    if (character) str += char;
    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, number, character]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  const copyPassword = useCallback(() => {
    styleRef.current.style.backgroundColor = "green";
    styleRef.current.innerText = "Copied";
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    // passwordRef.current.setSelectionRange(0,password.length)
    setTimeout(() => {
      styleRef.current.style.backgroundColor = "";
      styleRef.current.innerText = "Copy";
    }, 2000);
  }, [password]);

  return (
    <>
      <h2>Password Generator</h2>
      <div className="container">
        <div className="input-container">
          <input
            ref={passwordRef}
            type="text"
            readOnly
            value={password}
            placeholder="password"
            className="input"
          />
          <button ref={styleRef} onClick={copyPassword} className="button">
            Copy
          </button>
        </div>
        <div className="rangeInput">
          <input
            type="range"
            max={100}
            min={0}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
          <label className="label">Length: {length}</label>

          <input
            type="checkbox"
            onChange={() => setNumber((prev) => !prev)}
            checked={number}
          />
          <label className="label">Number</label>

          <input
            onChange={() => setCharacter((prev) => !prev)}
            type="checkbox"
            checked={character}
          />
          <label className="label">Character</label>
        </div>
      </div>
    </>
  );
}

export default App;
