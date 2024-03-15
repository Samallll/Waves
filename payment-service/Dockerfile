FROM eclipse-temurin:17-jdk-alpine

ARG JAR_FILE=target/payment-service.jar

COPY ${JAR_FILE} payment-service.jar

EXPOSE 8096

ENTRYPOINT ["java", "-jar", "/payment-service.jar"]