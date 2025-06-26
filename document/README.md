## Full-Stack Docer App

Một ứng dụng web full-stack bao gồm:
- 🖥️ Frontend (Next.js)
- 🔧 Backend (Node.js/Express)
- 🛢️ MySQL Database
- ⚡ Redis Cache
- 🐳 Docker & Docker Compose
  
full-stack-docker-app/
├── front-end/ # Frontend app (Next.js )
├── back-end/ # Backend app (Node.js, Express)
├── docker-compose.yml # Docker Compose cấu hình toàn bộ app
└── config/ nginx.conf # Cấu hình nginx 

### luồng chạy request 
* request sẽ hit vào nginx, ở đó nginx phân biệt request theo url và sẽ có 2 luồng là back end cho http://backend:3001/ và front end cho http://backend:3000

### luồng github action
* tạo file env từ các github repo env 
* build các image 
* push image lên docker hub (registry)
* pull image về
* tắt và xoá container cũ
* run container mới
* xoá image cũ

| Service  | Cổng      | Chức năng                |
| -------- | --------- | ------------------------ |
| frontend | 3000      | Giao diện người dùng     |
| backend  | 3001      | API & xử lý dữ liệu      |
| db       | 3307:3306 | MySQL database           |
| cache    | 6379      | Redis cache              |
| nginx    | 80        | Reverse proxy (tuỳ chọn) |

