import type { Metadata } from "next";
import "./lesson.css";

export const metadata: Metadata = {
  title: "Morrow — Grade 10 Mathematics",
  description: "A thoughtful, interactive learning space for Grade 10 MYP 5 mathematics.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
