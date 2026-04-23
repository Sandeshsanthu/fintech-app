FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Install Maven
RUN apk add --no-cache maven

# Copy parent pom
COPY pom.xml .

# Copy ALL module pom.xml files
COPY api-gateway/pom.xml api-gateway/
COPY wallet-service/pom.xml wallet-service/
COPY user-service/pom.xml user-service/

# Copy ALL module source code
COPY api-gateway/src api-gateway/src
COPY wallet-service/src wallet-service/src
COPY user-service/src user-service/src

# Build only user-service
RUN mvn clean package -pl user-service -am -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/user-service/target/user-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
