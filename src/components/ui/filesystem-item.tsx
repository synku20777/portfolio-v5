import { useState } from "react"
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

export function FilesystemItem({
  node,
  animated = false,
}: FilesystemItemProps) {
  let [isOpen, setIsOpen] = useState(false)

  const isFolder = !!(node.nodes && node.nodes.length > 0)

  // Map file names to their corresponding URLs
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
  };

  // Handle hover to display gallery
  const handleMouseEnter = () => {
    if (isFolder) return
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("case:open", { detail: { name: node.name } })
      )
    }
  }

  // Handle click to navigate to the case page
  const handleClick = (e: React.MouseEvent) => {
    if (isFolder) return;
    
    const url = fileUrlMap[node.name];
    if (url) {
      e.preventDefault();
      window.location.href = url;
    }
  }

  const ChevronIcon = () =>
    animated ? (
      <motion.span
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="flex"
      >
        <IconChevronRight className="size-4 text-gray-500" />
      </motion.span>
    ) : (
      <IconChevronRight
        className={`size-4 text-gray-500 ${isOpen ? "rotate-90" : ""}`}
      />
    )

  const ChildrenList = () => {
    const children = node.nodes?.map((n) => (
      <FilesystemItem node={n} key={n.name} animated={animated} />
    ))

    if (animated) {
      return (
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="pl-2 md:pl-6 overflow-hidden flex flex-col justify-end"
            >
              {children}
            </motion.ul>
          )}
        </AnimatePresence>
      )
    }

    return isOpen && <ul className="pl-2 md:pl-6">{children}</ul>
  }

  return (
    <li key={node.name}>
      {isFolder ? (
        <>
          <span className="flex text-sm text-black dark:text-white md:text-base lg:text-lg items-center gap-1.5 py-1">
            {/* toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 -m-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Collapse folder" : "Expand folder"}
            >
              <ChevronIcon />
            </button>

            <IconFolder
              className={`size-6 text-orange-300 fill-orange-300 ${
                node.nodes && node.nodes.length === 0 ? "ml-4 md:ml-12" : ""
              }`}
            />
            <span className="font-medium">{node.name}</span>
          </span>

          <ChildrenList />
        </>
      ) : (
        // File node with hover and click functionality
        <a 
          href={fileUrlMap[node.name] || "#"} 
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
          className="group flex w-full text-left text-sm text-black dark:text-white md:text-base lg:text-lg items-center gap-1.5 py-1 px-1 -mx-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none cursor-pointer"
          aria-label={`${node.name} demo`}
        >
          <IconFile className="ml-4 size-6 text-sky-500 dark:text-sky-400" />
          <span className="underline-offset-2 group-hover:underline">
            {node.name}
          </span>
        </a>
      )}
    </li>
  )
}