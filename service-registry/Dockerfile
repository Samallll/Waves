FROM eclipse-temurin:17-jdk-alpine

ARG JAR_FILE=target/service-registry.jar

COPY ${JAR_FILE} service-registry.jar

EXPOSE 8761

ENTRYPOINT ["java", "-jar", "/service-registry.jar"]