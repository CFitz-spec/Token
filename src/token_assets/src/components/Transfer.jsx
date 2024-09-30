import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token"
import { Principal } from "@dfinity/principal"
import { AuthClient } from "@dfinity/auth-client"


function Transfer() {

  const [amountInput, setInput] = useState("")
  const [transferId, setId] = useState("")
  const [isDisabled, setDisabled] = useState(false);
  const [displayText, setDisplayText] = useState("")
  const [isHidden, setHidden] = useState(true)

  async function handleClick() {
    setDisabled(true);
    setHidden(true)
    const amountTransfer = Number(amountInput);
    const id = Principal.fromText(transferId)

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity
      },
    });
    const result = await authenticatedCanister.transfer(id, amountTransfer);
    setDisplayText(result)
    setHidden(false)
    setDisabled(false)

  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                onChange={(e) => { setId(e.target.value) }}
                value={transferId}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                onChange={(e) => { setInput(e.target.value) }}
                value={amountInput}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled} >
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{displayText}</p>
      </div>
    </div>
  );
}

export default Transfer;
