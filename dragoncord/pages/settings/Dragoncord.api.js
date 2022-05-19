class DragoncordAPI {
	static injectCSS(styleString) {
		const style = document.createElement('style');
		style.textContent = styleString;
		document.head.append(style);
	}
	static setSplashTipTitle(tipTitleString) {
		const style = document.createElement('style');
		style.textContent = ".tipTitle-3FYEQp{visibility: hidden;} .tipTitle-3FYEQp:before{visibility: visible;content:'" + tipTitleString + "'}";
		document.head.append(style);
	}

	static setSplashTip(tipString) {
		const style = document.createElement('style');
		style.textContent = ".tip-1AwED_{visibility: hidden;} .tip-1AwED_:before{visibility: visible;content:'" + tipString + "'}";
		document.head.append(style);
	}

	static showNotification(html, removeAfter = 6000) {
		let notification = document.createElement('div');
		notification.className = "notification";

		notification.style.top = 50 + 'px';
		notification.style.right = 10 + 'px';

		notification.innerHTML = html;
		document.body.append(notification);

		setTimeout(() => notification.remove(), removeAfter);
    }
}

DragoncordAPI.injectCSS(".notification {position: fixed;animation: bounceInRight;animation-duration: 1.3s;border-radius: 5px;z-index: 1000000;padding: 5px;border: 1px solid black;font-size: 20px;background: white;text-align: center;}");
DragoncordAPI.showNotification("Dragoncord API loaded!");