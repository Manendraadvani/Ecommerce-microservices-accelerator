#!/bin/bash

BASE_DIR="/Users/manendra.advani/Desktop/E-commerce Accelerator/Backend"
cd "$BASE_DIR"

services=(eurekaserver apigateway productservice authservice userservice orderservice searchservice)

for service in "${services[@]}"; do
  echo "🏗️  Building $service..."
  cd "$service"
  ./mvnw clean install -DskipTests
  if [ $? -ne 0 ]; then
    echo "❌ Failed to build $service"
    exit 1
  fi
  cd "$BASE_DIR"
  echo "✅ $service built successfully!"
  echo ""
done

echo "🎉 All services built successfully!"
