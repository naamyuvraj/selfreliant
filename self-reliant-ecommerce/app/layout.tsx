import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import { UserProvider } from "./context/UserContext"; // NEW

export const metadata: Metadata = {
  title: "Self Reliant - Artisan Marketplace",
  description: "Discover authentic handcrafted products from talented artisans",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <UserProvider>
          <ProductsProvider>
            <CartProvider>{children}</CartProvider>
          </ProductsProvider>
        </UserProvider>
      </body>
    </html>
  );
}
