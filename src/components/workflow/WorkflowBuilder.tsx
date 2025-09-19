import { useState } from 'react';
import { WorkflowCanvas } from './WorkflowCanvas';
import { NodeLibrary } from './NodeLibrary';
import { NodeTemplate } from '@/types/workflow';

export function WorkflowBuilder() {
  const [selectedNode, setSelectedNode] = useState<NodeTemplate | null>(null);

  const handleNodeSelect = (template: NodeTemplate) => {
    setSelectedNode(template);
    // Here you could open a configuration dialog
    console.log('Selected node:', template);
  };

  const handleNodeAdd = (template: NodeTemplate, position: { x: number; y: number }) => {
    console.log('Added node to canvas:', template, position);
    // Here you could trigger node configuration
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Main Content */}
      <div className="flex-1 relative">
        {/* Canvas */}
        <WorkflowCanvas onNodeAdd={handleNodeAdd} />
        
        {/* Floating Node Library Panel */}
        <div className="absolute top-4 right-4 z-10">
          <NodeLibrary onNodeSelect={handleNodeSelect} />
        </div>
      </div>
    </div>
  );
}