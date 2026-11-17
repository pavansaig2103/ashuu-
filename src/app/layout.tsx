import type { Metadata } from 'next';
import './globals.css';
import './refinements.css';
export const metadata: Metadata = {title:'ASHWAK — Our Little Universe',description:'Some people become a universe of their own. A friendship since September 2023.',icons:{icon:'/icon.svg'}};
export default function Layout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
