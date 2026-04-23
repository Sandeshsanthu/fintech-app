FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Copy parent pom and maven wrapper
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

# Copy wallet-service module
COPY wallet-service/pom.xml wallet-service/
COPY wallet-service/src wallet-service/src

# Build only wallet-service
RUN ./mvnw clean package -pl wallet-service -am -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=build /app/wallet-service/target/*.jar app.jar

EXPOSE 8088

ENTRYPOINT ["java", "-jar", "app.jar"]
