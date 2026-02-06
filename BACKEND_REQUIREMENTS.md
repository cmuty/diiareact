# Требования к Backend серверу

Ваш сервер: **https://diia-backend.onrender.com**

## Необходимые endpoints:

### 1. POST /login
Авторизация пользователя

**Request:**
```json
{
  "username": "user_login",
  "password": "user_password"
}
```

**Response (успех):**
```json
{
  "success": true,
  "user": {
    "username": "user_login",
    "firstName": "Богдан",
    "lastName": "Зарва",
    "patronymic": "Олегович",
    "birthDate": "07.01.2010",
    "taxId": "4018401651",
    "passportNumber": "010322300",
    "photo": "https://example.com/photo.jpg",
    "signature": "https://example.com/signature.jpg"
  }
}
```

**Response (ошибка):**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

## Обязательные поля в user:

- `firstName` - Имя
- `lastName` - Фамилия
- `patronymic` - Отчество
- `birthDate` - Дата рождения (формат: DD.MM.YYYY, например: "07.01.2010")
- `taxId` - РНОКПП (налоговый номер)

## Опциональные поля:

- `username` - Логин пользователя
- `passportNumber` - Номер паспорта
- `photo` - URL фотографии пользователя
- `signature` - URL подписи пользователя

## CORS настройки:

Убедитесь, что на сервере разрешены CORS запросы с вашего домена:

```javascript
// Пример для Express.js
const cors = require('cors');
app.use(cors({
  origin: '*', // Или укажите конкретный домен
  methods: ['GET', 'POST'],
  credentials: true
}));
```

## Пример реализации endpoint /login:

```javascript
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Ваша логика проверки пользователя
    const user = await authenticateUser(username, password);
    
    if (user) {
      res.json({
        success: true,
        user: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          patronymic: user.patronymic,
          birthDate: user.birthDate, // DD.MM.YYYY
          taxId: user.taxId,
          passportNumber: user.passportNumber,
          photo: user.photo,
          signature: user.signature
        }
      });
    } else {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});
```

## Тестирование:

Вы можете протестировать endpoint с помощью curl:

```bash
curl -X POST https://diia-backend.onrender.com/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'
```

Или с помощью Postman/Insomnia.

## Важно:

1. Формат даты должен быть **DD.MM.YYYY** (например: 07.01.2010)
2. Все поля должны быть строками (string)
3. Если поле опционально и отсутствует, можно вернуть `null` или не включать его в ответ
