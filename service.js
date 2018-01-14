 /*!
 * @title lmx_svc Limex API microservice
 * @author Oleg Tomin - <ot@limex.io>
 * @dev Basic implementaion of Limex API functions  
 * MIT Licensed Copyright(c) 2018-2019
 */

const express = require("express")
const app = express()
const axios = require('axios')  //  AXIOS - compact lib for HttpRequest
const urlEth = 'http://188.225.18.174:8080/'    //  JSON-RPC server Limex node
var Web3 = require("web3")
var Lmx3 = tokenContract = ''

var lmx = require("./token")    // address and ABI of Lime smartcontract in Limex
var dex = require("./contract") // address and ABI of DEX smartcontract in Limex

    //  Route - check connect to API provider
app.get("/lmx/api/:token", (req, res) => {
    Lmx3 = new Web3(new Web3.providers.HttpProvider(urlEth))
    const provider = Lmx3.currentProvider
    tokenContract = Lmx3.eth.contract(lmx.abi).at(lmx.adrress); //  Smart contract Token in Limex
    dExContract = Lmx3.eth.contract(dex.abi).at(dex.address); //  Smart contract Dex in Limex
    console.log('lmx: '+lmx.adrress +'  abi: ' + lmx.abi)
    Lmx3.eth.getGasPrice(function(error, result) {
        if (!error) {
            res.header("Access-Control-Allow-Origin", "*")
            res.json({error: false, host: provider.host, gasPrice: result})
            console.log('p: '+provider.host+'  gP' + result)
        }
        else {
            res.header("Access-Control-Allow-Origin", "*")
            res.json({error: true})
            console.log('Error! p: '+provider.host+' not connected!!!')
        }
    })
})

    //  Route - check balance
app.get("/lmx/balance/:addrs", (req, res) => {
        const addrsETH = req.params.addrs
        balance = tokenContract.balanceOf(addrsETH) / 10 ** 9;
        res.header("Access-Control-Allow-Origin", "*")
        res.json({ balance: balance })
    })

    //  Route - startDex function
app.get("/lmx/startDex/:data", (req, res) => {
        const addrsETH = req.params.addrs
        var accountFrom = addrsETHB;
        var privateKey = ethPrivateKeyB;
        var myCallData = dexContract.openDEx.getData(addrsETHA, addrsETHP, valueETH * 10 ** 18, valueBTC * 10 ** 8, valueLIME * 10 ** 9); // Data for Ethereum transaction call smart contract DEx
        var accountTo = DExAddrs;
        var countTx = Lime3.eth.getTransactionCount(accountFrom);
        var txParams = {
            nonce: countTx,
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            to: accountTo,
            value: value0,
            data: myCallData,
            // EIP 155 chainId - mainnet: 1, ropsten: 3, 1337 - private
            chainId: 1337
        }
        var tx = new EthJS.Tx(txParams);
        tx.sign(privateKey);
        var serializedTx = tx.serialize()
        Lime3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));
        res.header("Access-Control-Allow-Origin", "*")
        res.json({ balance: balance })
    })
        
const port = process.env.PORT_LMX || 8201

app.listen(port, () => {
    console.log(`Microservice lmx_svc listening on ${port}`)
})