# user-service/Dockerfile
FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Copy parent pom and wrapper
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

# Copy wallet-service (dependency for user-service)
COPY wallet-service/pom.xml wallet-service/
COPY wallet-service/src wallet-service/src

# Copy user-service
COPY user-service/pom.xml user-service/
COPY user-service/src user-service/src

# Build the project
RUN ./mvnw clean install -pl user-service -am -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built jar
COPY --from=build /app/user-service/target/*.jar app.jar

# Expose port
EXPOSE 8081

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
