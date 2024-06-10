FROM node:16 as build

WORKDIR /app

COPY package*.json ./


RUN npm install -g @pnpm/exe && pnpm install
RUN pnpm install -D tailwindcss postcss autoprefixer
RUN pnpm install ag-grid-community

COPY . .

RUN pnpm run build



FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/frontend /usr/share/nginx/html

EXPOSE 80
