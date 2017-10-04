var nonparielCoin = artifacts.require("./nonparielCoin.sol");

contract('nonparielCoin', function(accounts) {
  it("should put 10000 nonparielCoin in the first account", function() {
    return nonparielCoin.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });
  });
  it("should call a function that depends on a linked library", function() {
    var nonpariel;
    var nonparielCoinBalance;
    var nonparielCoinEthBalance;

    return nonparielCoin.deployed().then(function(instance) {
      nonpariel = instance;
      return nonpariel.getBalance.call(accounts[0]);
    }).then(function(outCoinBalance) {
      nonparielCoinBalance = outCoinBalance.toNumber();
      return nonpariel.getBalanceInEth.call(accounts[0]);
    }).then(function(outCoinBalanceEth) {
      nonparielCoinEthBalance = outCoinBalanceEth.toNumber();
    }).then(function() {
      assert.equal(nonparielCoinEthBalance, 2 * nonparielCoinBalance, "Library function returned unexpected function, linkage may be broken");
    });
  });
  it("should send coin correctly", function() {
    var nonpariel;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return nonparielCoin.deployed().then(function(instance) {
      nonpariel = instance;
      return nonpariel.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return nonpariel.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return nonpariel.sendCoin(account_two, amount, {from: account_one});
    }).then(function() {
      return nonpariel.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return nonpariel.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
});
