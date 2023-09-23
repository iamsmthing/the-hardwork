import GlassPane from "@/components/GlassPane";
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
        <title>Next</title>
      </head>
      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full flex items-center justify-center">
          {children}
        </GlassPane>
      </body>
    </html>
  );
}
