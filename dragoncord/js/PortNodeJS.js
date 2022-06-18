// PortNodeJS - Project to port plugins from
// Powercord, BetterDiscord to Dragoncord.
// Made on JS (Ported some features from NodeJS).

var exports = {};
console.log("[PortNodeJS] module.exports injected")

function require(moduleName) {
	console.log('[PortNodeJS] Module to load: ' + moduleName);

	// Powercord
	if (moduleName.startsWith("powercord") == true) {
		console.log("[PortNodeJS] Powercord API currently not supported");
		console.log("[PortNodeJS] Error occured while loading " + moduleName);
		console.log("[PortNodeJS] This module made for Powercord. Powercord API currently not supported");
	}
}