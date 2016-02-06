var { ToggleButton } = require('sdk/ui/button/toggle');
var windows = require("sdk/windows").browserWindows;

var { get: get_pref, set: set_pref } = require("sdk/preferences/service");
var { when: unload } = require("sdk/system/unload");

var prop_name = "media.autoplay.enabled"
var old_value = get_pref(prop_name);

/* State: Autoplay Enabled */
const AutoplayEnabledState = {
  checked: true,
  label: "Autoplay Enabled. Click to disable",
  icon: {
  	"16" : "./enabled-16.png",
  	"32" : "./enabled-32.png",
  	"64" : "./enabled-64.png"
  }
}

/* State: Autoplay Disabled */
const AutoplayDisabledState = {
  checked: false,
  label: "Autoplay Disabled. Click to enable",
  icon : {
  	"16" : "./disabled-16.png",
  	"32" : "./disabled-32.png",
  	"64" : "./disabled-64.png"
  }
}

/* Button Definition - Used for creating each new button instance on new windows */
var button = ToggleButton({
  id: "toggle-autoplay",
  
  /* Set initial state - This depends on the pre-addon state, and is needed to ensure the first window works.
   * These values MUSt be set, so we set them from the defaults
   */
  checked: old_value,
  label:  (old_value) ? AutoplayEnabledState.label : AutoplayDisabledState.label,
  icon:   (old_value) ? AutoplayEnabledState.icon : AutoplayDisabledState.icon,
  
  /* Invert the state when clicked - This is global, shared state... */
  onClick: function(state) {
  	if (get_pref(prop_name)) {
  		button.state(button, AutoplayDisabledState);
  		set_pref(prop_name, false);
  	}
  	else {
  		button.state(button, AutoplayEnabledState);
  		set_pref(prop_name, true);
  	}
  }
});


/* Newly created windows will create local button state,
 * so we need to force the button to use the correct global
 * state
 */
windows.on("open", function(window) {
	if (get_pref(prop_name)) {
		button.state(button, AutoplayEnabledState)
	}
	else {
		button.state(button, AutoplayDisabledState)	
	}
})


/* By AMO policy global preferences must be changed back to their original value */
unload(function() {
  set_pref(prop_name, old_value);
});

