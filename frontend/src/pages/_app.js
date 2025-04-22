import '../styles/global.scss';

import { Manuale, Licorice } from 'next/font/google';

const manuale = Manuale({ subsets: ['latin'] });
const licorice = Licorice ({ subsets: ['latin'],weight: '400', });

export const licoriceFont = licorice;

export default function App({ Component, pageProps }) {
  return (
    <main className={manuale.className}>
      <Component {...pageProps} />
    </main>
    );
}
