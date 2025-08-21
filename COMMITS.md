# 📝 План коммитов для Hola Translator

## Рекомендуемая последовательность коммитов:

### 1. Инициализация проекта
```bash
git add .gitignore README.md
git commit -m "chore(repo): init monorepo structure with gitignore and README"
```

### 2. Backend - Express сервер
```bash
git add server/package.json server/index.js
git commit -m "feat(server): express + health route + CORS + multer setup"
```

### 3. Backend - STT endpoint
```bash
git add server/
git commit -m "feat(server): /stt endpoint with OpenAI Whisper integration"
```

### 4. Backend - Translation endpoint
```bash
git add server/index.js
git commit -m "feat(server): /translate endpoint with GPT-4o-mini (Spanish)"
```

### 5. Backend - Environment config
```bash
git add server/env.example
git commit -m "docs(server): add environment variables example"
```

### 6. Frontend - React + Vite setup
```bash
git add web/package.json web/vite.config.js web/index.html
git commit -m "feat(web): Vite + React scaffold with modern build setup"
```

### 7. Frontend - Core components
```bash
git add web/src/main.jsx web/src/index.css
git commit -m "feat(web): React entry point and responsive CSS styling"
```

### 8. Frontend - Audio recording
```bash
git add web/src/App.jsx
git commit -m "feat(web): MediaRecorder integration + POST /stt API calls"
```

### 9. Frontend - Translation UI
```bash
git add web/src/App.jsx
git commit -m "feat(web): transcription display + POST /translate integration"
```

### 10. Frontend - Loading states
```bash
git add web/src/App.jsx web/src/index.css
git commit -m "ui(web): loading states + error handling + reset functionality"
```

### 11. Frontend - Environment config
```bash
git add web/env.local.example
git commit -m "docs(web): add environment variables example"
```

### 12. Final documentation
```bash
git add SETUP.md COMMITS.md
git commit -m "docs: add setup instructions and commit history guide"
```

## Альтернативный быстрый вариант (3 коммита):

```bash
# 1. Backend
git add server/
git commit -m "feat(server): complete backend with STT and translation APIs"

# 2. Frontend  
git add web/
git commit -m "feat(web): complete React app with audio recording and translation UI"

# 3. Documentation
git add .gitignore README.md SETUP.md COMMITS.md
git commit -m "docs: add project documentation and setup instructions"
```

## Команды для выполнения:

```bash
# Выполните все коммиты по порядку
git add .
git status  # Проверьте что добавляется
git commit -m "feat: complete Hola real-time audio translator"
```

## Проверка истории:

```bash
git log --oneline  # Посмотреть историю коммитов
git show --stat    # Посмотреть изменения в последнем коммите
```
