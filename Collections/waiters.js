Waiters = new Mongo.Collection('waiter');

Meteor.methods({
  insertWaiters: function(waiter){
    newWaiter = Waiters.insert({name: waiter.name, email: waiter.email, shares: 0, createAt: Date.now()}, function(error, result){});
    return newWaiter;
  },
  newWaiterShare: function(waiter){
    var waiter = Waiters.update({_id:waiter._id}, {$inc:{shares:1}});
    console.log(waiter);
    return waiter;
  },
  findWaitersById: function(waiter){
    console.log(waiter);
    var waiterFound = Waiters.findOne({_id:waiter._id});
    console.log(waiterFound);
    return waiterFound;
  }
})
