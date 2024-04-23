# Build Stage
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests


# Run Stage
FROM openjdk:17
# Define
ARG PROFILE=dev
ARG APP_VERSION=0.0.1

WORKDIR /app

COPY --from=build /build/target/sp-api-*.jar /app/

# Extract the version from the jar name
RUN APP_VERSION=$(ls /app | grep *.jar | awk 'NR==2{split($0,a,"-"); print a[3]}' | awk '{sub(/.jar$/,"")}1')\
    && echo "Building container with version v-$version"
EXPOSE 3008

ENV DB_URL=jdbc:mysql://suivie-physique-master.cbsqw4oegule.us-east-1.rds.amazonaws.com/sp
ENV MAIL_HOST=sandbox.smtp.mailtrap.io
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}

CMD java -jar -Dspring.profiles.avtive=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} sp-api-${JAR_VERSION}.jar