THIS is my project from the UDEMY webdev bootcamp

This is an IC project (internet computer).

Within this project I use:

React for the Front-end. 

Motoko to provide the Back-end.

# In this project
I create a Digital token called DCAY. (Digital Cayman)

First it uses Dfinity Authentication to verify users internet identity. 

Then offers three functions. 
First, to see the callers Id and claim 10,000 free DCAY tokens

Then, to see the amount of tokens registered to the inputted account number

Finally, transfer any number of tokens to another users wallet upon providing their ID. 


Below is a walkthrough on how to configure the backend. Provided with the course. 



# Check your Balance

1. Find out your principal id:

```
dfx identity get-principal
```

2. Save it somewhere.

 My principal id is -- fflhw-x7a2s-pz6jb-bbbx6-wzsyz-5qknu-rygxt-447hk-qtfk3-xf7aa-bqe


3. Format and store it in a command line variable:
```
OWNER_PUBLIC_KEY="principal \"$( \dfx identity get-principal )\""
```

4. Check that step 3 worked by printing it out:
```
echo $OWNER_PUBLIC_KEY
```

5. Check the owner's balance:
```
dfx canister call token balanceOf "( $OWNER_PUBLIC_KEY )"
```

# Charge the Canister


1. Check canister ID:
```
dfx canister id token
```

2. Save canister ID into a command line variable:
```
CANISTER_PUBLIC_KEY="principal \"$( \dfx canister id token )\""
```

3. Check canister ID has been successfully saved:
```
echo $CANISTER_PUBLIC_KEY
```

4. Transfer half a billion tokens to the canister Principal ID:
```
dfx canister call token transfer "($CANISTER_PUBLIC_KEY, 500_000_000)"
```

# Deploy the Project to the Live IC Network

1. Create and deploy canisters:

```
dfx deploy --network ic
```

2. Check the live canister ID:
```
dfx canister --network ic id token
```

3. Save the live canister ID to a command line variable:
```
LIVE_CANISTER_KEY="principal \"$( \dfx canister --network ic id token )\""
```

4. Check that it worked:
```
echo $LIVE_CANISTER_KEY
```

5. Transfer some tokens to the live canister:
```
dfx canister --network ic call token transfer "($LIVE_CANISTER_KEY, 50_000_000)"
```

6. Get live canister front-end id:
```
dfx canister --network ic id token_assets
```
7. Copy the id from step 6 and add .raw.ic0.app to the end to form a URL.
e.g. zdv65-7qaaa-aaaai-qibdq-cai.raw.ic0.app