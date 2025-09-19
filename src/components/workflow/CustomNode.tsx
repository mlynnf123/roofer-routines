import { Handle, Position, NodeProps } from '@xyflow/react';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomNodeData {
  label: string;
  configured: boolean;
  color: 'trigger' | 'action' | 'condition' | 'approved' | 'step';
  icon: string;
  type: string;
}

export function CustomNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as CustomNodeData;
  const IconComponent = (Icons as any)[nodeData.icon] || Icons.Zap;
  
  return (
    <div
      className={cn(
        'workflow-node px-4 py-3 relative group',
        `workflow-node-${nodeData.color}`,
        selected && 'ring-2 ring-primary',
        !nodeData.configured && 'opacity-80'
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-white/30 !border-2 !border-white/50"
      />
      
      <div className="flex items-center gap-2">
        <IconComponent className="w-5 h-5" />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">
            {nodeData.label}
          </div>
          {!nodeData.configured && (
            <div className="text-xs opacity-75 mt-0.5">
              Configuration needed
            </div>
          )}
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-white/30 !border-2 !border-white/50"
      />
      
      {/* Context menu trigger - visible on hover */}
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800">
          <Icons.MoreHorizontal className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}