chat = new Mongo.Collection("chat");

if (Meteor.isClient) {

  Template.body.helpers({
    chat: function() {
      return chat.find({}, {
        sort: {
          time: -1
        }
      });
    },
  });

  Template.msg.helpers({
    isCurrentUser: function() {
      return this.username == Meteor.user().username;
    }
  });
  Template.send.events({
    'keydown .msg-input': function(event, template) {

      if (event.which != 13) {
        return;
      }

      var username = Meteor.user().username;
      var msg = $('.msg-input').val();
      if (msg != '') {
        chat.insert({
          username: username,
          msg: msg,
          time: new Date().toLocaleString()
        });
        $('.msg-input').val('');
      }
    }
  });


  // Template.body.events();
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}
