# Wedding Photography

[🇬🇧 English](./README.md) · 🇺🇦 Українська

Адаптивний лендинг для весільного фотографа. Командний навчальний проєкт,
створений під час курсу GoIT.

**Жива версія:** https://LionnoiL.github.io/wedding-photography/

## Стек технологій

- [Vite](https://vitejs.dev/) — збірник і дев-сервер
- Vanilla HTML / CSS / JavaScript (ES-модулі)
- [modern-normalize](https://github.com/sindresorhus/modern-normalize) — скидання стилів
- [vite-plugin-html-inject](https://www.npmjs.com/package/vite-plugin-html-inject)
  — розбиття сторінки на HTML-партіали
- [postcss-sort-media-queries](https://www.npmjs.com/package/postcss-sort-media-queries)
  — сортування медіазапитів за принципом mobile-first

## Підготовка до роботи

1. Встанови LTS-версію [Node.js](https://nodejs.org/en/).
2. Встанови залежності:
   ```bash
   npm install
   ```
3. Запусти режим розробки (з гарячим перезавантаженням):
   ```bash
   npm run dev
   ```
   Відкрий http://localhost:5173 — сторінка автоматично оновлюється після
   збереження змін.

## Команди

| Команда           | Опис                                        |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Запуск дев-сервера                          |
| `npm run build`   | Збірка продакшн-версії у папку `dist/`      |
| `npm run preview` | Локальний перегляд продакшн-збірки          |

## Структура проєкту

```
src/
├── index.html      # точка входу, імпортує партіали
├── main.js         # точка входу JavaScript
├── partials/       # розмітка секцій (вставляється в index.html)
├── css/            # стилі
├── img/            # зображення (оптимізуються під час збірки)
└── public/         # статичні файли, що копіюються як є
```

- **Секції** лежать у `src/partials/` та вставляються в `index.html`:
  header, hero, about, benefits, portfolio, feedbacks, faq, contacts, footer,
  а також компоненти `loader` і `modal`.
- **Стилі** — у папці `src/css/`.
- **Зображення** — у папці `src/img/`, збірник оптимізує їх автоматично.

## Адаптивні брейкпоінти

Верстка mobile-first із трьома брейкпоінтами:

- **320px** — мобільний
- **768px** — планшет
- **1440px** — десктоп

## Робочий процес

- Задачі ведуться як GitHub Issues на
  [дошці проєкту](https://github.com/users/LionnoiL/projects/2) — по одному issue
  на секцію/компонент.
- Береш issue, створюєш гілку, відкриваєш Pull Request і привʼязуєш його до issue.
- Після мержу в `main` GitHub Actions (`.github/workflows/deploy.yml`) виконує
  лінтинг, збірку та деплой проєкту в гілку `gh-pages`.

## Деплой

Деплой автоматичний. Кожен пуш у гілку `main` запускає GitHub Action, який
збирає проєкт і публікує його на GitHub Pages. Якщо жива сторінка порожня —
перевір у консолі браузера помилки 404 для CSS/JS: зазвичай причина в
неправильному прапорі `--base` у скрипті `build` (має збігатися з назвою
репозиторію).

## Команда

Командний проєкт курсу GoIT. Учасники — на сторінці
[Contributors](https://github.com/LionnoiL/wedding-photography/graphs/contributors)
репозиторію.
