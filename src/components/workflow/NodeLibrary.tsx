import { NODE_TEMPLATES, NodeTemplate } from '@/types/workflow';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

interface NodeLibraryProps {
  onNodeSelect: (template: NodeTemplate) => void;
}

export function NodeLibrary({ onNodeSelect }: NodeLibraryProps) {
  const categories = Array.from(new Set(NODE_TEMPLATES.map(node => node.category)));
  
  return (
    <div className="w-80 bg-card border-l border-border h-full overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Control Library</h2>
        <p className="text-sm text-muted-foreground mt-1">Drag nodes to build your workflow</p>
      </div>
      
      <div className="p-4 space-y-6">
        {categories.map(category => {
          const categoryNodes = NODE_TEMPLATES.filter(node => node.category === category);
          
          return (
            <div key={category}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                {category}
              </h3>
              <div className="space-y-2">
                {categoryNodes.map(template => {
                  const IconComponent = (Icons as any)[template.icon] || Icons.Zap;
                  
                  return (
                    <div
                      key={template.id}
                      className={cn(
                        'p-3 rounded-lg border cursor-grab hover:shadow-md transition-all duration-200',
                        'bg-white hover:bg-gray-50 border-gray-200'
                      )}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('application/json', JSON.stringify(template));
                        e.dataTransfer.effectAllowed = 'copy';
                      }}
                      onClick={() => onNodeSelect(template)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                          template.color === 'trigger' && 'bg-workflow-node-trigger text-workflow-node-trigger-foreground',
                          template.color === 'action' && 'bg-workflow-node-action text-workflow-node-action-foreground',
                          template.color === 'condition' && 'bg-workflow-node-condition text-workflow-node-condition-foreground',
                          template.color === 'approved' && 'bg-workflow-node-approved text-workflow-node-approved-foreground',
                          template.color === 'step' && 'bg-workflow-node-step text-workflow-node-step-foreground'
                        )}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 mb-1">
                            {template.name}
                          </div>
                          <div className="text-xs text-gray-500 leading-tight">
                            {template.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}