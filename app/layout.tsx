import GlassPane from "@/components/GlassPane";
import "@/styles/styles.scss";
import "@/styles/global.css";

interface AuthRootLayoutProps {
  children: React.ReactNode; // or the appropriate type for your children
}
export default function AuthRootLayout({ children }: AuthRootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="./favicon.ico" />

        <title>The Hardwork</title>
      </head>
      <body className="h-screen w-screen rainbow-mesh p-6">{children}</body>
    </html>
  );
}
