const accounts = [
  { id: 1, owner: "Alice", balance: 500 },
  { id: 2, owner: "Bob", balance: 300 },
];

function getAccountById(id) {
  for (const account of accounts) {
    // if (!Number.isFinite(id) || id <= 0 || !Number.isInteger(id)) {
    //   //checks if the value entered is a number greater than 0
    //   throw new Error(
    //     "The account number must be a whole number greater than 0."
    //   );
    // }
    if (account.id === id) {
      return account;
    }
  }
}

function createAccount(newAccountId, newAccountOwner) {
  const newAccountNum = getAccountById(newAccountId); //checks if number entered equals any of the current members
  if (newAccountNum) {
    throw new Error("That account number already exists, try again!");
  }

  if (
    !Number.isFinite(newAccountId) ||
    newAccountId <= 0 ||
    !Number.isInteger(newAccountId)
  ) {
    throw new Error(
      "The account number must be a whole number greater than 0."
    );
  }

  if (newAccountOwner !== String || newAccountOwner == "") {
    throw new Error("Account owner must not be empty!");
  }
  accounts.push({
    id: newAccountId,
    owner: newAccountOwner,
    balance: "0",
  });
}

function depositMoney(accountId, amount) {
  const account = getAccountById(accountId);

  if (!account) {
    throw new Error("Account not found");
  }
  if (!Number.isFinite(amount) || amount <= 0 || !Number.isInteger(amount)) {
    throw new Error(
      "Invalid value for deposit amount: The amount must be a positive finite number."
    );
  }
  account.balance += amount;
}

function withdrawMoney(accountId, amount) {
  const account = getAccountById(accountId);

  if (!account) {
    throw new Error("Account not found.");
  }

  if (amount > account.balance) {
    throw new Error(
      `"Insufficient funds to withdraw $${amount}. Please try a lesser amount.`
    );
  }
  if (!Number.isFinite(amount) || amount <= 0 || !Number.isInteger(amount)) {
    throw new Error(
      "Invalid value for withdrawal amount: The amount must be a positive finite number."
    );
  }

  account.balance -= amount;
}

function transferMoney(fromAccountId, toAccountId, amount) {
  const fromAccount = getAccountById(fromAccountId);
  const toAccount = getAccountById(toAccountId);

  if (!fromAccount) {
    throw new Error("Source account not found.");
  }
  if (!toAccount) {
    throw new Error("To account not found.");
  }

  if (amount > fromAccount.balance) {
    throw new Error(
      `"Insufficient funds to transfer $${amount}. Please try a lesser amount.`
    );
  }
  if (!Number.isFinite(amount) || amount <= 0 || !Number.isInteger(amount)) {
    throw new Error(
      "Invalid value for transfer amount: The amount must be a positive finite number."
    );
  }
  fromAccount.balance -= amount;
  toAccount.balance += amount;
}

/*
Hints:

getAccountById("1");

createAccount(1, "Alice");
createAccount("3", "Charlie");
createAccount(-3, "Charlie");
createAccount(3, ["Charlie"]);
createAccount(3, "");
createAccount(3, "  ");

depositMoney(1, "300")
depositMoney(1, -300)
depositMoney(1, 0)
depositMoney(1, Infinity)
depositMoney(4, 100)

withdrawMoney(1, -100)
withdrawMoney(1, 0)
withdrawMoney(1, 501)

transferMoney(1, 4, 100)
transferMoney(1, 2, 501);
transferMoney(1, 2, 100);
*/
