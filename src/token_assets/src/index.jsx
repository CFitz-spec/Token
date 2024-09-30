import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client"

const init = async () => {

  //what does this do?
  /**
   * First, creates a auth client session in browser
   * Then test to see if the auth client is already authenticated
   * if so then proceed with displaying webpage
   * Otherwise directs url to auth portal
   * upon success passes user to the website. 
   */
  const authClient = await AuthClient.create()
  if (authClient.isAuthenticated()) {
    handleAuthentication(authClient);
  } else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize", //this is login portal
      onSuccess: () => {
        handleAuthentication(authClient);
      }
    });
  };
  async function handleAuthentication(authClient) {
    const identity = await authClient.getIdentity();
    const userPrincipal = identity._principal.toString();
    console.log(userPrincipal)
    ReactDOM.render(<App loggedInPrinciple={userPrincipal} />, document.getElementById("root"));
  }



}

init();


