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
        <main className="w-full bg-gray-200 p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
