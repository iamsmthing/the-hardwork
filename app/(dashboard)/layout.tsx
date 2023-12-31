import GlassPane from "@/components/GlassPane";

import Sidebar from "@/components/Sidebar";
import "@/styles/global.css";
interface AuthRootLayoutProps {
  children: React.ReactNode; // or the appropriate type for your children
}
export default function DashboardRootLayout({ children }: AuthRootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="./favicon.ico" />
        <title>The Hardwork</title>
      </head>
      <body className="h-screen w-screen candy-mesh p-6">
        <GlassPane className="w-full h-full flex items-start ">
          <Sidebar />

          {children}
        </GlassPane>
        <div id="modal"></div>
      </body>
    </html>
  );
}
