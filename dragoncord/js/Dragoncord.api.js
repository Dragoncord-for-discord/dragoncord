class DragoncordAPI {
	static injectCSS(styleString) {
		const style = document.createElement('style');
		style.textContent = styleString;
		document.head.append(style);
	}
}