FROM eclipse-temurin:17-jdk-alpine

ARG JAR_FILE=target/email-service.jar

COPY ${JAR_FILE} email-service.jar

EXPOSE 8091

ENTRYPOINT ["java", "-jar", "/email-service.jar"]