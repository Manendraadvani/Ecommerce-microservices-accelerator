#!/bin/bash

BASE_DIR="/Users/manendra.advani/Desktop/E-commerce Accelerator/Backend"

echo "🚀 Starting all microservices..."

# Start Eureka Server first
echo "Starting Eureka Server..."
cd "$BASE_DIR/eurekaserver"
./mvnw spring-boot:run > /tmp/eureka.log 2>&1 &
echo "⏳ Waiting 30 seconds for Eureka to start..."
sleep 30

# Start Product Service
echo "Starting Product Service..."
cd "$BASE_DIR/productservice"
./mvnw spring-boot:run > /tmp/product.log 2>&1 &
sleep 10

# Start Auth Service
echo "Starting Auth Service..."
cd "$BASE_DIR/authservice"
./mvnw spring-boot:run > /tmp/auth.log 2>&1 &
sleep 10

# Start User Service
echo "Starting User Service..."
cd "$BASE_DIR/userservice"
./mvnw spring-boot:run > /tmp/user.log 2>&1 &
sleep 10

# Start Order Service
echo "Starting Order Service..."
cd "$BASE_DIR/orderservice"
./mvnw spring-boot:run > /tmp/order.log 2>&1 &
sleep 10

# Start Search Service
echo "Starting Search Service..."
cd "$BASE_DIR/searchservice"
./mvnw spring-boot:run > /tmp/search.log 2>&1 &
sleep 10

# Start API Gateway
echo "Starting API Gateway..."
cd "$BASE_DIR/apigateway"
./mvnw spring-boot:run > /tmp/apigateway.log 2>&1 &

echo ""
echo "✅ All services started!"
echo ""
echo "📋 View logs:"
echo "  tail -f /tmp/eureka.log"
echo "  tail -f /tmp/product.log"
echo "  tail -f /tmp/auth.log"
echo "  tail -f /tmp/user.log"
echo "  tail -f /tmp/order.log"
echo "  tail -f /tmp/search.log"
echo "  tail -f /tmp/apigateway.log"
echo ""
echo "🌐 Access:"
echo "  Eureka: http://localhost:8761"
echo "  API Gateway: http://localhost:1110"
