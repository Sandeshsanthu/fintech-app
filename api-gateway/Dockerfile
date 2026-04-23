# Stage 1: Build
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app

# 1. Copy the Parent POM
COPY pom.xml .

# 2. CREATE DUMMY FOLDERS AND DUMMY POMs
# This satisfies Maven's check for /app/user-service/pom.xml
RUN mkdir user-service reward-service wallet-service transaction-service notification-service && \
    echo '<project><modelVersion>4.0.0</modelVersion><groupId>com.paypal</groupId><artifactId>dummy</artifactId><version>0.0.1-SNAPSHOT</version></project>' > user-service/pom.xml && \
    echo '<project><modelVersion>4.0.0</modelVersion><groupId>com.paypal</groupId><artifactId>dummy</artifactId><version>0.0.1-SNAPSHOT</version></project>' > reward-service/pom.xml && \
    echo '<project><modelVersion>4.0.0</modelVersion><groupId>com.paypal</groupId><artifactId>dummy</artifactId><version>0.0.1-SNAPSHOT</version></project>' > wallet-service/pom.xml && \
    echo '<project><modelVersion>4.0.0</modelVersion><groupId>com.paypal</groupId><artifactId>dummy</artifactId><version>0.0.1-SNAPSHOT</version></project>' > transaction-service/pom.xml && \
    echo '<project><modelVersion>4.0.0</modelVersion><groupId>com.paypal</groupId><artifactId>dummy</artifactId><version>0.0.1-SNAPSHOT</version></project>' > notification-service/pom.xml

# 3. Copy the ACTUAL api-gateway code
COPY api-gateway ./api-gateway

# 4. Build ONLY the api-gateway
RUN mvn clean package -pl api-gateway -am -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/api-gateway/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
