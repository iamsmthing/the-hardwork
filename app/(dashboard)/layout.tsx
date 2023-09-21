import GlassPane from "@/components/GlassPane";

import Sidebar from "@/components/Sidebar";
import "@/styles/global.css";
export default function DashboardRootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Next</title>
      </head>
      <body className="h-screen w-screen candy-mesh p-6">
        <GlassPane className="w-full h-full flex items-start ">
          <Sidebar />

          {children}
        </GlassPane>
      </body>
    </html>
  );
}
