# 🚀 Быстрый запуск Hola Translator

## Шаг 1: Настройка переменных окружения

### Backend (Server)
```bash
cd server
cp env.example .env
# Отредактируйте .env и добавьте ваш OPENAI_API_KEY
```

### Frontend (Web)
```bash
cd web
cp env.local.example .env.local
# VITE_API_BASE уже настроен по умолчанию
```

## Шаг 2: Установка зависимостей

```bash
# Backend
cd server
npm install

# Frontend
cd ../web
npm install
```

## Шаг 3: Запуск приложения

### Terminal 1 - Backend
```bash
cd server
npm start
```

### Terminal 2 - Frontend
```bash
cd web
npm run dev
```

## Шаг 4: Открыть в браузере

Перейдите на: http://localhost:5173

## ⚠️ Важно

1. **API ключ**: Получите ключ на https://platform.openai.com/api-keys
2. **Микрофон**: Разрешите доступ к микрофону в браузере
3. **HTTPS**: Для продакшена используйте HTTPS (MediaRecorder требует)

## Тестирование

1. Нажмите "🎤 Записать"
2. Говорите в микрофон
3. Нажмите "⏹️ Остановить"
4. Дождитесь обработки
5. Увидите транскрипцию и перевод на испанский

## Проблемы?

- **CORS ошибки**: Убедитесь, что сервер запущен на порту 4000
- **API ошибки**: Проверьте OPENAI_API_KEY в .env
- **Нет аудио**: Проверьте разрешения микрофона в браузере
