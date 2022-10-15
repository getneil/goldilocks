import { useState, useEffect } from "preact/hooks";
import { Button } from "../components/Button.tsx";

import { useLiveDocument } from "../libs/firestore.ts";
import { increment } from "https://cdn.skypack.dev/@firebase/firestore";

interface CounterProps {
  start: number;
}

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState(props.start);

  const { data: counter, update } = useLiveDocument('counters/count1');
  console.log(counter)

  return (
    <div class="flex gap-2 w-full">
      <p class="flex-grow-1 font-bold text-xl">{counter.n}</p>
      <Button onClick={() => update({ n: increment(-1) })}>-1</Button>
      <Button onClick={() => update({ n: increment(1) })}>+1</Button>
    </div>
  );
}

/**
 * try to use firestore
 *  increase count
 *  also onSnapshot
 */