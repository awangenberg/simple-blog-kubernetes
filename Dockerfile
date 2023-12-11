FROM python:alpine

WORKDIR /app


# Copy only the requirements file and install dependencies
COPY requirements.txt .
RUN pip3 install --only-binary :all: -r requirements.txt

# Copy the entire application
COPY . .

# Remove unnecessary files (if any)
#RUN rm -rf <files or folders to remove>

EXPOSE 5000

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
