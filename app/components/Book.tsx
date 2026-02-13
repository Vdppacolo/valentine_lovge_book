"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {BookPage} from "@/app/data/pages";

type FlipDir = "next" | "prev";

export default function Book({
                                 pages,
                                 onExit,
                             }: {
    pages: BookPage[];
    onExit: () => void;
}) {
    // currentSpread is always even: 0,2,4...
    const [currentSpread, setCurrentSpread] = useState(0);
    const [flipping, setFlipping] = useState<null | FlipDir>(null);

    const leftIndex = currentSpread;
    const rightIndex = currentSpread + 1;

    const left = pages[leftIndex];
    const right = pages[rightIndex];

    const canPrev = currentSpread - 2 >= 0;
    const canNext = currentSpread + 2 < pages.length;

    const pageCount = pages.length;

    const spreadLabel = useMemo(() => {
        const l = leftIndex + 1;
        const r = rightIndex + 1;
        return `${l}–${Math.min(r, pageCount)}/${pageCount}`;
    }, [leftIndex, rightIndex, pageCount]);

    function doFlip(dir: FlipDir) {
        if (flipping) return;
        if (dir === "next" && !canNext) return;
        if (dir === "prev" && !canPrev) return;

        setFlipping(dir);

        // After animation, update spread
        window.setTimeout(() => {
            setCurrentSpread((s) => (dir === "next" ? s + 2 : s - 2));
            setFlipping(null);
        }, 520);
    }

    return (
        <div className="w-full max-w-5xl">
            <div className="topBar">
                <button className="btn ghost" onClick={onExit}>Back to cover</button>
                <div className="spreadMeta">{spreadLabel}</div>
                <div className="topActions">
                    <button className="btn ghost" onClick={() => doFlip("prev")} disabled={!canPrev || !!flipping}>
                        ←
                    </button>
                    <button className="btn ghost" onClick={() => doFlip("next")} disabled={!canNext || !!flipping}>
                        →
                    </button>
                </div>
            </div>

            <div className="bookShell">
                <div className="book">
                    {/* Left page */}
                    <div
                        className={`page left ${canPrev ? "clickable" : ""}`}
                        onClick={() => doFlip("prev")}
                        role="button"
                    >
                        <PageContent page={left} pageNumber={leftIndex + 1} />
                    </div>

                    {/* Spine */}
                    <div className="spine" />

                    {/* Right page */}
                    <div
                        className={`page right ${canNext ? "clickable" : ""}`}
                        onClick={() => doFlip("next")}
                        role="button"
                    >
                        {right ? (
                            <PageContent page={right} pageNumber={rightIndex + 1} />
                        ) : (
                            <div className="pageInner">
                                <div className="pageNum">{rightIndex + 1}</div>
                            </div>
                        )}
                    </div>

                    {/* Flip overlay */}
                    <AnimatePresence>
                        {flipping === "next" && (
                            <motion.div
                                className="flipOverlay flipFromRight"
                                initial={{ rotateY: 0 }}
                                animate={{ rotateY: -180 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.52, ease: "easeInOut" }}
                            >
                                <div className="pageOverlayFace">
                                    <div className="pageOverlayInner">
                                        <div className="overlayHint">Turning…</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {flipping === "prev" && (
                            <motion.div
                                className="flipOverlay flipFromLeft"
                                initial={{ rotateY: 0 }}
                                animate={{ rotateY: 180 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.52, ease: "easeInOut" }}
                            >
                                <div className="pageOverlayFace">
                                    <div className="pageOverlayInner">
                                        <div className="overlayHint">Turning…</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bookmark ribbon (pure vibes) */}
                    <div className="ribbon" />
                </div>
            </div>
        </div>
    );
}

function PageContent({ page, pageNumber }: { page: BookPage; pageNumber: number }) {
    return (
        <div className="pageInner">
            <div className="pageNum">{pageNumber}</div>
            <h2 className="pageTitle">{page.title}</h2>
            <p className="pageBody">{page.body}</p>
        </div>
    );
}
