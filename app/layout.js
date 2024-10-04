import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/Components/Nav";
import Provider from "@/Components/Provider";

export const metadata = {
  title:"Promtopia",
  description:'Discover & Share AI Prompts'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>
      <Provider>
      <div className='main'>
        <div className='gradient' />
      </div> 
      <main className='app'>
        <Nav/>
          {children}
      </main>
      </Provider>
    </body>
    </html>
  );
}