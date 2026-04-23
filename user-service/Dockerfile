# Stage 1: Build
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
# Copy only the pom and source for the user-service
COPY pom.xml .
COPY src ./src
# Build the application
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
# Copy the jar from the build stage
COPY --from=build /app/target/*.jar user-service.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "user-service.jar"]
