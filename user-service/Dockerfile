FROM eclipse-temurin:17-jdk-alpine

ARG JAR_FILE=target/user-service.jar

COPY ${JAR_FILE} user-service.jar

EXPOSE 8092

ENTRYPOINT ["java", "-jar", "/user-service.jar"]