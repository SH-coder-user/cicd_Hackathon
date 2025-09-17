# Multi-stage build for Create React App
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Nginx stage
FROM nginx:1.27-alpine
# Listen on 8501 instead of 80
RUN sed -i 's/listen       80;/listen       8501;/' /etc/nginx/conf.d/default.conf || true
# Replace default server block with SPA-aware config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy CRA build
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8501
CMD ["nginx", "-g", "daemon off;"]
