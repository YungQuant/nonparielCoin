pragma solidity 0.4.17;

contract ERC20 {
  uint public totalSupply;
  function balanceOf(address who) constant returns (uint);
  function transfer(address to, uint value) returns (bool ok);
  function transferFrom(address from, address to, uint value) returns (bool ok);
  function mint(address to, uint256 value) returns (uint256);
}


contract Sale {

    uint public exchangeRate;
    bool public isFunding;
    ERC20 public Token;
    address public ETHWallet;

    bool private configSet;
    address public creator;

    event Contribution(address from, uint256 amount);

    function Sale() {
        ETHWallet =  0x99F33480A4f1E8C4f922Da9957391f87D9969786;
        isFunding = true;
        creator = msg.sender;
        exchangeRate = 0.5 ether;
    }

    // setup function to be ran only 1 time
    // setup token address
    function setup(address TOKEN) external {
        require(!configSet);
        Token = ERC20(TOKEN);
        configSet = true;
    }

    function closeSale() external {
      require(msg.sender==creator);
      isFunding = false;
    }

    // CONTRIBUTE FUNCTION
    // converts ETH to TOKEN and sends new TOKEN to the sender
    function () external payable {
        require(configSet);
        require(isFunding);
        require(msg.value>0);
        uint256 amount = msg.value / exchangeRate;
        ETHWallet.transfer(msg.value);
        Token.mint(msg.sender, amount);
        Contribution(msg.sender, amount);
    }

    // update the ETH/COIN rate
    function updateRate(uint256 rate) external {
        require(msg.sender==creator);
        require(isFunding);
        exchangeRate = rate;
    }


}
