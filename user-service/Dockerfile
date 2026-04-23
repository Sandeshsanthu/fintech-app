FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app

# Copy root pom and the user-service module
COPY pom.xml .

RUN mkdir api-gateway reward-service wallet-service transaction-service notification-service && \
    echo '<project><modelVersion>4.0.0</modelVersion><groupId>com.paypal</groupId><artifactId>dummy</artifactId><version>0.0.1-SNAPSHOT</version></project>' > api-gateway/pom.xml && \
    echo '<project><modelVersion>4.0.0</modelVersion><groupId>com.paypal</groupId><artifactId>dummy</artifactId><version>0.0.1-SNAPSHOT</version></project>' > reward-service/pom.xml && \
    echo '<project><modelVersion>4.0.0</modelVersion><groupId>com.paypal</groupId><artifactId>dummy</artifactId><version>0.0.1-SNAPSHOT</version></project>' > wallet-service/pom.xml && \
    echo '<project><modelVersion>4.0.0</modelVersion><groupId>com.paypal</groupId><artifactId>dummy</artifactId><version>0.0.1-SNAPSHOT</version></project>' > transaction-service/pom.xml && \
    echo '<project><modelVersion>4.0.0</modelVersion><groupId>com.paypal</groupId><artifactId>dummy</artifactId><version>0.0.1-SNAPSHOT</version></project>' > notification-service/pom.xml

COPY user-service ./user-service

# Build the specific module
RUN mvn clean package -pl user-service -am -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/user-service/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
