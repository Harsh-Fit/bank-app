'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

// SIMPLE ARRAY METHODS

/// SLICE & SPLICE works in similar ways but there's a fundamental difference  -

// SLICE = Does not mutates the original array.

// let arr = ['a', 'b', 'c', 'd', 'e'];

// console.log(arr);
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -2));
// console.log(arr);

// SPLICE = Mutates the original array.

// console.log(arr.splice(4));
// console.log(arr);
// console.log(arr.splice(-1));
// console.log(arr);
// console.log(arr.splice(0, 1));
/// When you want to delete / splice the element at index 0 you should take zero & one new element (0, 1)
// console.log(arr);

// REVERSE = Mutates the original array.
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr.reverse());

// CONCAT = Join 2 Arrays = Create new array

// arr = ['a', 'b', 'c', 'd', 'e'];
// const newArr = arr.concat(arr2);
// console.log(newArr);
// console.log([...arr, ...arr2]);

// JOIN = Returns a string from an Array

// console.log(newArr.join(' _ '));

// AT Method = To check the elements at particular index.

// const arrA = [10, 20, 30, 40, 50, 60, 70, 80, 90];
// console.log(arrA[3]);
// console.log(arrA.at(3));
// console.log(arrA.at(6));
// console.log(arrA.at(7));

// Getting last array element
// console.log(arrA[arrA.length - 1]);
// console.log(arrA.slice(-1)[0]);
// console.log(arrA.at(-1));

// console.log('HARSH'.at(0));
// console.log('HARSH'.at(2));

// FOREACH = Just for looping over array ( No Return )

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1} : You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}:You withdraw ${Math.abs(movement)}`);
//   }
// }

// FOR OF LOOP - First value is index and then parameter.

// console.log('++ ----- { FOREACH } ----- ++');

// movements.forEach(function (mov, i, array) {
//   if (mov > 0) {
//     console.log(`MOVEMENT ${i + 1} : You deposited ${mov}`);
//   } else {
//     console.log(`MOVEMENT ${i + 1} : You withdraw ${Math.abs(mov)}`);
//   }
// });

// FOREACH looping Method - First element is parameter , second element is index and third is array. For each loop we cannot use BREAK and CONTINUE looping methods.

// FOREACH : MAP / SET

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// MAP
// currencies.forEach(function (value, key, map) {
//   console.log(`${key} : ${value}`);
// });

// SET
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value}:${_}`);
// });

// FOREACH Method on SET there are no index numbers and array they only consist values as parameter.

// PROJECT = BANKIST

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movz = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movz.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(mov => mov[0])
      .join('');
  });
};
createUsernames(accounts);
console.log(accounts);

const updateUI = function (acc) {
  // Display Movements

  displayMovements(acc.movements);

  // Display Balance

  calcDisplayBalance(acc);

  // Display Summary

  calcDisplaySummary(acc);
};

const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, mov, i, arr) => acc + mov, 0);
  acc.balance = balance;
  labelBalance.textContent = `${balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int, i, arr) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// IMPLEMENTING LOGIN

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form from submitting

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Welcome Message
    labelWelcome.textContent = `Welcome back : ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // CLEAR Input Fields -
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // UPDATE UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
  }

  // UPDATE UI
  updateUI(currentAccount);

  inputTransferAmount.value = inputTransferTo.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
  }
  containerApp.style.opacity = 0;

  inputClosePin.value = inputCloseUsername.value = '';
});

// EQUALITY =
console.log(movements.some(mov => mov > 0));
console.log(movements.some(mov => mov > 5000));
console.log(account4.movements.every(mov => mov > 0));
console.log(movements.every(mov => mov > -5));

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov <= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // UPDATE UI
    updateUI(currentAccount);

    inputLoanAmount.value = '';
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// MAX VALUE = Reduce Method --------------
// console.log(movements);
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);
// console.log(max);
// const min = movements.reduce((acc, mov) => {
//   if (acc < mov) return acc;
//   else return mov;
// }, movements[0]);
// console.log(min);

//------------------------------------------

// const user = 'Harsh Rajesh Pawar'; // hrp
// const username = user
//   .toLowerCase()
//   .split(' ')
//   .map(mov => mov[0])
//   .join('');
// console.log(username);

//// CODING CHALLENGE = 1

// TEST DATA - 1
// Juila's Data = [3, 5, 2, 12, 7]
// Kate's Data = [4, 1, 15, 8, 3]

