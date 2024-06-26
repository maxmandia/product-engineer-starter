import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryClientProvider } from "@/components/react-query";

interface IRootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout(props: IRootLayoutProps) {
    const { children } = props;

    return (
        <ReactQueryClientProvider>
            <html lang="en">
                <head></head>
                <body>
                    {children}
                    <div id="modal" />
                    <Toaster />
                </body>
            </html>
        </ReactQueryClientProvider>
    );
}
