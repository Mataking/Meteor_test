/*import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';*/

Meteor.subscribe('waiters');

Template.home.helpers({
		alreadyWaiter: function(){
		if(Session.get("waiterID")){
			var currentUser = Waiters.findOne({_id: Session.get("waiterID")});
			if(currentUser){
				return {_id: currentUser._id, name: currentUser.name, shares: currentUser.shares, position: 0};
			}
		}else{
			return null;
		}
	}
});

Template.waiters.helpers({
	waiters: function(){
		return Waiters.find({}, {sort: {shares: -1, createAt: 1}, limit: 10});
	}
});

Template.formulaire.events({
	'click .btn': function(event){
		event.preventDefault();

		var name = $('#name').val();
		var email = $('#email').val();

    Meteor.call('insertWaiters', {name: name, email: email}, function(error, result) {
      if(result){
				Session.setPersistent("waiterID", result);
				console.log(result);
			}
    });
	}
})
