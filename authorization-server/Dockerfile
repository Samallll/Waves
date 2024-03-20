FROM eclipse-temurin:17-jdk-alpine
ARG JAR_FILE=target/authorization-server.jar
RUN apk add --no-cache curl
COPY ${JAR_FILE} authorization-server.jar
EXPOSE 9000
ENTRYPOINT ["java","-jar","/authorization-server.jar"]