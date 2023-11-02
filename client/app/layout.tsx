import "./globals.css";
import { QueryWrapper } from "@/shared/utils";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head />
      <body>
        <QueryWrapper>{children}</QueryWrapper>
      </body>
    </html>
  );
}
