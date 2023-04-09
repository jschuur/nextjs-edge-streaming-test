import { useState } from 'react';

export default function useStreamData() {
  const [data, setData] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  const stream = async (wordCount: string) => {
    setIsStreaming(true);

    const response = await fetch('/api/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wordCount }),
    });

    if (!response.ok) throw new Error(response.statusText);

    const data = response.body;
    if (!data) return;

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      setData((prev) => prev + chunkValue + ' ');
    }

    setData((prev) => prev + '\n\n');
    setIsStreaming(false);
  };

  return {
    data,
    stream,
    isStreaming,
  };
}
