import React, { useState, createContext, useContext, useEffect } from 'react'

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [ currency, setCurrency ] = useState('CAD');
  const [ symbol, setSymbol ] = useState('C$');
  useEffect( () => {
    if (currency === "CAD") setSymbol("C$");
    else if (currency === "USD") setSymbol("$");
  },[currency])  

  return (
    <Crypto.Provider value={{currency, symbol, setCurrency}}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
};