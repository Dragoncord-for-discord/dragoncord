class BdApi {
	static alert(title, content) {
		alert(title, content);
	}
	static clearCSS(id) {
		const elem = document.getElementById(`bd-style-${id}`)
		if (elem) elem.remove()
	}
	static deleteData(pluginName, key) {
		// soon
	}
	static disableSetting(collection, category, id) {
		// soon
	}
	static enableSetting(collection, category, id) {
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
		const style = document.createElement('style');

		style.id = `bd-style-${id}`;
		style.innerHTML = css;
	
		document.head.append(style);
	}
	static linkJS(id, url) {
		return new Promise((resolve) => {
			const script = document.createElement('script');
	  
			script.id = `bd-script-${id}`;
			script.src = url;
			script.type = 'text/javascript';
			script.onload = resolve;
	  
			document.head.append(script);
		})
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
	static async showConfirmationModal(title, children, options = {}) {
		/*
		const { onConfirm = () => {}, onCancel = () => {}, confirmText = 'Okay', cancelText = 'Cancel', danger = false, key } = options
	
		const { openModal } = await getModule(['openModal', 'updateModal'])
		const Markdown = await getModule(m => m.displayName === 'Markdown' && m.rules)
		const ConfirmModal = await getModuleByDisplayName('ConfirmModal')
	
		if (!Array.isArray(children)) children = [ children ]
		children = children.map(c => typeof c == 'string' ? React.createElement(Markdown, null, c) : c)
		return openModal(props => React.createElement(ConfirmModal, {
		  header: title, red: danger, confirmText, cancelText, onConfirm, onCancel, ...props
		}, children), { modalKey: key })
		*/
	}
	static showToast(content, options = {}) {
		DragoncordAPI.showNotification(content);
	}
	static suppressErrors(method, message) {
		// soon
	}
	static testJSON (data) {
		try {
		  JSON.parse(data);
	
		  return true;
		} catch (err) {
		  return false;
		}
	}
	static toggleSetting(id) {
		// soon
	}
	static unlinkJS(id) {
		const elem = document.getElementById(`bd-script-${id}`);
		if (elem) elem.remove();
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