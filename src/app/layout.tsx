import "./globals.css";
import ReactQueryProvider from "../GlobalSetup/ReactQuery/ReactQuryProviders";
import { OrderProvider } from "@/context/order/OrdersContext";
import { UserInfoContextProvider } from "@/context/users/userInfoContext";
import { GlobalContextProvider } from "@/context/Global/GlobalContext";
import { Toaster } from "react-hot-toast";
import { CartContextProvider } from "@/context/cart/CartContext";
import Root from "./components/Root";
import LayerMask from "./components/LayerMask";
import { WhichCatigoryContextProvider } from "@/context/store/WhichCatigoryContext";

export const metadata = {
  title: "السوق",
  description: "comperhancev E-Commerce app",
  icons: {
    icon: "/assets/Logo.png",
    shortcut: "/assets/Logo.png",
    apple: "/assets/Logo.png",
  },
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body dir='rtl'  className={`relative overflow-x-hidden antialiased`} >
        <OrderProvider>
          <CartContextProvider>
            <GlobalContextProvider>
              <UserInfoContextProvider>
                <WhichCatigoryContextProvider>
                  <ReactQueryProvider>
                    <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
                    {children}
                    <LayerMask/>
                    {/* <CustomeNotification/> */}
                  </ReactQueryProvider>
                </WhichCatigoryContextProvider>
              </UserInfoContextProvider>
            </GlobalContextProvider>
          </CartContextProvider>
        </OrderProvider>
      </body>
    </html>
  );
}
