# api/db_connection.py

import pymongo

# Correct MongoDB connection string
url = 'mongodb://localhost:27017/'
client = pymongo.MongoClient(url)
db = client['employeesystem']  # Database name

# Access the users collection
# person_collection is just an example; replace with actual collection name as needed
