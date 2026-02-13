"use client";

import { useMemo, useState } from "react";
import LockScreen from "@/app/components/Lockscreen";
import Cover from "@/app/components/Cover";
import Book from "@/app/components/Book";
import {pages} from "@/app/data/pages";

type Stage = "lock" | "cover" | "read";

export default function Home() {
  const [stage, setStage] = useState<Stage>("lock");
  const [attempts, setAttempts] = useState(0);

  const code = useMemo(() => (process.env.NEXT_PUBLIC_BOOK_CODE ?? "").trim(), []);

  return (
      <main className="appRoot bg">
      {stage === "lock" && (
            <LockScreen
                attempts={attempts}
                onUnlock={(input) => {
                  if (!code) {
                    // If you forgot to set .env.local, just let it in.
                    setStage("cover");
                    return;
                  }
                  if (input.trim() === code) setStage("cover");
                  else setAttempts((a) => a + 1);
                }}
            />
        )}

        {stage === "cover" && (
            <Cover
                onOpen={() => setStage("read")}
            />
        )}

        {stage === "read" && (
            <Book
                pages={pages}
                onExit={() => setStage("cover")}
            />
        )}
      </main>
  );
}
