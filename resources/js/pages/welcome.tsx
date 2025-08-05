import React from "react";
import Main from "@/layouts/main";

const Welcome: React.FC = () => {
    return (
        <Main>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <h2>Welcome to Velvet Radio</h2>
                <p>Your go-to platform for streaming the best music online.</p>
            </div>
        </Main>
    );
};

export default Welcome;