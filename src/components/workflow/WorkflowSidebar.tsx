import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkflowSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const sidebarItems = [
  { id: 'workflow', icon: Icons.Workflow, label: 'Workflow' },
  { id: 'data', icon: Icons.Database, label: 'Data' },
  { id: 'code', icon: Icons.Code, label: 'Code' },
  { id: 'integrations', icon: Icons.Puzzle, label: 'Integrations' },
  { id: 'settings', icon: Icons.Settings, label: 'Settings' },
];

export function WorkflowSidebar({ activeTab, onTabChange }: WorkflowSidebarProps) {
  return (
    <div className="sidebar-dark w-16 flex flex-col items-center py-4 h-full">
      {/* Logo */}
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-8">
        <Icons.Zap className="w-6 h-6 text-primary-foreground" />
      </div>
      
      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {sidebarItems.map(item => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
                'sidebar-icon',
                isActive && 'bg-primary text-primary-foreground'
              )}
              title={item.label}
            >
              <IconComponent className="w-5 h-5" />
            </button>
          );
        })}
      </nav>
      
      {/* Profile */}
      <div className="mt-auto">
        <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
          <Icons.User className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}