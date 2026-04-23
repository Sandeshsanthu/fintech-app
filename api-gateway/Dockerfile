FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Copy parent pom and maven wrapper
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

# Copy api-gateway module
COPY api-gateway/pom.xml api-gateway/
COPY api-gateway/src api-gateway/src

# Build only api-gateway
RUN ./mvnw clean package -pl api-gateway -am -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=build /app/api-gateway/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
