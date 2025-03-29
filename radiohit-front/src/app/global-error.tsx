"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Ошибка!</h2>
        <button onClick={() => reset()}>Попробовать снова</button>
      </body>
    </html>
  );
}
