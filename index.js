const express = require("express");
const app = express();
const Web3EthContract = require("web3-eth-contract");
Web3EthContract.setProvider(
  "https://sepolia.etherscan.io/address/0xa011799d9467d2b33768fb1a3512f1b468b87e96"
);


const abi = require("./abi.json");

const axios = require("axios");

app.get("/citizens", async function (req, res) {
  const response = await axios.get(
    `https://securrency-test.kate-sunday.workers.dev/`
  );

  res.set("Access-Control-Allow-Origin", "*");
  return res.send(response.data);
});

app.get("/citizens-web3", async function (req, res) {
  const url_ropsten = "https://sepolia.etherscan.io/address/0xa011799d9467d2b33768fb1a3512f1b468b87e96";


  const contract = new Web3EthContract(
    abi,
    "0xA011799d9467D2b33768Fb1a3512f1b468B87E96"
  );

  let note = await contract.methods.getNoteByCitizenId(1).call();
  console.log("contract.methods.Citizen: ", note);

});

const server = app.listen(8081, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
