import reasons from "./reason";

export type BookPage = {
    title: string;
    body: string;
};

export const pages: BookPage[] = [
    {
        title: "For you 💌",
        body:
            "Hi my love,\n\nI made you a little book. Turn the pages whenever you want.\n\nLove always,\n— Me",
    },

    // 18 Reasons (Pages 2–19)
    ...reasons.map((text, i) => ({
        title: `Reason #${i+1}`,
        body: text,
    })),

    {
        title: "Happy Valentine’s Day ❤️",
        body:
            "No matter what, you’re my favourite person.\n\nThank you for being you.\n\nForever yours.",
    },
];
