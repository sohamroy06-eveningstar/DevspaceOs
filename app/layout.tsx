import "./globals.css";
import { TRPCProvider } from "@/providers/trpc-provider";
import {Toaster} from "react-hot-toast"

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
        <TRPCProvider>{children}
             <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#161b22",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
            },
          }}
        />
        </TRPCProvider>
      </body>
    </html>
  );
}