const fs = require("fs");

fs.readdir('./dcord_node_plugins', function (err, files) {
  if (err) {
    console.log('[Error] Unable to scan directory: ' + err);
  }
  else {
    if (!files.length) { console.log('[Node Plugin] Folder is empty'); }
    else {
      files.forEach(function (file) {
        const pluginsToLoad = fs.readFileSync('../../dcord_node_plugins/' + file + '/' + 'main.js').toString();
        require('../../dcord_node_plugins/' + file + '/' + 'main.js');
        console.log('[Node Plugin] Loaded: ' + file);
      });
    }
  }
});