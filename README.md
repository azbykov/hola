# Hola - Real Time Audio Translator

Приложение для перевода аудио в реальном времени с использованием STT (Speech-to-Text) и LLM для перевода на испанский язык.

## Архитектура

- **Frontend**: React + Vite (порт 5173)
- **Backend**: Node.js + Express (порт 4000)
- **STT**: OpenAI Whisper API
- **Translation**: OpenAI GPT-4o-mini

## Установка и запуск

### 1. Клонирование репозитория
```bash
git clone <repository-url>
cd hola
```

### 2. Настройка Backend (Server)

```bash
cd server
npm install
```

Создайте файл `.env` в папке `server/`:
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=4000
```

### 3. Настройка Frontend (Web)

```bash
cd web
npm install
```

Создайте файл `.env.local` в папке `web/`:
```env
VITE_API_BASE=http://localhost:4000
```

### 4. Запуск приложения

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd web
npm run dev
```

Приложение будет доступно по адресу: http://localhost:5173

## Использование

1. Откройте браузер и перейдите на http://localhost:5173
2. Нажмите кнопку "Record" для начала записи аудио
3. Говорите в микрофон
4. Нажмите "Stop" для остановки записи
5. Дождитесь обработки: STT → Перевод на испанский
6. Результаты отобразятся на странице

## API Endpoints

### POST /stt
Принимает аудиофайл и возвращает транскрипцию.

**Request:** `multipart/form-data` с полем `audio`
**Response:** `{ "text": "transcribed text" }`

### POST /translate
Переводит текст на испанский язык.

**Request:** `{ "text": "text to translate" }`
**Response:** `{ "translated": "translated text" }`

## Переменные окружения

### Server (.env)
- `OPENAI_API_KEY` - API ключ OpenAI (обязательно)
- `PORT` - Порт сервера (по умолчанию 4000)

### Web (.env.local)
- `VITE_API_BASE` - Базовый URL API (по умолчанию http://localhost:4000)

## Технологии

- **Frontend**: React 18, Vite
- **Backend**: Node.js, Express, CORS, Multer
- **AI**: OpenAI Whisper API, OpenAI GPT-4o-mini
- **Audio**: MediaRecorder API (WebM формат)

## ⚠️ Важно

- **НЕ коммитьте** файлы `.env` с реальными API ключами
- Используйте `.env.example` как шаблон
- API ключи OpenAI должны быть действительными

## Устранение неполадок

1. **Ошибка CORS**: Убедитесь, что сервер запущен на порту 4000
2. **Ошибка API**: Проверьте правильность OPENAI_API_KEY
3. **Нет аудио**: Разрешите доступ к микрофону в браузере
4. **Пустая транскрипция**: Убедитесь, что микрофон работает и есть звук
