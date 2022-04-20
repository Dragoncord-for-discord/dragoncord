let invisibleTyping = document.querySelector('input[name=invisibleTyping]');
invisibleTyping.addEventListener('change', function(event){
  if (this.checked = true) {
  	console.log("CHECKED");
  }

  if(this.checked = false) {
  	console.log("UNCHECKED");
  }
});