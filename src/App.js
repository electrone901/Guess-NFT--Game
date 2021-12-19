import React, { useEffect } from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Mint from './components/mint/Mint.jsx'
import Home from './components/home/Home.jsx'
import Char2Bytes from './components/char2Bytes/Char2Bytes.jsx'

import { getNFTs, mintNFT } from './utils/wallet'
import Navbar from './components/navbar/Navbar.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoaded, setStorage } from './store/reducers/storage.js'

const App = () => {
  const loaded = useSelector(selectLoaded)
  const dispatch = useDispatch()
  useEffect(() => {
    try {
      const func = async () => {
        const nfts = await getNFTs()
        dispatch(setStorage(nfts))
      }
      if (!loaded) {
        func()
      }
    } catch (err) {
      console.log(err)
    }
  }, [dispatch, loaded])

  const myMint = () => {
    mintNFT(
      'tz1c4r83NUvcjXMwX8ZauEay6T2XLAWgsRhL',
      'https://images.unsplash.com/photo-1639264416398-ff4509f6e1f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      0,
    )
  }

  return (
    <div>
      <Mint />
      {/* <Router>
        <Navbar />
        <button onClick={myMint}>Mint</button>
        <Switch>
          <Route exact component={Char2Bytes} path="/char2Bytes" />
          <Route exact component={Mint} path="/mint" />
          <Route exact component={Home} path="/" />
        </Switch>
      </Router> */}
    </div>
  )
}

export default App
