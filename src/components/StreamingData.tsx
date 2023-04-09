import { FormEvent, useEffect, useRef, useState } from 'react';

import useStreamData from '~/hooks/useStreamingData';

const DEFAULT_WORD_COUNT = 100;

export default function StreamingData() {
  const { data, stream, isStreaming } = useStreamData();
  const [wordCount, setWordCount] = useState<string>(String(DEFAULT_WORD_COUNT));
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setWordCount(e.currentTarget.value);
  };

  const startStream = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    stream(wordCount);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'nearest', inline: 'start' });
  }, [data]);

  return (
    <>
      {' '}
      <form onSubmit={startStream}>
        <input
          className='w-24 px-2 py-2 mr-4 border rounded-md border-violet-200 focus:outline-2 outline-violet-500'
          type='text'
          placeholder='wordcount'
          defaultValue={wordCount}
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
      <div className='bg-white w-full px-4 py-2 overflow-auto whitespace-pre-wrap border rounded-md h-[calc(100vh-210px)] border-violet-100'>
        {data || 'Click Start to stream some data...'}
        <div ref={bottomRef}></div>
      </div>
    </>
  );
}
