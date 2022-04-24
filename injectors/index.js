const { join, sep } = require('path');
const { mkdir, writeFile } = require('fs').promises;
const { existsSync } = require('fs');
const {spawn} = require('child_process');

function errorPlug(err) {
	console.log('\x1b[31m', 'Dragoncord plug failed!', '\n');
	console.log('\x1b[0m');
	console.log('It seems like your platform is not supported yet.');
	console.log('Try run plug scripts manually', '\n');
	console.log('Your platform: ' + process.platform);
	console.log('Error: ' + err);
}
function sucessPlug() {
	console.log('\x1b[32m', 'Dragoncord sucessfully plugged! :D', '\n');
	console.log('\x1b[0m');
	console.log('Now, close your discord, and run again');
	console.log('And have fun! :D');
}

let platformModule;
if (process.argv[2] === 'plug') {
	try {
		var injector = spawn(process.platform + '.bat', {stdio: "inherit"});
		injector.on('data', function(data){
		    process.stdout.write(data);
		});
		injector.on('close', function(code) {
	        if ( code === -4058 ){
	            errorPlug(code);
	        }
	        else {
	        	sucessPlug();
	        }
    	});
	} catch (err) {
		errorPlug(err);
	}
}
else {
	console.log("Unknown argument: " + process.argv[2]);
}