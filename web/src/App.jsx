import React, { useState, useRef, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState('');
  const [transcription, setTranscription] = useState('');
  const [translation, setTranslation] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    // Check if MediaRecorder is supported
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      setError('MediaRecorder не поддерживается в вашем браузере');
    }
  }, []);

  const startRecording = async () => {
    try {
      setError('');
      setStatus('');
      setTranscription('');
      setTranslation('');
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      });
      
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = async () => {
        if (audioChunksRef.current.length === 0) {
          setError('Не удалось записать аудио. Попробуйте еще раз.');
          return;
        }
        
        await processAudio();
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setStatus('Запись... Говорите в микрофон');
      
    } catch (err) {
      console.error('Error starting recording:', err);
      if (err.name === 'NotAllowedError') {
        setError('Доступ к микрофону запрещен. Разрешите доступ в настройках браузера.');
      } else {
        setError('Ошибка при запуске записи: ' + err.message);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setStatus('Обработка аудио...');
      setIsProcessing(true);
    }
  };

  const processAudio = async () => {
    try {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      
      // Send to STT endpoint
      setStatus('Транскрибирование аудио...');
      const sttResponse = await fetch(`${API_BASE}/stt`, {
        method: 'POST',
        body: formData
      });
      
      if (!sttResponse.ok) {
        const errorData = await sttResponse.json();
        throw new Error(errorData.error || 'Ошибка при транскрибировании');
      }
      
      const sttData = await sttResponse.json();
      const transcribedText = sttData.text;
      
      setTranscription(transcribedText);
      
      if (transcribedText === 'No speech detected') {
        setTranslation('No se detectó habla');
        setStatus('Речь не обнаружена');
        setIsProcessing(false);
        return;
      }
      
      // Send to translation endpoint
      setStatus('Перевод на испанский...');
      const translateResponse = await fetch(`${API_BASE}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: transcribedText })
      });
      
      if (!translateResponse.ok) {
        const errorData = await translateResponse.json();
        throw new Error(errorData.error || 'Ошибка при переводе');
      }
      
      const translateData = await translateResponse.json();
      setTranslation(translateData.translated);
      setStatus('Готово!');
      
    } catch (err) {
      console.error('Error processing audio:', err);
      setError('Ошибка обработки: ' + err.message);
      setStatus('');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetApp = () => {
    setTranscription('');
    setTranslation('');
    setStatus('');
    setError('');
    setIsProcessing(false);
  };

  return (
    <div className="container">
      <h1 className="title">Hola</h1>
      <p className="subtitle">Переводчик аудио в реальном времени</p>
      
      <div className="controls">
        {!isRecording ? (
          <button 
            className="btn" 
            onClick={startRecording}
            disabled={isProcessing}
          >
            🎤 Записать
          </button>
        ) : (
          <button 
            className="btn recording" 
            onClick={stopRecording}
          >
            ⏹️ Остановить
          </button>
        )}
        
        {(transcription || translation) && (
          <button 
            className="btn" 
            onClick={resetApp}
            style={{ background: 'linear-gradient(135deg, #6c757d, #495057)' }}
          >
            🔄 Сбросить
          </button>
        )}
      </div>
      
      {status && (
        <div className={`status ${isRecording ? 'recording' : isProcessing ? 'processing' : ''}`}>
          {isProcessing && <div className="spinner"></div>}
          {status}
        </div>
      )}
      
      {error && (
        <div className="status error">
          ❌ {error}
        </div>
      )}
      
      {(transcription || translation || isProcessing) && (
        <div className="results">
          <div className="result-section">
            <h3>🎯 Транскрипция</h3>
            <div className="result-text">
              {isProcessing && !transcription ? (
                <div className="loading">
                  <div className="spinner"></div>
                  Обработка...
                </div>
              ) : transcription ? (
                transcription
              ) : (
                <div className="loading">Ожидание...</div>
              )}
            </div>
          </div>
          
          <div className="result-section">
            <h3>🇪🇸 Перевод</h3>
            <div className="result-text">
              {isProcessing && transcription && !translation ? (
                <div className="loading">
                  <div className="spinner"></div>
                  Перевод...
                </div>
              ) : translation ? (
                translation
              ) : (
                <div className="loading">Ожидание...</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
