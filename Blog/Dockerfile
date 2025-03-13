# Use the official MongoDB image as a base
FROM mongo:latest

# Set environment variables for MongoDB root user
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=password

# Optionally, copy a custom MongoDB configuration file
# (if you have custom settings, such as changing log levels, etc.)
# COPY mongod.conf /etc/mongod.conf

# Expose MongoDB default port
EXPOSE # Use the official MongoDB image as a base
FROM mongo:latest

# Set environment variables for MongoDB root user
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=password

# Optionally, copy a custom MongoDB configuration file
# (if you have custom settings, such as changing log levels, etc.)
# COPY mongod.conf /etc/mongod.conf

# Expose MongoDB default port
EXPOSE 27017

# Start MongoDB with the default configuration or use custom configuration
# Uncomment if you're using a custom config file
# CMD ["mongod", "-f", "/etc/mongod.conf"]

# Default MongoDB start command (with default settings)
CMD ["mongod"]


# Start MongoDB with the default configuration or use custom configuration
# Uncomment if you're using a custom config file
# CMD ["mongod", "-f", "/etc/mongod.conf"]

# Default MongoDB start command (with default settings)
CMD ["mongod"]
