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

  // Общий контент для обоих вариантов
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
    const children = node.nodes?.map((node) => (
      <FilesystemItem node={node} key={node.name} animated={animated} />
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
              className="pl-6 overflow-hidden flex flex-col justify-end"
            >
              {children}
            </motion.ul>
          )}
        </AnimatePresence>
      )
    }

    return isOpen && <ul className="pl-6">{children}</ul>
  }

  return (
    <li key={node.name}>
      <span className="flex text-lg text-black dark:text-white items-center gap-1.5 py-1">
        {node.nodes && node.nodes.length > 0 && (
          <button onClick={() => setIsOpen(!isOpen)} className="p-1 -m-1">
            <ChevronIcon />
          </button>
        )}

        {node.nodes ? (
          <IconFolder
            className={`size-6 text-orange-300 fill-orange-300 ${
              node.nodes.length === 0 ? "ml-[22px]" : ""
            }`}
          />
        ) : (
          <IconFile className="ml-[22px] size-6 text-sky-500 dark:text-sky-400" />
        )}
        {node.name}
      </span>

      <ChildrenList />
    </li>
  )
}
