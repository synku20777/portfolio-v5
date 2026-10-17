"use client";

import { useState, useEffect } from "react";

function getCurrentRigaTime() {
    return new Date().toLocaleTimeString("en-GB", {
        timeZone: "Europe/Riga",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

export default function RigaTimeClock() {
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        const update = () => setTime(getCurrentRigaTime());
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <span className="tabular-nums">{time ?? "--:--"}</span> Riga, Latvia
        </div>
    );
}
