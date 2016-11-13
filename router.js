Router.route('/', function () {
  this.render('home');
},{
  name: 'home'
});

Router.route('share/:_id', function(){
  var params = this.params;
  console.log(params._id);
  Meteor.call('findWaitersById', {_id: params._id}, function(error, result){
    if(result){
        var waiterShared = result;
    }
  });

  if(!Session.get("alreadyVisitor")){
    Meteor.call('newWaiterShare', {_id:params._id}, function(error, result){
       if(result){
      //   console.log(result);
       }
    })
  }

  Session.setPersistent("alreadyVisitor", true);

  return Router.go('home');
})
