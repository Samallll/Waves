FROM eclipse-temurin:17-jdk-alpine

ARG JAR_FILE=target/host-service.jar

COPY ${JAR_FILE} host-service.jar

EXPOSE 8094

ENTRYPOINT ["java", "-jar", "/host-service.jar"]