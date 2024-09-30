import React, { useState } from "react";
import { Principal } from "@dfinity/principal"
import { token } from "../../../declarations/token"
function Balance() {


  const [inputValue, setinputValue] = useState("");
  const [balanceResult, setBalance] = useState("");
  const [cryptoSymbol, setSymbol] = useState("")
  const [isHidden, setHidden] = useState(true);
  const [displayText, setText] = useState(true);


  async function handleClick() {
    // console.log(inputValue);
    try {
      const principal = Principal.fromText(inputValue);
      const balance = await token.balanceOf(principal)
      setText(true)
      setBalance(balance.toLocaleString());
      setSymbol(await token.getSymbol())
      setHidden(false)
    } catch (err) {
      console.log("Error - account number not recognized: ", err);
      setText(false)
      setHidden(true)
    }



  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setinputValue(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={displayText}>Account number doesn't exist or is incorrect</p>
      <p hidden={isHidden} >This account has a balance of {balanceResult} {cryptoSymbol}</p>
    </div>
  );
}

export default Balance;
