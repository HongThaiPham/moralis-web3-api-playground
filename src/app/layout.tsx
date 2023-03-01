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
      <body>
        <NavBar />

        {children}
      </body>
    </html>
  );
}
