import { FormEvent, useState } from 'react';

import useStreamData from '~/useStreamData';
const DEFAULT_WORD_COUNT = 100;

export default function Home() {
  const { data, stream, isStreaming } = useStreamData();
  const [wordCount, setWordCount] = useState(String(DEFAULT_WORD_COUNT));

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setWordCount(e.currentTarget.value);
  };

  const startStream = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    stream(wordCount);
  };

  return (
    <main className='flex flex-col gap-4 p-12'>
      <h1 className='pb-8 text-2xl text-center'>Next.js Edge Function Streaming Test</h1>
      <form onSubmit={startStream}>
        <input
          className='px-2 py-2 mr-4 border rounded-md border-violet-200 focus:outline-2 outline-violet-500'
          type='text'
          placeholder='how many words?'
          onChange={handleChange}
        />
        <button
          className={`w-32 px-4 py-2 antialiased font-bold text-white border rounded-md bg-violet-500 ${
            isStreaming && 'cursor-not-allowed'
          }`}
          disabled={isStreaming}
        >
          {isStreaming ? 'Streaming' : 'Start'}
        </button>
      </form>
      <div className='w-full px-4 py-2 whitespace-pre-wrap border rounded-sm border-violet-50'>
        {data || 'Click Start to stream some data...'}
      </div>
    </main>
  );
}
