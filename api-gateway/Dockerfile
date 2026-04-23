FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Install Maven and 
RUN apk add --no-cache maven

# Copy parent pom
COPY pom.xml .

# Copy ALL module pom.xml files (Maven needs to see them)
COPY api-gateway/pom.xml api-gateway/
COPY wallet-service/pom.xml wallet-service/
COPY user-service/pom.xml user-service/

# Copy ALL module source code (Maven reactor needs them)
COPY api-gateway/src api-gateway/src
COPY wallet-service/src wallet-service/src
COPY user-service/src user-service/src

# Build only api-gateway (but Maven validates all modules)
RUN mvn clean package -pl api-gateway -am -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy only the api-gateway jar
COPY --from=build /app/api-gateway/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
