import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Inter } from "next/font/google";
import  { Toaster } from 'react-hot-toast';
import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId="776492683715-r66moiulaqs33k8s3ofur8b8pfa6j1mp.apps.googleusercontent.com">
    <div className={inter.className}>
      <Component {...pageProps} />
      <Toaster />
    </div>
    </GoogleOAuthProvider>
  );
}
