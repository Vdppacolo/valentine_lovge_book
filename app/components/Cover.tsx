"use client";

export default function Cover({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="card w-full max-w-lg bookCover">
      <div className="coverInner">
        <div className="badge">Valentine’s Edition</div>
        <h1 className="title big">18 Reasons I Love You</h1>
        <p className="sub">
          A little book, just for you.
        </p>

        <div className="divider" />

        <button className="btn btnBig" onClick={onOpen}>
          Open the book
        </button>

        <p className="hint" style={{ marginTop: 14 }}>
          Tip: click the right page to go forward, left page to go back.
        </p>
      </div>
    </div>
  );
}
