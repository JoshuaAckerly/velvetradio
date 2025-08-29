import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="bg-[var(--background)]">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;