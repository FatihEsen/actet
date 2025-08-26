# CDN Dependencies for Browser Version

## Core React Libraries
- React 18: https://unpkg.com/react@18/umd/react.production.min.js
- React DOM 18: https://unpkg.com/react-dom@18/umd/react-dom.production.min.js
- Babel Standalone: https://unpkg.com/@babel/standalone/babel.min.js

## State Management
- Zustand: https://unpkg.com/zustand@4/esm/index.mjs

## Styling
- Tailwind CSS: https://cdn.tailwindcss.com

## Animations & Effects
- Framer Motion: https://unpkg.com/framer-motion@10/dist/framer-motion.js
- React Spring: https://unpkg.com/@react-spring/web@9/dist/react-spring-web.umd.js

## Utilities
- Clsx: https://unpkg.com/clsx@2/dist/clsx.js
- QR Code React: https://unpkg.com/qrcode.react@3/lib/index.js

## Router
- React Router DOM: https://unpkg.com/react-router-dom@6/index.js

## Fonts
- Orbitron: https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900
- Rajdhani: https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700

## Usage in HTML
```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://cdn.tailwindcss.com"></script>
```

## Alternative: npm install
```bash
npm install react react-dom react-router-dom zustand framer-motion clsx
npm install -D @types/react @types/react-dom typescript vite tailwindcss
```