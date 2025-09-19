import { useState } from 'react';
import { NODE_TEMPLATES, NodeTemplate } from '@/types/workflow';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface NodeLibraryProps {
  onNodeSelect: (template: NodeTemplate) => void;
}

export function NodeLibrary({ onNodeSelect }: NodeLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTemplates = NODE_TEMPLATES.filter(node => 
    node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const categories = Array.from(new Set(filteredTemplates.map(node => node.category)));
  
  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Build</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <Icons.X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative mb-3">
          <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-sm border-gray-200"
          />
        </div>
        
        {/* Copy from workflow */}
        <Button variant="outline" size="sm" className="w-full justify-start text-sm font-normal">
          <Icons.Copy className="w-4 h-4 mr-2" />
          Copy from workflow
        </Button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {categories.map(category => {
          const categoryNodes = filteredTemplates.filter(node => node.category === category);
          
          if (categoryNodes.length === 0) return null;
          
          return (
            <div key={category} className="p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                {category}
              </h3>
              <div className="space-y-1">
                {categoryNodes.map(template => {
                  const IconComponent = (Icons as any)[template.icon] || Icons.Zap;
                  
                  return (
                    <div
                      key={template.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('application/reactflow', template.type);
                        e.dataTransfer.setData('application/json', JSON.stringify(template));
                        e.dataTransfer.effectAllowed = 'move';
                      }}
                      onClick={() => onNodeSelect(template)}
                    >
                      <div className="w-8 h-8 rounded flex items-center justify-center bg-gray-100 group-hover:bg-gray-200 transition-colors">
                        <IconComponent className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {template.name}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        
        {filteredTemplates.length === 0 && (
          <div className="p-4 text-center text-gray-500 text-sm">
            No items found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
}