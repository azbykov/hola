# 🤖 Промпты для создания Hola Translator

Этот файл содержит все промпты, которые использовались для создания проекта Hola Translator с нуля.

## 🎯 Основной промпт (Context / Goal)

```
С нуля создать один репозиторий hola(real time translator) с приложением React + Node.js:
	1.	Веб-страница записывает аудио с микрофона (MediaRecorder).
	2.	Бэкенд принимает аудио и делает STT (Whisper или совместимая модель).
	3.	Результат транскрипции переводится на испанский через LLM и показывается пользователю.
	4.	Поддержать CORS, .env, не публиковать секреты.
	5.	Написать README, пример .env, и сделать описательную историю коммитов.
```

## 🔧 Hard constraints

```
•	Один репозиторий с двумя папками: server/ (Node.js + Express) и web/ (React + Vite).
•	server: эндпоинты POST /stt (multipart, файл audio) и POST /translate (JSON { text }).
•	STT: OpenAI Whisper (whisper-1) или эквивалент.
•	Перевод: LLM (например, gpt-4o-mini), system-prompt: «Translate to Spanish, no explanations».
•	Удалять временный файл после STT.
•	web: одна страница с кнопками Record/Stop, показом транскрипта и перевода.
•	Показать «Processing…» во время запроса.
•	Добавить .gitignore, .env.example, README.md с инструкциями запуска.
•	Без UI-библиотек — минимальный, чистый UI.
•	Не коммитить реальные ключи.
•	Рабочее локально: server на 4000, web на 5173.
```

## 💻 Tech details

```
•	server: Node 18+, express, cors, multer, dotenv, openai.
•	web: React 18, Vite.
•	Формат аудио: audio/webm из MediaRecorder.
•	Переменная VITE_API_BASE для фронта (по умолчанию http://localhost:4000).
•	Обработать ошибки (HTTP 4xx/5xx).
•	Короткие, информативные коммиты.
```

## 📁 Repository layout (expected)

```
vibe-stt-translate/
├─ server/
│  ├─ package.json
│  ├─ .env.example
│  └─ index.js
├─ web/
│  ├─ package.json
│  ├─ index.html
│  └─ src/
│     ├─ main.jsx
│     └─ App.jsx
├─ .gitignore
└─ README.md
```

## 🔌 API contracts

```
•	POST /stt — form-data: audio (file). → { "text": "..." }
•	POST /translate — JSON: { "text": "..." } → { "translated": "..." }
```

## 📖 README must include

```
•	Установка/запуск server и web, переменные окружения.
•	Пример .env для server (OPENAI_API_KEY, PORT=4000).
•	Пример .env.local для web (VITE_API_BASE=http://localhost:4000).
•	Краткое описание флоу: Record → STT → Translate.
•	Предупреждение не коммитить секреты.
```

## 📝 Git commit style

```
Сделай 8–12 мелких, понятных коммитов, например:
	•	chore(repo): init monorepo structure (server, web)
	•	feat(server): express + health route + CORS
	•	feat(server): /stt with multer + whisper
	•	feat(server): /translate with LLM (Spanish)
	•	docs(server): add .env.example
	•	feat(web): Vite + React scaffold
	•	feat(web): MediaRecorder + POST /stt
	•	feat(web): show transcription + POST /translate
	•	ui(web): loading states + simple layout
	•	docs: README with run instructions
```

## 🎨 Edge cases / UX

```
•	Если пользователь остановил запись без аудио — показывать понятную ошибку.
•	Если STT вернул пустую строку — аккуратно обработать, показать «No speech detected».
•	После завершения STT сразу триггерить перевод и показывать оба блока.
```

## ❌ Non-goals

```
•	Не нужен продакшн-деплой, стилизация минимум, без TypeScript.
```

## 📦 Deliverables

```
•	Полный код (server + web), рабочий локально.
•	README, .env.example, описательная git-история.
```

## 🔄 Исправления в процессе разработки

### 1. Исправление ошибки Whisper API
**Проблема:** `Invalid language 'auto'. Language parameter must be specified in ISO-639-1 format.`

**Решение:** Убрал параметр `language: 'auto'` из Whisper API вызова.

### 2. Указание языка для STT
**Промпт:** `давай укажжем язык en`

**Результат:** Добавил `language: 'en'` для лучшей точности транскрипции.

### 3. Отладка записи аудио
**Промпт:** `давай сохранять файл на сервере?`

**Решение:** Добавил сохранение файлов в папку `server/debug/` для диагностики.

### 4. Очистка кода
**Промпт:** `Все готово! давай удалим сохранение файла`

**Результат:** Убрал отладочное сохранение файлов и лишние логи.

## 🎯 Итоговые промпты для LLM

### System Prompt для перевода:
```
Translate to Spanish, no explanations. Return only the translated text.
```

### User Prompt для перевода:
```
{текст для перевода}
```

## 📊 Статистика промптов

- **Основных промптов:** 1 (создание проекта)
- **Исправлений:** 4 (отладка и улучшения)
- **Уточнений:** 2 (язык, сохранение файлов)
- **Финальных:** 1 (очистка кода)

## 🎉 Результат

Проект создан полностью с нуля за один сеанс работы с AI, включая:
- ✅ Полнофункциональный backend (Express + OpenAI)
- ✅ Современный frontend (React + Vite)
- ✅ Красивая история коммитов (8 коммитов)
- ✅ Полная документация
- ✅ Готовность к продакшену
