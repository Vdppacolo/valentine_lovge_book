"use client";

import { useMemo, useState } from "react";

export default function LockScreen({
                                       attempts,
                                       onUnlock,
                                   }: {
    attempts: number;
    onUnlock: (input: string) => void;
}) {
    const [value, setValue] = useState("");

    const hint = useMemo(() => {
        if (attempts < 2) return "Hint: it’s something meaningful to us ✨";
        if (attempts < 4) return "Hint: try a date (DDMM) or our initials 💭";
        return "Okay okay… it’s the code you’d expect 😉";
    }, [attempts]);

    return (
        <div className="card w-full max-w-md">
            <div className="badge">Locked</div>
            <h1 className="title">A book for my Valentine</h1>
            <p className="sub">
                Enter the code to open it.
            </p>

            <div className="row">
                <input
                    className="input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter code…"
                    inputMode="numeric"
                />
                <button
                    className="btn"
                    onClick={() => onUnlock(value)}
                >
                    Unlock
                </button>
            </div>

            <p className="hint">{hint}</p>

            {attempts >= 1 && <p className="error">Not quite — try again 💞</p>}
        </div>
    );
}
