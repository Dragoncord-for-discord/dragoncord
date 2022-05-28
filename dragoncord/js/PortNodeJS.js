// PortNodeJS - Project to port plugins from
// Powercord, BetterDiscord to Dragoncord.
// Made on JS (Ported some features from NodeJS).

function require(module) {
	console.log('[PortNodeJS] Module to load: ' + module);

	// Powercord
	if (module == "powercord/injector") {
		function inject() {
			console.log("[powercord/injector] [inject]" + arguments)
		}
		function uninject() {
			console.log("[powercord/injector] [uninject]" + arguments)
		}
	}
	if (module == "powercord/webpack") {
		function getModule() {
			console.log("[powercord/webpack] [getModule]" + arguments)
		}
	}
}