// pages/_document.tsx (пример)
import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';

export default function Document(props: DocumentProps) {
  return (
    <Html lang="ru">
      <Head>
        {/* ЭТОТ СКРИПТ КРИТИЧЕСКИ ВАЖЕН */}
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}