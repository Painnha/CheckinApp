# Conference Check-in App

Ứng dụng quản lý check-in hội nghị với khả năng quét mã QR và thống kê.

## Tính năng

- **Authentication**: Đăng nhập với token JWT (hết hạn sau 48 giờ)
- **QR Scanner**: Quét mã QR để check-in người tham gia
- **Statistics**: Xem thống kê check-in
- **Mobile Optimized**: Tối ưu cho điện thoại di động

## Cấu trúc dự án

```
conference-checkin-app/
├── packages/
│   ├── backend/          # Node.js API server
│   │   ├── src/
│   │   │   ├── models/   # Database models
│   │   │   ├── routes/   # API routes
│   │   │   └── utils/    # Utilities
│   │   └── package.json
│   └── frontend/         # React frontend
│       ├── src/
│       │   ├── pages/    # React components
│       │   └── utils/    # Utilities
│       └── package.json
├── package.json
└── README.md
```

## Cài đặt

### Backend

```bash
cd packages/backend
npm install
npm start
```

### Frontend

```bash
cd packages/frontend
npm install
npm start
```

## Sử dụng

1. **Đăng nhập**: Truy cập `/login` để đăng nhập
2. **Check-in**: Sau khi đăng nhập, chuyển đến `/checkin`
3. **Quét QR**: Sử dụng tab "Scanner" để quét mã QR
4. **Xem thống kê**: Chuyển sang tab "Thống kê" để xem dữ liệu

## API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập

### Participants
- `POST /api/participants/checkin` - Check-in người tham gia
- `GET /api/participants/stats` - Lấy thống kê

## Công nghệ sử dụng

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Frontend
- React.js
- jsQR (QR code scanning)
- Axios (HTTP client)

## Tính năng kỹ thuật

- **Token Management**: JWT token với thời hạn 48 giờ
- **Camera Integration**: Sử dụng camera sau trên điện thoại
- **Real-time Scanning**: Quét QR code liên tục
- **Error Handling**: Xử lý lỗi và thông báo người dùng
- **Responsive Design**: Tối ưu cho mobile và desktop

## Môi trường phát triển

- Node.js >= 14
- npm hoặc yarn
- MongoDB (cho backend)

## License

MIT 