FROM eclipse-temurin:17-jdk-alpine

ARG JAR_FILE=target/chat-service.jar

COPY ${JAR_FILE} chat-service.jar

EXPOSE 8097

ENTRYPOINT ["java", "-jar", "/chat-service.jar"]