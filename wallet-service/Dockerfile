FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
# Note: Wallet service might also need the parent POM if it has a <parent> tag
COPY wallet-service ./wallet-service
# Just build wallet-service
RUN mvn clean package -pl wallet-service -am -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/wallet-service/target/*.jar app.jar
EXPOSE 8088
ENTRYPOINT ["java", "-jar", "app.jar"]
