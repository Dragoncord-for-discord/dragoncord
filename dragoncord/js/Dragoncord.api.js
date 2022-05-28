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
}

window.onerror = function renderError(msg, url, lineNo, columnNo, error) {
	if (msg == "ResizeObserver loop limit exceeded") {
		console.log("[onerror] Uncritical error skipped")
	}
	else {
		console.error("Error occured!\nMessage: " + msg + "\nURL: " + url + "\nError line number: " + lineNo + "\nError column number" + columnNo + "\nError" + error);
		DragoncordAPI.showNotification("<h1>Error occured</h1><br><div class='error-message'><h1>Message</h1>" + msg + "<br><h1>URL</h1>" + url + "<br><h1>Error line number</h1>" + lineNo + "<br><h1>Error column number</h1>" + columnNo + "<br><h1>Error</h1>" + error + "</div>", 10000);
	}
}

DragoncordAPI.injectCSS(".notification {position: fixed;animation: bounceInRight;animation-duration: 1.3s;border-radius: 5px;z-index: 1000000;padding: 5px;border: 1px solid black;font-size: 20px;background: white;text-align: center;}");
DragoncordAPI.injectCSS(".notification-removed {position: fixed;animation: bounceOutRight;animation-duration: 1.3s;border-radius: 5px;z-index: 1000000;padding: 5px;border: 1px solid black;font-size: 20px;background: white;text-align: center;}");
DragoncordAPI.showNotification("Dragoncord API loaded!");