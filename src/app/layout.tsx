import MoralisProvider from "@/components/MoralisProvider";
import NavBar from "@/components/NavBar";
import "./globals.css";

export const metadata = {
  title: "Moralis Web3 API - Playground",
  description: "Moralis Web3 API - Playground",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <MoralisProvider>
        <body>
          <NavBar />
          <main>
            <div className="container mx-auto py-5">{children}</div>
          </main>
        </body>
      </MoralisProvider>
    </html>
  );
}
