import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container py-8">{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;