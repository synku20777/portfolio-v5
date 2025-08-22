import { FilesystemItem } from "@/components/ui/filesystem-item"

function FilesystemItemAnimatedDemo() {
  return (
    <div className="h-auto w-auto overflow-y-auto">
      <ul>
        {nodes.map((node) => (
          <FilesystemItem node={node} key={node.name} animated />
        ))}
      </ul>
    </div>
  );
}

function FilesystemItemDemo() {
  return (
    <div className="p-4 h-auto w-auto overflow-y-auto">
      <ul>
        {nodes.map((node) => (
          <FilesystemItem node={node} key={node.name} />
        ))}
      </ul>
    </div>
  );
}


type Node = {
  name: string;
  nodes?: Node[];
};

const nodes: Node[] = [
  {
    name: 'Projects',
    nodes: [
        {
            name: 'DesignSystems',
            nodes: [
              { name: 'UxUnite.ds' },
              { name: 'Aurora.ds' },
              { name: 'Simple.ds' },
            ],
        },
      {
        name: 'Web',
        nodes: [
          {
            name: 'Ecommerce',
            nodes: [
              { name: 'Firefly.shop' },
              { name: 'Aurora.shop' },
            ],
          },
          {
            name: 'SaaS',
            nodes: [{ name: 'BillPay' }],
          },
          {
            name: 'Mobile',
            nodes: [
              { name: 'Artsy.app'},
            ],
          },
        ],
      },
      {
        name: 'Media',
        nodes: [
          { name: 'Posters', nodes: [] },
          { name: 'Photography', nodes: [] },
        ],
      },
    ],
  },
];

export { FilesystemItemAnimatedDemo, FilesystemItemDemo };
