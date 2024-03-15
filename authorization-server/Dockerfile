FROM eclipse-temurin:17-jdk-alpine
ARG JAR_FILE=target/authorization-server.jar
COPY ${JAR_FILE} authorization-server.jar
EXPOSE 9000
ENTRYPOINT ["java","-jar","/authorization-server.jar"]