from flask import Flask
app = Flask(__name__)

@app.route('/')
def ontologies():
    return 'Ontologies application is ready to go!'
	
if __name__ == '__main__':
    app.run()