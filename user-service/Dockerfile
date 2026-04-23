FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Copy parent pom and maven wrapper
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

# Copy wallet-service (dependency)
COPY wallet-service/pom.xml wallet-service/
COPY wallet-service/src wallet-service/src

# Copy user-service
COPY user-service/pom.xml user-service/
COPY user-service/src user-service/src

# Build user-service
RUN ./mvnw clean package -pl user-service -am -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=build /app/user-service/target/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
