import axios from 'axios';
import React, { useState, createContext, useContext, useEffect } from 'react'
import { CoinList } from './config/api';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [ currency, setCurrency ] = useState('CAD');
  const [ symbol, setSymbol ] = useState('C$');
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);


  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };
  
  useEffect( () => {
    if (currency === "CAD") setSymbol("C$");
    else if (currency === "USD") setSymbol("$");
  },[currency])  

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency, coins, loading, fetchCoins }}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
};

