# Stage 1: Build
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app

# 1. Copy the Parent POM from the root
COPY pom.xml .

# 2. Copy the api-gateway folder
COPY api-gateway ./api-gateway

# 3. Build the api-gateway specifically
# -pl (project list) -am (also make dependencies)
RUN mvn clean package -pl api-gateway -am -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the jar from the api-gateway target folder
COPY --from=build /app/api-gateway/target/*.jar app.jar

# API Gateway usually runs on 8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
