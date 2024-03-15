FROM eclipse-temurin:17-jdk-alpine

ARG JAR_FILE=target/event-service.jar

COPY ${JAR_FILE} event-service.jar

EXPOSE 8095

ENTRYPOINT ["java", "-jar", "/event-service.jar"]