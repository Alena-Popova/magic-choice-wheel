# Magic Choice Wheel

## Запуск

```bash
cd /Users/alenapopova/projects/personal/magic-choice-wheel && python3 -m http.server 8123
```

## Остановка

Найти процесс на порту:

```bash
lsof -i :8123
```

Остановить по PID:

```bash
kill PID
```

Или одной командой:

```bash
kill $(lsof -t -i :8123)
```

## Локальные URL

- Основной конфиг:
  `http://localhost:8123/Main-Page-Wheel.html`
- Учебный шаблон:
  `http://localhost:8123/Main-Page-Wheel.html?config=wheel-config-study-session.json`
