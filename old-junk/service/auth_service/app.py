from flask import Flask, request, jsonify
from src.config import Config
from src.database import db
from src.models import User
from flask_bcrypt import Bcrypt
import jwt
import datetime

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
bcrypt = Bcrypt(app)

# NOTE: The db.create_all() line has been REMOVED.
# We now trust that the 'nodejs_backend' service manages the database schema with Prisma.

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email and password are required"}), 400

    # This query now assumes the 'users' table exists.
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(
        email=data['email'],
        password_hash=hashed_password,
        first_name=data.get('first_name'),
        last_name=data.get('last_name')
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully", "user_id": new_user.id}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email and password are required"}), 400

    user = User.query.filter_by(email=data['email']).first()

    if not user or not bcrypt.check_password_hash(user.password_hash, data['password']):
        return jsonify({"message": "Invalid credentials"}), 401

    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, app.config['JWT_SECRET_KEY'], algorithm="HS256")

    return jsonify({"message": "Login successful", "token": token}), 200

@app.route('/', methods=['GET'])
def health_check():
    return "Auth Service is running."

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
