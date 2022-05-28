document.querySelector("input[name=\"search\"]").addEventListener("input", (e) => {
  [...document.querySelectorAll("p[class=\"setting\"]")].forEach(item => {
	if (item.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
		console.debug("%c [Dynamic Search] Show: " + item.textContent, 'color: #4bed42');
		item.style.display = "block";
	}
	else {
		console.debug("%c [Dynamic Search] Hide: " + item.textContent, 'color: #ed4245');
		item.style.display = "none";
	}
  });
});