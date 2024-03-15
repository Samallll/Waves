FROM eclipse-temurin:17-jdk-alpine

ARG JAR_FILE=target/api-gateway.jar

COPY ${JAR_FILE} api-gateway.jar

EXPOSE 8090

ENTRYPOINT ["java", "-jar", "/api-gateway.jar"]