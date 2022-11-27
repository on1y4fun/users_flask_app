from datetime import datetime

from flask import Flask, render_template, request
from flask_alchemydumps import AlchemyDumps
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)
marsh = Marshmallow(app)
api = Api(app)
alchemydumps = AlchemyDumps(app, db)


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), unique=True, nullable=False)
    first_name = db.Column(db.String(32))
    last_name = db.Column(db.String(32))
    password = db.Column(db.String(48), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow().date())


with app.app_context():
    db.create_all()


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('base.html')


@app.route('/register/', methods=['GET'])
def register():
    return render_template('base.html')


@app.route('/login/', methods=['GET'])
def login():
    return render_template('base.html')


@app.route('/edit/', methods=['GET'])
def edit():
    return render_template('base.html')


class UserSchema(marsh.SQLAlchemyAutoSchema):
    class Meta:
        model = Users


user_schema = UserSchema()
users_schema = UserSchema(many=True)


class UsersListResource(Resource):
    def get(self):
        users = Users.query.all()
        return users_schema.dump(users)

    def post(self):
        new_user = Users(
            first_name=request.json['first_name'],
            last_name=request.json['last_name'],
            username=request.json['username'],
            password=request.json['password'],
        )
        db.session.add(new_user)
        db.session.commit()
        return user_schema.dump(new_user)


class UserResource(Resource):
    def get(self, user_id):
        user = Users.query.get_or_404(user_id)
        return user_schema.dump(user)

    def patch(self, user_id):
        user = Users.query.get_or_404(user_id)
        if 'first_name' in request.json:
            user.first_name = request.json['first_name']
        if 'last_name' in request.json:
            user.last_name = request.json['last_name']
        if 'username' in request.json:
            user.username = request.json['username']
        db.session.commit()
        return user_schema.dump(user)


api.add_resource(UsersListResource, '/api/users/')
api.add_resource(UserResource, '/api/users/<int:user_id>/')
