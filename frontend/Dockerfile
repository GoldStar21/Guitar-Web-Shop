# 1. Prva faza: buildanje aplikacije
FROM node:22 AS builder

# Postavi radni direktorij unutar kontejnera
WORKDIR /app

# Kopiraj package.json i package-lock.json
COPY package*.json ./

# Instaliraj dependencije
RUN npm install

# Kopiraj ostatak projekta
COPY . .

# Buildaj Next.js aplikaciju
RUN npm run build

# 2. Druga faza: pokretanje aplikacije
FROM node:22

WORKDIR /app

# Kopiraj sve iz build faze
COPY --from=builder /app ./

# Expose port koji Next koristi
EXPOSE 3000

# Start aplikacije
CMD ["npm", "start"]
