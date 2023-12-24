# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Install FFmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg


# Install aws cli
RUN apt-get install -y awscli

# Setup AWS Credentials

# Set AWS credentials as environment variables
#ENV AWS_ACCESS_KEY_ID=AKIAQP7CVG6AL2UQZTWG
#ENV AWS_SECRET_ACCESS_KEY=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
#ENV AWS_DEFAULT_REGION=us-east-1


# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]

