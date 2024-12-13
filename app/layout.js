import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { dbConnect } from "@/service/dbConnect";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
   subsets: ["latin"],
   variable: "--font-poppins",
   weight: ["400", "700"],
});

export const metadata = {
   title: "EduConnect",
   description: "World's Best Learning Platform",
};

export default async function RootLayout({ children }) {
   const cnn = await dbConnect()
   console.log(cnn);
   
   return (
      <html lang="en">
         <body className={cn(inter.className, poppins.className)}>
            {children}
            <Toaster richColors position="top-center" />
         </body>
      </html>
   );
}
