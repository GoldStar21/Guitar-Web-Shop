# Koristi JDK sliku
FROM openjdk:21-jdk

# Kopiraj .jar fajl iz lokalnog target foldera u sliku
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Pokreni aplikaciju
ENTRYPOINT ["java", "-jar", "/app.jar"]
