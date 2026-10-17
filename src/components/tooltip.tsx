import React, { useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { IconExternalLink } from "@tabler/icons-react"

interface TooltipProps {
    content: string;
    children: ReactNode;
    wrapperClassName?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, wrapperClassName = "inline-block" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust this breakpoint as needed
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleMouseEnter = useCallback(
        (e: React.MouseEvent) => {
            if (!isMobile) {
                setIsVisible(true);
                setPosition({ x: e.clientX, y: e.clientY });
            }
        },
        [isMobile]
    );

    const handleMouseLeave = useCallback(() => {
        setIsVisible(false);
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
    }, []);

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            className={wrapperClassName}
        >
            {children}
            {isVisible && !isMobile && createPortal(
                <div
                    className="fixed z-40 px-4 py-2 text-sm text-white bg-neutral-800 dark:bg-neutral-200 dark:text-neutral-800 rounded-full shadow-lg pointer-events-none flex items-center"
                    style={{
                        left: `${position.x + 10}px`,
                        top: `${position.y + 10}px`,
                    }}
                    role="tooltip"
                >
                    {content}
                    {React.isValidElement(children) &&
                        typeof children.type === "string" &&
                        children.type === "a" && <IconExternalLink className="w-3 h-3 ml-1" />}
                </div>,
                document.body
            )}
        </div>
    );
};

export default Tooltip;
