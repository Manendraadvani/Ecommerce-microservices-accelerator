FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml ./
# Remove the next line if you don't have a .mvn folder
COPY .mvn .mvn 
RUN mvn dependency:go-offline -B
COPY src src
RUN mvn clean package -DskipTests

FROM amazoncorretto:21-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8761

# CRITICAL: Eureka needs to know it's a server and not try to register with itself
ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=${PORT:-8761}", "--eureka.client.register-with-eureka=false", "--eureka.client.fetch-registry=false"]