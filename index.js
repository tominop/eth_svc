const express = require("express")
const app = express()
const axios = require('axios')
const urlEth = 'https://rinkeby.infura.io/'
var Web3 = require("web3")
var Eth3 = ''

app.get("/eth/api/:token", (req, res) => {
    const token = req.params.token
    Eth3 = new Web3(new Web3.providers.HttpProvider(urlEth + token))
    const provider = Eth3.currentProvider
    res.header("Access-Control-Allow-Origin", "*")
    res.json(provider)
    console.log(provider)
})

app.get("/eth/balance/:addrs", (req, res) => {
    const addrsETH = req.params.addrs
    const balance = Eth3.eth.getBalance(addrsETH) / 10 ** 18
    res.header("Access-Control-Allow-Origin", "*")
    res.json({ balance: balance })
})

const port = process.env.PORT_ETH || 8200

app.listen(port, () => {
    console.log(`eth_svc listening on ${port}`)
})