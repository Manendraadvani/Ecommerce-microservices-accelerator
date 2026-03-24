# Stage 1: Build stage
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

# We only need the pom.xml and the src folder to build
COPY pom.xml ./
RUN mvn dependency:go-offline -B

COPY src src
RUN mvn clean package -DskipTests

# Stage 2: Run stage
FROM amazoncorretto:21-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8761

# Passing the PORT dynamically for Render
ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=${PORT:-8761}", "--eureka.client.register-with-eureka=false", "--eureka.client.fetch-registry=false"]