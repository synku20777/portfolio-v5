"use client";
import React, { useState } from "react";
import { IconFile, IconFolder, IconFolderOpen, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

type Node = {
  name: string;
  nodes?: Node[];
  href?: string;
  thumbnail?: string;
};

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

const folderData: Node[] = [
  {
    name: 'Projects',
    nodes: [
      {
        name: 'DS',
        nodes: [
          { name: 'UxUnite.ds', thumbnail: "/photos/projects/UxUnite/1.webp" },
        //   { name: 'Aurora.ds', thumbnail: "/photos/projects/Astra/1.jpg" },
        ],
      },
      {
        name: 'Web',
        nodes: [
          { name: 'CloudFirst.web', thumbnail: "/photos/projects/CloudFirst/1.webp" },
          { name: 'Astra.web', thumbnail: "/photos/projects/Astra/Logotype-1.webp" },
          { name: 'ITworkshop.web', thumbnail: "/photos/projects/It-Workshop/1.webp" },
          {
            name: 'Ecommerce',
            nodes: [
              { name: 'Firefly.shop', thumbnail: "/photos/projects/Firefly/1.webp" },
              { name: 'Aurora.shop', thumbnail: "/photos/projects/Astra/2.jpg" },
            ],
          },
          {
            name: 'SaaS',
            nodes: [{ name: 'BillPay', thumbnail: "/photos/projects/CloudFirst/2.webp" }],
          },
          {
            name: 'Mobile',
            nodes: [
              { name: 'Artsy.app', thumbnail: "/photos/projects/Artsy/1.webp" },
            ],
          },
        ],
      },
    ],
  },
];

function FolderItem({ node }: { node: Node }) {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = !!(node.nodes && node.nodes.length > 0);
  
  const handleClick = (e: React.MouseEvent) => {
    if (isFolder) {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (fileUrlMap[node.name]) {
      // Let the native link behavior navigate to the case study
    }
  };
  
  return (
    <li className="mb-2">
      {isFolder ? (
        <>
          <button 
            onClick={handleClick}
            className="w-full flex items-center p-3 rounded-lg bg-white dark:bg-neutral-700"
          >
            <motion.span
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="mr-2 flex items-center"
            >
              <IconChevronRight className="w-4 h-4 text-neutral-500" />
            </motion.span>
            
            {isOpen ? (
              <IconFolderOpen className="w-5 h-5 mr-2 text-orange-400 fill-orange-100 dark:fill-orange-900/30" />
            ) : (
              <IconFolder className="w-5 h-5 mr-2 text-orange-400 fill-orange-100 dark:fill-orange-900/30" />
            )}
            
            <span className="font-medium text-lg text-neutral-900 dark:text-neutral-100">
              {node.name}
            </span>
          </button>
          
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden pl-4 pt-2"
              >
                {node.nodes?.map((childNode) => (
                  <FolderItem key={childNode.name} node={childNode} />
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      ) : (
        <a 
          href={fileUrlMap[node.name] || "#"} 
          className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-neutral-800 shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
        >
          <div className="w-10 h-10 flex-shrink-0 bg-sky-100 dark:bg-sky-900/30 rounded-md flex items-center justify-center">
            <IconFile className="w-5 h-5 text-sky-500" />
          </div>
          
          {node.thumbnail && (
            <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
              <img 
                src={node.thumbnail} 
                alt={`${node.name} thumbnail`} 
                className="h-full w-full object-cover"
              />
            </div>
          )}
          
          <div>
            <div className="font-medium text-neutral-900 dark:text-neutral-100">
              {node.name}
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              View project details
            </div>
          </div>
        </a>
      )}
    </li>
  );
}

export function MobileFolderView() {
  return (
    <div className="bg-neutral-100/50 dark:bg-neutral-900/50 rounded-xl p-4">
      <ul>
        {folderData.map((node) => (
          <FolderItem key={node.name} node={node} />
        ))}
      </ul>
    </div>
  );
}