import { useState } from 'react';
import { NODE_TEMPLATES, NodeTemplate } from '@/types/workflow';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface NodeLibraryProps {
  onNodeSelect: (template: NodeTemplate) => void;
}

export function NodeLibrary({ onNodeSelect }: NodeLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = Array.from(new Set(NODE_TEMPLATES.map(node => node.category)));
  
  const filteredTemplates = NODE_TEMPLATES.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCategories = categories.filter(category =>
    filteredTemplates.some(template => template.category === category)
  );
  
  return (
    <Card className="w-80 shadow-lg border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium">Build</h2>
          <Button variant="ghost" size="sm">
            <Icons.X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="relative">
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          
          <Button variant="outline" size="sm" className="w-full justify-start text-muted-foreground">
            <Icons.Copy className="w-4 h-4 mr-2" />
            Copy from workflow
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {filteredCategories.map(category => {
              const categoryNodes = filteredTemplates.filter(node => node.category === category);
              
              return (
                <div key={category}>
                  <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                    {category}
                  </h3>
                  <div className="space-y-1">
                    {categoryNodes.map(template => {
                      const IconComponent = (Icons as any)[template.icon] || Icons.Zap;
                      
                      return (
                        <div
                          key={template.id}
                          className="flex items-center gap-3 p-2 rounded-md cursor-grab bg-white hover:bg-gray-50 border border-gray-200 transition-colors group"
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData('application/reactflow', template.type);
                            e.dataTransfer.setData('application/json', JSON.stringify(template));
                            e.dataTransfer.effectAllowed = 'move';
                          }}
                          onClick={() => onNodeSelect(template)}
                        >
                          <div className={cn(
                            'w-6 h-6 rounded flex items-center justify-center flex-shrink-0 text-xs',
                            template.color === 'trigger' && 'bg-blue-100 text-blue-700',
                            template.color === 'action' && 'bg-green-100 text-green-700',
                            template.color === 'condition' && 'bg-orange-100 text-orange-700',
                            template.color === 'approved' && 'bg-purple-100 text-purple-700',
                            template.color === 'step' && 'bg-gray-100 text-gray-700'
                          )}>
                            <IconComponent className="w-3 h-3" />
                          </div>
                          <span className="text-sm font-medium text-foreground group-hover:text-foreground">
                            {template.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}