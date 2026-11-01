import './globals.css';import type {Metadata} from 'next';import {Header} from '@/components/layout/header';import {Footer} from '@/components/layout/footer';import {StoreProvider} from '@/providers/store-provider';import {brand} from '@/config/brand';
export const metadata:Metadata={title:{default:brand.name,template:`%s | ${brand.name}`},description:brand.description};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><StoreProvider><Header/><main>{children}</main><Footer/></StoreProvider></body></html>}
