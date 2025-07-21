// layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Productivity App',
  description: 'Track your tasks, reminders, and goals.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white font-sans">
        <header className="sticky top-0 z-50 bg-gray-800 shadow-md">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold">My Productivity App</h1>
            <ul className="hidden sm:flex gap-6 text-sm">
              <li className="hover:text-blue-400 cursor-pointer">Home</li>
              <li className="hover:text-blue-400 cursor-pointer">Settings</li>
              <li className="hover:text-blue-400 cursor-pointer">About</li>
            </ul>
          </nav>
          <div className="bg-gray-700 text-sm px-4 py-2">
            <nav className="max-w-7xl mx-auto text-gray-300">
              Home / Dashboard
            </nav>
          </div>
        </header>
        <main className="min-h-screen p-6">{children}</main>
      </body>
    </html>
  );
}
