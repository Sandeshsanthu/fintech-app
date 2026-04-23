<<<<<<< HEAD
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
=======
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and download dependencies (cached layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests
>>>>>>> ed1be7f58c9ac4a33d3f0888a1bd101508b2be19

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

<<<<<<< HEAD
# Copy the jar from the api-gateway target folder
COPY --from=build /app/api-gateway/target/*.jar app.jar

# API Gateway usually runs on 8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
=======
# Create non-root user
RUN addgroup -S spring && adduser -S spring -G spring

# Copy JAR from build stage
COPY --from=build /app/target/*.jar app.jar
RUN chown spring:spring app.jar

# Switch to non-root user
USER spring:spring

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Run application
ENTRYPOINT ["java", "-Xmx512m", "-Xms256m", "-jar", "app.jar"]
>>>>>>> ed1be7f58c9ac4a33d3f0888a1bd101508b2be19
