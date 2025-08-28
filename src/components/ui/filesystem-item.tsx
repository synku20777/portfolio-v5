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
              className="pl-4 overflow-hidden flex flex-col justify-end"
            >
              {children}
            </motion.ul>
          )}
        </AnimatePresence>
      )
    }

    return isOpen && <ul className="pl-2">{children}</ul>
  }

  return (
    <li key={node.name} >
      {isFolder ? (
        <>
          <span className="text-black dark:text-white lg:text-lg ">
            {/* toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex w-full bg-white dark:bg-neutral-800 rounded-lg items-center gap-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none mt-2 p-3"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Collapse folder" : "Expand folder"}
            >
              <ChevronIcon />
            

            <IconFolder
              className={`size-6 text-orange-300 fill-orange-300 ${
                node.nodes && node.nodes.length === 0 ? "ml-4 md:ml-12" : ""
              }`}
            />
            <span className="font-medium">{node.name}</span>
            </button>
          </span>

          <ChildrenList />
        </>
      ) : (
        // File node with hover and click functionality
        <a 
          href={fileUrlMap[node.name] || "#"} 
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
          className="group mt-2 flex w-full text-black dark:text-white text-base items-center gap-1.5 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none cursor-pointer"
          aria-label={`View ${node.name} project details`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleClick(e as any)}
        >
          <IconFile className="size-6 text-sky-500 dark:text-sky-400" />
          <span className="underline-offset-2 group-hover:underline">
            {node.name}
          </span>
        </a>
      )}
    </li>
  )
}