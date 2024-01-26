import '@/styles/globals.css';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Navbar from '@/components/navbar';
import { getSession } from 'lib/session';

export const metadata = {
  title: 'CA Legislation Tracker',
  description: 'A toolkit for tracking bills in the CA legislature',
  icons: {
    icon: '/favicon.png',
  },
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getSession() as any;

  return (
    <html lang="en">
      <body className="min-h-screen">
        <Header />
        <Navbar
          dashboardName={session.dashboard?.dashboardName}
          userName={session.user?.userName}
        />
        <main className="w-full p-4">
          <div className="max-w-screen-xl m-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
