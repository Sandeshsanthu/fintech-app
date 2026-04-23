#ssss
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app

# Copy root pom and the specific module
COPY pom.xml .
COPY api-gateway ./api-gateway

# Build the specific module
RUN mvn clean package -pl api-gateway -am -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/api-gateway/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
