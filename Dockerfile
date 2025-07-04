# Build Stage
FROM node:lts-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

# Set build-time environment variables
ARG VITE_BASE_URL
ARG VITE_APP_URL
ARG VITE_API_URL

# Provide the variables to Vite
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_APP_URL=$VITE_APP_URL
ENV VITE_API_URL=$VITE_API_URL

RUN yarn build

# Production Stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]