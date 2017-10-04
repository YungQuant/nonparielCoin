
var ProviderEngine = require("web3-provider-engine");
var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
var Web3 = require("web3");
var providerUrl = "https://mainnet.infura.io/0xaaLztXCv50EPJs4NRQ";
var engine = new ProviderEngine();
engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)));
engine.start(); // Required by the provider engine.

module.exports = {
  networks: {
    live: {
      //host: "https://mainnet.infura.io/0xaaLztXCv50EPJs4NRQ",
      //port: 80,
      network_id: '1', // Match any network id
      provider: engine,
      from: 0x99f33480a4f1e8c4f922da9957391f87d9969786
    }
  }
};
