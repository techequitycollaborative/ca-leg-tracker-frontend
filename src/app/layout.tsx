import '@/styles/globals.css';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Navbar from '@/components/navbar';

export const metadata = {
  title: 'CA Leg Tracker',
  description: 'Leg tracker'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Navbar />
        <main className="w-full bg-gray-200 p-4">
          <div className="max-w-screen-xl m-auto">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
