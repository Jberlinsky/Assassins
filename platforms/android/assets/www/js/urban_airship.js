var PushNotifications = {
  enabled: false,

  initialize: function(game_id) {

    // Callback for when a device has registered with Urban Airship.
    this.setEventListeners();
    this.tagAsGame(game_id);

    // Check if push is enabled
    this.verifyEnabled();
  },

  verifyEnabled: function() {
    PushNotification.isPushEnabled(function(enabled) {
      if (enabled) { this.enabled = true; }
      else { PushNotification.enablePush(); PushNotification.enableLocation(); PushNotification.enableBackgroundLocation(); alert("Registered"); }
    });
  },

  tagAsGame: function(game_id) {
    // Set tags on a device that you can push to
    // http://docs.urbanairship.com/connect/connect_audience.html#tags
    PushNotification.setTags([game_id], function () { });
  },

  setEventListeners: function() {
    // Register for any urban airship events
    PushNotification.registerEvent('registration', this.handleRegistered);
    document.addEventListener("urbanairship.registration", this.handleRegistered, false)
    document.addEventListener("urbanairship.push", this.handleIncomingPush, false)
  },

  setAlias: function(alias_name) {
    PushNotification.setAlias(alias_name)
  },

  handleIncomingPush: function(event) {
    console.log("Incoming ush: " + event.message);
  },

  handleRegistered: function(error, id) {
    if (event.error) {
      console.log('there was an error registering for push notifications');
    } else {
      console.log("Registered with ID: " + id);
    }
  }
};
