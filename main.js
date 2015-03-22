// main.js
// This script defines the State (where program is run)
// and runs the main loop.

var canvas;
var state = new State();

state.init();
state.draw();

function MainLoop() {
	state.update();
	state.draw();
	setTimeout(MainLoop, 33.33);
}
MainLoop();