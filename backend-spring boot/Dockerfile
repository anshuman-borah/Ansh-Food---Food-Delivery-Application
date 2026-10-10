# Stage 1: Build the application
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create the production image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/zosh-food-0.0.1-SNAPSHOT.jar app.jar

# Expose the default port (Render will inject its own PORT at runtime)
EXPOSE 5454

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]