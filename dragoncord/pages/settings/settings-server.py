from flask import Flask
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
@app.route('/api')
@app.route('/api/get')
async def invalid_request():
	return 'Invalid request', 400

@app.route('/api/get/plugins', methods=['GET'])
async def plugins_list():
	pluginsListDir = os.walk("../../../plugins")
	pluginsListDirResp = [x[0] for x in os.walk(pluginsListDir)]
	print(pluginsListDirResp)

@app.route('/api/dragoncord/update', methods=['GET'])
async def updater_update():
	os.system('git reset --hard')
	os.system('cd .. & cd .. & cd .. & git reset --hard')
	return "Updated", 200

app.run(port = 8723)
