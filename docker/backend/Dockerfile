# Build Stage
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests


# Run Stage
FROM openjdk:17
# Define
ARG PROFILE=dev
ARG VERSION=0.0.1

WORKDIR /app

COPY --from=build /build/target/sp-backend-*.jar /app/

EXPOSE 3008

ENV DB_URL=jdbc:mysql://suivie-physique-master.cbsqw4oegule.us-east-1.rds.amazonaws.com/sp
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${VERSION}

CMD java -jar -Dspring.profiles.avtive=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} sp-backend-${JAR_VERSION}.jar