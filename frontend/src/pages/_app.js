import "@/styles/globals.css";
import { Manuale } from 'next/font/google';

const manuale = Manuale({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <main className={manuale.className}>
      <Component {...pageProps} />
    </main>
    );
}
