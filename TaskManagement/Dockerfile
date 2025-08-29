# ===== 1) Build stage (uses Microsoft OpenJDK 21, NOT Docker Hub) =====
FROM mcr.microsoft.com/openjdk/jdk:21-ubuntu AS build

ARG DEBIAN_FRONTEND=noninteractive
# Install Maven from Ubuntu repos (no Docker Hub involved)
RUN apt-get update \
 && apt-get install -y --no-install-recommends maven \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy project and build
# (If your project has the Maven Wrapper, you can use it instead; see note below.)
COPY pom.xml .
COPY src ./src
RUN mvn -B -q clean package -DskipTests

# ===== 2) Runtime stage (also from Microsoft registry) =====
FROM mcr.microsoft.com/openjdk/jdk:21-ubuntu

WORKDIR /app
COPY --from=build /app/target/*.jar /app/app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
