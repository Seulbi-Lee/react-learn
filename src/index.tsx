import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// index.tsx - App.tsx - pages/main.page.tsx - (components/calendar/index,ts) - components/calender.component.tsx
// index.tsx : App을 불러 옴
// App.tsx : page들을 부름
// xxx.page.tsx : components/xxx 폴더에 있는 index를 가져옴
// components/xxx/index.ts : components/xxx 에 index 파일이 있는 경우 index를 우선으로 불러옴(생략가능)
// components/xxx/ooo.tsx : component들을 ooo 폴더에 모아둠

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
