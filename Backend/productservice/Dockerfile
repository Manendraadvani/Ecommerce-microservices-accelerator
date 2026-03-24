# Stage 1: Build stage
# Using eclipse-temurin for the build stage as it's a reliable JDK 21 environment
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

# 1. Copy only the pom.xml first to cache dependencies
COPY pom.xml ./
# 2. Only copy .mvn if it exists in your local folder. If not, delete this line!
# COPY .mvn .mvn 

# 3. Download dependencies (this layer is cached unless pom.xml changes)
RUN mvn dependency:go-offline -B

# 4. Copy source code and build
COPY src src
RUN mvn clean package -DskipTests

# Stage 2: Run stage
# amazoncorretto is great for AWS/Cloud environments
FROM amazoncorretto:21-alpine
WORKDIR /app

# Copy the built JAR from the builder stage
COPY --from=build /app/target/*.jar app.jar

# Render needs a port to be exposed (default is usually 8080 or 10000)
EXPOSE 8080

# Dynamic entrypoint that respects the $PORT variable provided by Render
ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=${PORT:-8080}"]