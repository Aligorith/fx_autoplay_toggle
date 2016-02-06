var buttons = require('sdk/ui/button/toggle');

var { get, set } = require("sdk/preferences/service");
var { when: unload } = require("sdk/system/unload");

var prop_name = "media.autoplay.enabled"
var old_value = get(prop_name);


// By AMO policy global preferences must be changed back to their original value
unload(function() {
  set(prop_name, old_value);
});


var button = buttons.ToggleButton({
  id: "toggle-autoplay",
  label: "Enable/Disable Autoplay",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onChange: function(state) {
  	set(prop_name, state.checked);
  }
});

