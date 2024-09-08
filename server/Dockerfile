# Stage 1: Build Node.js application
FROM node:18 AS node_builder
LABEL org.opencontainers.image.source https://github.com/akash19coder/DocGPT

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev --ignore-scripts
COPY . .

RUN npm run build

# Stage 2: Install Python dependencies
FROM python:3.9 AS python_builder

WORKDIR /usr/src/app

# Copy only the necessary files from the previous stage
COPY --from=node_builder /usr/src/app .

# Install Python dependencies
RUN pip install pypdf  # Adjust this based on your Python dependencies

# Final stage: Production image
FROM node:18

WORKDIR /usr/src/app

# Copy built Node.js application from the previous stage
COPY --from=python_builder /usr/src/app .

# Start the application
CMD ["npm", "start"]
