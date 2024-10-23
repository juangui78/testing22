import { Inter } from "next/font/google";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
import Provider from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MyView_",
  description: "Tu mejor vista",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
    <head>
      <title>MyView_</title>
    </head>
    <body className={`${inter.className} h-screen`}>
        <Provider>
          <NextUIProvider>
              {children}
          </NextUIProvider>
        </Provider>
      </body>
    </html>
  );
}
