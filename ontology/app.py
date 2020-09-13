import json
from flask import Flask, Response, request
from ontology import resolve

app = Flask(__name__)


@app.route('/get_privileges')
def get_privileges():
    params = request.args
    response = resolve(params)
    return Response(json.dumps(response), mimetype='application/json', status=200)


if __name__ == '__main__':
    app.run()
