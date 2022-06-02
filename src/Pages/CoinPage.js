import { makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CoinInfo from '../Components/CoinInfo';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from '../Components/CoinsTable';

// // export function numberWithCommas(x) {
// //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// // }

const CoinPage = () => {
  
  const { id } = useParams();
  const [ coin, setCoin ] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  }

  console.log(coin);
  useEffect( () => {
    fetchCoin();
  },[]);
  
  // const useStyles = makeStyles( () => ({}));
  // const classes = useStyles();

  return (
    <div className="container">
      <div className="sidebar">
        <img src={coin?.image.large} alt={coin?.name} height="200" style={{ marginBottom: 20 }} />
        <Typography variant="h3" className="heading">{coin?.name}</Typography>
        <Typography variant="subtitle1" className="description">{ReactHtmlParser(coin?.description.en.split(". ")[0])}</Typography>
        <div className="marketData">
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">Rank : </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">{coin?.market_cap_rank}</Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">Current Price : </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}{" "}
              {coin?.market_data.current_price[currency.toLowerCase()]}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">Market Cap : </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}{" "}
              {coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6)}M
            </Typography>
          </span>
        </div>
      </div>
      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage;

