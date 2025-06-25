# Base image nhẹ
FROM node:18-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Copy file lock và package trước (tăng cache efficiency)
COPY package.json package-lock.json ./

# Cài đặt các package cần thiết
RUN npm install --only=production

# Copy toàn bộ mã nguồn vào container
COPY . .

RUN npx prisma generate && npx prisma migrate deploy

# Expose cổng backend đang chạy
EXPOSE 3001

CMD [ "npm","start" ]
