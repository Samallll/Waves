FROM eclipse-temurin:17-jdk-alpine

ARG JAR_FILE=target/config-server.jar

COPY ${JAR_FILE} config-server.jar

EXPOSE 8088

ENTRYPOINT ["java", "-jar", "/config-server.jar"]