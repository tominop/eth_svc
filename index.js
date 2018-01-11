const express = require("express")
const app = express()
const axios = require('axios')
var Web3 = require("web3")
const ethUrl = 'https://rinkeby.infura.io/'
var Eth3 = new Web3(new Web3.providers.HttpProvider(ethUrl))

app.get("/api/eth/:id", (req, res) => {
    const addrsETH = req.params.id
    const balance = Eth3.eth.getBalance(addrsETH) / 10 ** 18
    res.header("Access-Control-Allow-Origin", "*")
    res.json({ balance: balance })
})

app.get("/api/eth1/:id", (req, res) => {
    const addrsETH = req.params.id
    res.header("Access-Control-Allow-Origin", "*")
    res.json({ balance: response.data.final_balance / 10 ** 8 })


    axios.get(btcUrl + '/addrs/' + addrsETH + '/balance')
        .then(response => {
            //        console.log(response.data.url);
            //        console.log(response.data.explanation);
        })
        .catch(error => {
            console.log(error)
        })
})

const port = process.env.PORT_ETH || 8101

app.listen(port, () => {
    console.log(`eth_svc listening on ${port}`)
})