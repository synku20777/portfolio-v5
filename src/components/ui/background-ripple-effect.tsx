"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const BackgroundRippleEffect = ({
  cellSize = 56,
  className,
}: {
  // We removed rows/cols props to enforce responsiveness,
  // but you can add them back as overrides if strictly needed.
  cellSize?: number;
  className?: string;
}) => {
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);
  const [matrix, setMatrix] = useState({ rows: 0, cols: 0 });
  const [initialized, setInitialized] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        // Calculate needed rows/cols to cover dimensions
        const cols = Math.ceil(width / cellSize);
        const rows = Math.ceil(height / cellSize);
        
        // Only update if changed to avoid unnecessary re-renders
        setMatrix((prev) => {
          if (prev.rows === rows && prev.cols === cols) return prev;
          return { rows, cols };
        });
        setInitialized(true);
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [cellSize]);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full overflow-hidden",
        "[--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)]",
        "dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]",
        className
      )}
    >
      {initialized && (
        <div className="relative h-full w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" />
          <DivGrid
            key={`base-${rippleKey}`}
            className="mask-radial-from-20% mask-radial-at-top"
            rows={matrix.rows}
            cols={matrix.cols}
            cellSize={cellSize}
            borderColor="var(--cell-border-color)"
            fillColor="var(--cell-fill-color)"
            clickedCell={clickedCell}
            onCellClick={(row, col) => {
              setClickedCell({ row, col });
              setRippleKey((k) => k + 1);
            }}
            interactive
          />
        </div>
      )}
    </div>
  );
};

type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  cellSize: number; // in pixels
  borderColor: string;
  fillColor: string;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
  interactive?: boolean;
};

type CellStyle = React.CSSProperties & {
  ["--delay"]?: string;
  ["--duration"]?: string;
};

const DivGrid = ({
  className,
  rows,
  cols,
  cellSize,
  borderColor,
  fillColor,
  clickedCell,
  onCellClick,
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols]
  );

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: "fit-content", // Allow it to fit content, parent handles overflow
    height: "fit-content",
    marginInline: "auto",
  };

  return (
    <div className={cn("relative z-[3]", className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay = clickedCell ? Math.max(0, distance * 55) : 0; // ms
        const duration = 200 + distance * 80; // ms

        const style: CellStyle = clickedCell
          ? {
              "--delay": `${delay}ms`,
              "--duration": `${duration}ms`,
            }
          : {};

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform hover:opacity-80 dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]",
              clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
              !interactive && "pointer-events-none"
            )}
            style={{
              width: cellSize,
              height: cellSize,
              backgroundColor: fillColor,
              borderColor: borderColor,
              ...style,
            }}
            onClick={
              interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
            }
          />
        );
      })}
    </div>
  );
};