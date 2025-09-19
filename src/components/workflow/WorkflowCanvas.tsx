import { useCallback, useRef, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  NodeTypes,
  BackgroundVariant,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CustomNode } from './CustomNode';
import { NodeTemplate } from '@/types/workflow';
import { Button } from '@/components/ui/button';
import * as Icons from 'lucide-react';

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 400, y: 100 },
    data: {
      label: 'Start Flow',
      configured: true,
      color: 'trigger' as const,
      icon: 'Play',
      type: 'trigger',
    },
  },
];

const initialEdges: Edge[] = [];

interface WorkflowCanvasProps {
  onNodeAdd?: (template: NodeTemplate, position: { x: number; y: number }) => void;
}

export function WorkflowCanvas({ onNodeAdd }: WorkflowCanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) {
        console.log('Missing refs:', { reactFlowWrapper: !!reactFlowWrapper.current, reactFlowInstance: !!reactFlowInstance });
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const templateData = event.dataTransfer.getData('application/json');
      
      if (!templateData) {
        console.log('No template data found in drag event');
        return;
      }

      try {
        const template: NodeTemplate = JSON.parse(templateData);
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const newNode: Node = {
          id: `${template.id}-${Date.now()}`,
          type: 'custom',
          position,
          data: {
            label: template.name,
            configured: false,
            color: template.color,
            icon: template.icon,
            type: template.type,
          },
        };

        console.log('Adding new node:', newNode);
        setNodes((nds) => [...nds, newNode]);
        onNodeAdd?.(template, position);
      } catch (error) {
        console.error('Error parsing template data:', error);
      }
    },
    [reactFlowInstance, setNodes, onNodeAdd]
  );

  return (
    <div className="flex-1 h-full relative" style={{ backgroundColor: '#f9fafb' }}>
      {/* Top toolbar */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <input
          type="text"
          placeholder="Workflow Name"
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium"
          defaultValue="ServicePro Lead Follow-up"
        />
        <div className="flex items-center gap-2 ml-4">
          <Button variant="outline" size="sm">
            <Icons.Save className="w-4 h-4 mr-1" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Icons.Play className="w-4 h-4 mr-1" />
            Test
          </Button>
          <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm">
            <option>Draft</option>
            <option>Active</option>
            <option>Paused</option>
          </select>
        </div>
      </div>

      <div ref={reactFlowWrapper} className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
          style={{ backgroundColor: '#f9fafb' }}
        >
          <Controls 
            className="bg-white border border-gray-200 rounded-lg shadow-sm"
            showZoom={true}
            showFitView={true}
            showInteractive={true}
          />
          <MiniMap 
            nodeColor="#6366f1"
            className="bg-white border border-gray-200 rounded-lg"
          />
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={24} 
            size={1.5}
            color="#d1d5db"
          />
        </ReactFlow>
      </div>
    </div>
  );
}