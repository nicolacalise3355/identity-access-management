import os
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb://nicola:password@localhost:27017/?authSource=admin"
DB_NAME = "iam-db"

class Database:
    client: AsyncIOMotorClient = None
    db = None

db_instance = Database()

async def connect_to_mongo():
    db_instance.client = AsyncIOMotorClient(
        MONGO_URI,
        minPoolSize=10,
        maxPoolSize=100
    )
    db_instance.db = db_instance.client[DB_NAME]
    print("✅ Connected to MongoDB!")

async def close_mongo_connection():
    if db_instance.client:
        db_instance.client.close()
        print(" closed db connection.")

async def get_db():
    return db_instance.db
