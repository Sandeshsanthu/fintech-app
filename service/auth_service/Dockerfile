version: '3.8'

services:
  gateway:
    image: nginx:latest
    container_name: api_gateway
    ports:
      - "80:80"
    volumes:
      - ./gateway/nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - auth_service
      - user_service
      - payment_service

  auth_service:
    build: ./services/auth_service
    container_name: auth_service
    env_file:
      - .env # <-- Add this to load our .env file
    depends_on:
      - identity_db # <-- Make it wait for the DB
    expose:
      - "5001"

  identity_db: # <-- New database service
    image: postgres:13
    container_name: identity_db
    env_file:
      - .env # <-- Use the same .env file for credentials
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data/

  user_service:
    build: ./services/user_service
    container_name: user_service
    expose:
      - "5002"

  payment_service:
    build: ./services/payment_service
    container_name: payment_service
    expose:
      - "5003"

volumes: # <-- Define a volume to persist DB data
  postgres_data:
