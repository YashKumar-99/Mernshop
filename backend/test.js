console.log('heelo');


const state={account:{amount:1},bonus:{points:2}};

const newState={account:{amount:state.account.amount} , bonus:{points:state.bonus.points +1}}
state.account.amount=100;

console.log(state,"ff")
console.log(newState,"bb")