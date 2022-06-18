class BdApi {
	static alert(title, content) {
		// soon
	}
	static clearCSS(id) {
		// soon
	}
	static deleteData(pluginName, key) {
		// soon
	}
	static disableSetting([collection,] category, id) {
		// soon
	}
	static enableSetting([collection,] category, id) {
		// soon
	}
	static findModule(filter) {
		// soon
	}
	static findAllModules(filter) {
		// soon
	}
	static findModuleByProps(...props) {
		// soon
	}
	static findModuleByPrototypes(...protos) {
		// soon
	}
	static findModuleByDisplayName(name) {
		// soon
	}
	static getCore() {
		// soon
	}
	static getData(pluginName, key) {
		// soon
	}
	static getInternalInstance(node) {
		// soon
	}
	static getPlugin(name) {
		// soon
	}
	static injectCSS(id, css) {
		DragoncordAPI.injectCSS(css);
	}
	static linkJS(id, url) {
		// soon
	}
	static loadData(pluginName, key) {
		// soon
	}
	static monkeyPatch(module, methodName, options) {
		// soon
	}
	static onRemoved(node, callback) {
		// soon
	}
	static saveData(pluginName, key, data) {
		// soon
	}
	static setData(pluginName, key, data) {
		// soon
	}
	static showConfirmationModal(title, content, options = {}) {
		// soon
	}
	static showToast(content, options = {}) {
		DragoncordAPI.showNotification(content);
	}
	static suppressErrors(method, message) {
		// soon
	}
	static testJSON(data) {
		// soon
	}
	static toggleSetting(id) {
		// soon
	}
	static unlinkJS(id) {
		// soon
	}
}

class AddonAPI extends BdApi {
	static isEnabled(name) {
		// soon
	}
	static enable(name) {
		// soon
	}
	static disable(name) {
		// soon
	}
	static toggle(name) {
		// soon
	}
	static get(name) {
		// soon
	}
	static getAll(name) {
		// soon
	}
}