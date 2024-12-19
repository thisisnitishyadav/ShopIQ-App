
import "./globals.css";


export const metadata = {
  title: "ShopIQ",
  description: "A fully functional product listing app built with Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
