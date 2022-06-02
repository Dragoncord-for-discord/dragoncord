class DragoncordAPIfixed {
	static injectCSS(styleString) {
		const style = document.createElement('style');
		style.textContent = styleString;
		document.head.append(style);
	}

	static showNotification(html, removeAfter = 6000) {
		let notification = document.createElement('div');
		notification.className = "notification";

		notification.style.top = 50 + 'px';
		notification.style.right = 10 + 'px';

		notification.innerHTML = "<div class='notification-content'>" + html + "</div>";
		document.body.append(notification);

		setTimeout(() => notification.remove(), removeAfter);
    }
}

DragoncordAPI.showNotification("Dragoncord API loaded!");