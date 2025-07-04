# Build Stage
FROM node:lts-alpine AS build
WORKDIR /app

# Accept build-time args
ARG VITE_API_URL
ARG VITE_APP_URL
ARG VITE_BASE_PATH

# Expose them as env vars for Vite to read
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_URL=$VITE_APP_URL
ENV VITE_BASE_PATH=$VITE_BASE_PATH

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Production Stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]