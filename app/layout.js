import { Geist } from "next/font/google";
import "./globals.css";
import { TaskProvider } from "./context/TaskContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dayahead | Plan your day",
  description: "Organize your tasks and plan your day with Dayahead.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TaskProvider>{children}</TaskProvider>
      </body>
    </html>
  );
}
