FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app

# Copy root pom and the user-service module
COPY pom.xml .
COPY user-service ./user-service

# Build the specific module
RUN mvn clean package -pl user-service -am -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/user-service/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
