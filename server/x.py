from flask import Flask
app = Flask(__name__)


@app.route('/')
def hello():
    return "Hello World!"


@app.route('/airPollution')
def air_pollution():
    return '22'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, threaded=True)

