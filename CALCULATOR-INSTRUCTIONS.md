# Инструкция: AI Cost Calculator для сайта OoMuS

## Что это
React-компонент — калькулятор экономии для клиентов. Клиент вводит свои расходы на традиционные фотосъёмки, получает сравнение со стоимостью AI-контента и процент экономии. В конце — кнопка "Discuss Your Project" (ведёт на mailto:oomustudio@proton.me).

## Файл
`ai-cost-calculator.jsx` — один файл, всё внутри, никаких зависимостей кроме React.

## Куда поставить
**После бегущей строки, перед секцией с моделями.** Это должен быть один из первых интерактивных элементов, который видит посетитель.

## Стилизация
Компонент уже оформлен в стиле сайта:
- Фон: `#0B0B0C`
- Золото: `#C9A876`
- Крем: `#F4F0E7`
- Карточки: `#141414`
- Шрифты: Cormorant Garamond (заголовки) + Jost (тело)

**Важно:** убедись, что Google Fonts подключены для обоих шрифтов. Если на сайте уже подключены — ничего делать не нужно.

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
```

## Что можно поменять
- **CTA кнопка** — сейчас `mailto:oomustudio@proton.me`. Если нужно вести на контактную форму на сайте или в DM — поменяй href в компоненте (строка с `<a href="mailto:...">`)
- **Внутренняя цена за визуал** — переменная `aiPricePerShot` в начале компонента (сейчас 45). Эта цифра НЕ видна клиенту, используется только для расчёта
- **Обёртка** — компонент занимает `minHeight: 100vh` с центрированием. При встраивании в страницу убери `minHeight: "100vh"` и поменяй padding на нужный

## Как встроить
Если сайт на React — просто импортируй компонент:
```jsx
import CostCalculator from './ai-cost-calculator';
// в нужном месте:
<CostCalculator />
```

Если сайт на чистом HTML/JS — нужно обернуть в React render:
```html
<div id="calculator-root"></div>
<script type="module">
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import CostCalculator from './ai-cost-calculator.jsx';
  ReactDOM.createRoot(document.getElementById('calculator-root')).render(React.createElement(CostCalculator));
</script>
```

Или переписать компонент на ванильный JS — если сайт без React, скажи, перепишу.

## Вопросы
Если что-то непонятно — пиши Веронике, разберёмся.
