import Home from "../page";

export function generateStaticParams() {
  return [
    { path: ["learning"] },
    { path: ["practice", "problems"] },
    { path: ["practice", "contests"] },
    { path: ["practice", "test"] },
    { path: ["leaderboard"] },
  ];
}

export default function SectionPage() {
  return <Home />;
}
