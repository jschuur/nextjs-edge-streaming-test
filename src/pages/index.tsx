import StreamingData from '~/components/StreamingData';

export default function Home() {
  return (
    <main className='flex flex-col gap-4 p-12'>
      <h1 className='pb-8 text-2xl text-center'>Next.js Edge Function Streaming Test</h1>
      <StreamingData />
    </main>
  );
}
