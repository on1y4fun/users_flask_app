from flask import Flask, render_template, request, redirect, jsonify, url_for
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), unique=True, nullable=False)
    first_name = db.Column(db.String(32))
    last_name = db.Column(db.String(32))
    password = db.Column(db.String(48), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)


with app.app_context():
    db.create_all()

@app.route('/')
def index():
    if request.method == 'POST':
        pass
    else:
        users = Users.query.order_by(Users.date_created).all()
        return render_template('users/index.html', users=users)

@app.route('/register/', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        print(dir(request.form))
        pass

@app.route('/login/', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return ('', 200)
    else:
        username = request.form['username']
        password = request.form['password']
        if not (username or password):
            return 'Required field'
        user = Users.query.filter_by(username=username).first()
        if not user:
            return 'No such user'
        if password != user.password:
            return 'Wrong password'
        return redirect(url_for('.users', id=user.id))
        

@app.route('/users/<int:id>')
def users(id):
    user = Users.query.get_or_404(id)
    if user:
        return {
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "date_created": user.date_created
        }

