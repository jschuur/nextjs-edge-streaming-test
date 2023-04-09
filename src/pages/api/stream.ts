import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum();

const DELAY_PER_WORD = 20;

export const config = {
  runtime: 'edge',
};

interface Request {
  json(): Promise<{ wordCount?: string }>;
}

const delay = (ms: number): Promise<void> =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export default async function handler(req: Request): Promise<Response> {
  const { wordCount } = await req.json();

  if (!wordCount) return new Response('Missing wordCount', { status: 400 });

  const words = lorem.generateWords(parseInt(wordCount, 10) | 25).split(' ');

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for (const word of words) {
        await delay(DELAY_PER_WORD);

        const chunk = encoder.encode(word);
        controller.enqueue(chunk);
      }

      controller.close();
    },
  });

  return new Response(stream);
}
