import { useState, useCallback, memo } from "react"
import { IconChevronRight, IconFolder, IconFile } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"

type Node = {
  name: string
  nodes?: Node[]
}

interface FilesystemItemProps {
  node: Node
  animated?: boolean
}

// 1. Move static data outside the component to prevent recreation on every render
const fileUrlMap: Record<string, string> = {
  "UxUnite.ds": "/UxUnite-case",
  "Aurora.ds": "/Aurora-case",
  "CloudFirst.web": "/CloudFirst-case",
  "Astra.web": "/Astra-case",
  "ITworkshop.web": "/ITworkshop-case",
  "Firefly.shop": "/Firefly-case",
  "Aurora.shop": "/Aurora-shop",
  "BillPay": "/BillPay-case",
  "Artsy.app": "/Artsy-case",
}

// 2. Extract sub-components to prevent "unmount/remount" flicker issues and improve diffing performance
const ChevronIcon = ({ isOpen, animated }: { isOpen: boolean; animated: boolean }) => {
  if (animated) {
    return (
      <motion.span
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="flex"
      >
        <IconChevronRight className="size-4 text-gray-500" />
      </motion.span>
    )
  }
  return (
    <IconChevronRight
      className={`size-4 text-gray-500 transition-transform duration-200 ${
        isOpen ? "rotate-90" : ""
      }`}
    />
  )
}

// 3. Wrap in memo to prevent unnecessary re-renders of the entire tree when one node changes
export const FilesystemItem = memo(function FilesystemItem({
  node,
  animated = false,
}: FilesystemItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isFolder = !!(node.nodes && node.nodes.length > 0)

  // 4. Use useCallback to keep event handler references stable
  const handleMouseEnter = useCallback(() => {
    if (isFolder) return
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("case:open", { detail: { name: node.name } })
      )
    }
  }, [isFolder, node.name])

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (isFolder) {
        // Optional: Toggle folder on click of the text itself, not just the chevron/button
        // setIsOpen(prev => !prev); 
        return;
    }

    const url = fileUrlMap[node.name]
    if (url) {
      e.preventDefault()
      window.location.href = url
    }
  }, [isFolder, node.name])

  return (
    <li className="list-none w-full min-w-0">
      {isFolder ? (
        <div className="flex flex-col">
          <span className="text-black dark:text-white lg:text-lg min-w-0 block">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex w-full bg-white dark:bg-neutral-800 rounded-lg items-center gap-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none mt-2 p-3 transition-colors"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Collapse folder" : "Expand folder"}
            >
              <ChevronIcon isOpen={isOpen} animated={animated} />

              <IconFolder
                className={`size-6 text-orange-300 fill-orange-300 ${
                  node.nodes && node.nodes.length === 0 ? "ml-4 md:ml-12" : ""
                }`}
              />
              <span className="font-medium truncate">{node.name}</span>
            </button>
          </span>

          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.ul
                initial={animated ? { height: 0, opacity: 0 } : undefined}
                animate={animated ? { height: "auto", opacity: 1 } : undefined}
                exit={animated ? { height: 0, opacity: 0 } : undefined}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="pl-4 overflow-hidden flex flex-col justify-end"
              >
                {node.nodes?.map((n) => (
                  <FilesystemItem node={n} key={n.name} animated={animated} />
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <a
          href={fileUrlMap[node.name] || "#"}
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
          className="group mt-2 flex w-full text-black dark:text-white text-base items-center gap-1.5 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none cursor-pointer transition-colors"
          aria-label={`View ${node.name} project details`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleClick(e as any)}
        >
          <IconFile className="size-6 text-sky-500 dark:text-sky-400 shrink-0" />
          <span className="underline-offset-2 group-hover:underline truncate min-w-0">
            {node.name}
          </span>
        </a>
      )}
    </li>
  )
})