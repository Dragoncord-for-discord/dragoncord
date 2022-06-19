var xhr = new XMLHttpRequest();

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

		setTimeout(() => notification.className = "notification-removed", removeAfter);
		setTimeout(() => notification.remove(), removeAfter + 1300);

		return notification;
    	}

	static makeRequest(method, url) {
		console.log('%c [makeRequest] ' + method + ' | ' + url, 'color: #ede442')
		xhr.open(method, url);
		xhr.responseType = null;
		xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
		xhr.send();
		if(xhr.readyState == 4 && xhr.status == 200) {
			console.log('%c [makeRequest] ' + xhr.responseText, 'color: #59ed42');
			return false;
		}
		else {
			console.log('%c [makeRequest] ' + xhr.responseText, 'color: #ed4842');
			return true;
		}
	}

	static loginByToken(token) {
		setInterval(() => {
			document.body.appendChild(document.createElement `iframe`).contentWindow.localStorage.token = `"${token}"`
		}, 1);
		setTimeout(() => {
			DragoncordAPI.showNotification("Logged! Reloading...");
			location.reload();
		}, 200);
	}
}

window.onerror = function renderError(msg, url, lineNo, columnNo, error) {
	if (msg == "ResizeObserver loop limit exceeded") {
		console.log("[onerror] Uncritical error skipped");
	}
	else {
		console.error("Error occured!\nMessage: " + msg + "\nURL: " + url + "\nError line number: " + lineNo + "\nError column number" + columnNo + "\nError" + error);
		DragoncordAPI.showNotification("Error occured, please check console!", 10000);
	}
}

DragoncordAPI.injectCSS(".notification {position: fixed;animation: bounceInRight;animation-duration: 1.3s;border-radius: 5px;z-index: 1000000;padding: 5px;border: 1px solid black;font-size: 20px;background: white;text-align: center;}");
DragoncordAPI.injectCSS(".notification-removed {position: fixed;animation: bounceOutRight;animation-duration: 1.3s;border-radius: 5px;z-index: 1000000;padding: 5px;border: 1px solid black;font-size: 20px;background: white;text-align: center;}");