// TEST DATA - 2
// Juila's Data = [9, 16, 6, 8, 3]
// Kate's Data = [10, 5, 6, 1, 4]

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);
//   const dogs = dogsJuliaCorrected.concat(dogsKate);
//   console.log(dogs);

//   dogs.forEach(function (dog, i) {
//     if (dog >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is a puppy`);
//     }
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

//// DATA TRANSFORMATION = MAP / FILTER / REDUCE
// Notes from video =

//// MAP METHOD =

// const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return Math.trunc(mov * eurToUsd);
// });

// console.log(movements);
// console.log(movementsUSD);

// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(Math.trunc(mov * eurToUsd));
// console.log(movementsUSDfor);

// // ARROW FUNCTION =
// const movementsUsdArr = movements.map(mov => Math.trunc(mov * eurToUsd));
// console.log(movementsUsdArr);

// const movementDescription = movements.map(
//   (mov, i, arr) =>
//     `Movement ${i + 1} : You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );

// console.log(movementDescription);

//// FILTER METHOD

// const deposits = movements.filter(mov => mov > 0);
// console.log(deposits);

// const depositFor = [];
// for (const mov of movements) {
//   if (mov > 0) depositFor.push(mov);
// }
// console.log(depositFor);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

//// REDUCE METHOD

// const balance = movements.reduce(function (acc, curr, i, arr) {
//   console.log(`Iteration ${i} : ${acc}`);
//   return acc + curr;
// }, 0);

// console.log(balance);

// let balance2 = 200;
// for (const mov of movements) balance2 = balance2 + mov;
// console.log(balance2);

//// ARROW FUN = Reduce Method

// const balance3 = movements.reduce((acc, curr, i, arr) => {
//   console.log(`Iteration ${i} : ${acc}`);
//   return acc + curr;
// }, 0);

// console.log(balance3);

//// CODING CHALLENGE = 2

// TEST DATA - 1
// [5, 2, 4, 1, 15, 8, 3];

// TEST DATA - 2
// [16, 6, 10, 5, 6, 1, 4];

// const calcAvgHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter(age => age >= 18);
//   console.log(humanAges);
//   console.log(adults);
//   const avg = adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//   console.log(avg);
// };
// calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAvgHumanAge([16, 6, 10, 5, 6, 1, 4]);

//// CODING CHALLENGE = 3

// TEST DATA - 1
// [5, 2, 4, 1, 15, 8, 3];

// TEST DATA - 2
// [16, 6, 10, 5, 6, 1, 4];

// const calcAvgHumanAge = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// console.log(calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAvgHumanAge([16, 6, 10, 5, 6, 1, 4]));

//// MAGIC OF CHAINING METHODS

// const eurToUsd = 1.1;
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov, i, arr) => acc + mov, 0);
// console.log(totalDepositsUSD);

// const totalWithdrawalUSD = movements
//   .filter(mov => mov < 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov, i, arr) => acc + mov, 0);
// console.log(totalWithdrawalUSD);
// console.log(Math.abs(totalWithdrawalUSD));

//// FIND METHOD -

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');

console.log(account);

// FLAT & FLATMAP =

const arr = [[1, 2, 3, 4], [5, 6, 7, 8], 9, 10];
console.log(arr.flat());

const arr2 = [
  [1, 2, [3]],
  [4, 5, 6, [7, 8]],
];
console.log(arr2.flat());
console.log(arr2.flat(2));

const overallBalance = accounts.map(acc => acc.movements);
console.log(overallBalance);
console.log(overallBalance.flat());
console.log(overallBalance.flat().reduce((acc, mov) => acc + mov, 0));

const overallBalance2 = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

// FLATMAP - Goes only one level deep

const overallBalance3 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

// SORTING ARRAYS

const owners = ['Jonas', 'Martha', 'Harsh', 'Zack', 'Adam'];

console.log(owners.sort());

console.log(movements);
console.log(movements.sort());

// RETURN < 0 A,B ( Keep Order )
// RETURN > 0 B,A (Switch Order)

movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
console.log(movements);

movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});
console.log(movements);

console.log(movements.sort((a, b) => a - b));
console.log(movements.sort((a, b) => b - a));

// Array = FILL & FROM

// Array.from

const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});

// ARRAY METHODS PRACTICE
