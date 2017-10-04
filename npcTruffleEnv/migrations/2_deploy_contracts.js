var nonparielCoin = artifacts.require("./nonparielCoin.sol")

module.exports = function(deployer, network, accounts) {
    //const startBlock = web3.eth.blockNumber + 2 // blockchain block number where the crowdsale will commence. Here I just taking the current block that the contract and setting that the crowdsale starts two block after
    //const endBlock = startBlock + 600  // blockchain block number where it will end. 300 is little over an hour.
    //const rate = new web3.BigNumber(500000000000000000) // rate of ether to Nonpariel Coin in wei
    //const wallet = 0x99f33480a4f1e8c4f922da9957391f87d9969786 // the address that will hold the fund. Recommended to use a multisig one for security.

    deployer.deploy(nonparielCoin)
}
