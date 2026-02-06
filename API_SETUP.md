# Настройка API для авторизации

## Подключение к серверу

Чтобы подключить React-приложение к вашему серверу авторизации, выполните следующие шаги:

### 1. Обновите URL API

Откройте файл `src/contexts/AuthContext.jsx` и найдите строку:

```javascript
const API_URL = 'YOUR_API_URL'; // Replace with your server URL
```

Замените `'YOUR_API_URL'` на URL вашего сервера. Например:

```javascript
const API_URL = 'https://your-server.com/api';
```

### 2. Формат ответа сервера

Сервер должен возвращать данные пользователя в следующем формате:

```json
{
  "success": true,
  "user": {
    "username": "user123",
    "firstName": "Іван",
    "lastName": "Іваненко",
    "patronymic": "Іванович",
    "birthDate": "01.01.2000",
    "taxId": "1234567890",
    "passportNumber": "010322300",
    "photo": "https://example.com/photo.jpg",  // опционально
    "signature": "https://example.com/signature.jpg"  // опционально
  }
}
```

### 3. Endpoint для авторизации

Сервер должен иметь endpoint `/login`, который принимает POST запрос:

**Request:**
```json
{
  "username": "user123",
  "password": "password"
}
```

**Response (успех):**
```json
{
  "success": true,
  "user": {
    // данные пользователя
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

### 4. Формат даты

Даты должны быть в формате `DD.MM.YYYY`, например: `07.01.2010`

### 5. Поля пользователя

Обязательные поля:
- `firstName` - Имя
- `lastName` - Фамилия
- `patronymic` - Отчество
- `birthDate` - Дата рождения (DD.MM.YYYY)
- `taxId` - РНОКПП (налоговый номер)

Опциональные поля:
- `passportNumber` - Номер паспорта
- `photo` - URL фотографии пользователя
- `signature` - URL подписи пользователя
- `username` - Логин пользователя

### 6. Пример интеграции с существующим сервером

Если у вас уже есть сервер из `diia-web`, убедитесь, что он возвращает данные в правильном формате.

Пример модификации существующего endpoint:

```javascript
// На сервере
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Ваша логика проверки
  const user = await authenticateUser(username, password);
  
  if (user) {
    res.json({
      success: true,
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        patronymic: user.patronymic,
        birthDate: user.birthDate,
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
});
```

## Локальное хранилище

Данные пользователя сохраняются в `localStorage`:
- `isAuthenticated` - статус авторизации
- `userData` - данные пользователя

## Выход из системы

При выходе все данные удаляются из `localStorage`.
