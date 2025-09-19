export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'delay' | 'integration';
  category: string;
  name: string;
  description: string;
  icon: string;
  color: 'trigger' | 'action' | 'condition' | 'approved' | 'step';
  position: { x: number; y: number };
  data: {
    label: string;
    configured: boolean;
    config?: Record<string, any>;
  };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

export interface NodeTemplate {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'delay' | 'integration';
  category: string;
  name: string;
  description: string;
  icon: string;
  color: 'trigger' | 'action' | 'condition' | 'approved' | 'step';
  configOptions?: {
    name: string;
    type: 'text' | 'select' | 'number' | 'boolean';
    options?: string[];
    required?: boolean;
  }[];
}

export const NODE_TEMPLATES: NodeTemplate[] = [
  // Triggers
  {
    id: 'lead_created',
    type: 'trigger',
    category: 'Triggers',
    name: 'New Lead Created',
    description: 'Triggers when a new lead enters the system',
    icon: 'Mail',
    color: 'trigger',
  },
  {
    id: 'proposal_signed',
    type: 'trigger',
    category: 'Triggers',
    name: 'Proposal Signed',
    description: 'Triggers when customer signs a proposal',
    icon: 'FileCheck',
    color: 'trigger',
  },
  {
    id: 'payment_received',
    type: 'trigger',
    category: 'Triggers',
    name: 'Payment Received',
    description: 'Triggers when payment is processed',
    icon: 'CreditCard',
    color: 'trigger',
  },
  
  // Actions
  {
    id: 'send_email',
    type: 'action',
    category: 'Communication',
    name: 'Send Email',
    description: 'Send automated emails via Gmail',
    icon: 'Mail',
    color: 'action',
  },
  {
    id: 'send_sms',
    type: 'action',
    category: 'Communication',
    name: 'Send SMS',
    description: 'Send text notifications via Twilio',
    icon: 'MessageSquare',
    color: 'action',
  },
  {
    id: 'create_task',
    type: 'action',
    category: 'Task Management',
    name: 'Create Task',
    description: 'Generate follow-up tasks for team',
    icon: 'CheckSquare',
    color: 'action',
  },
  {
    id: 'schedule_crew',
    type: 'action',
    category: 'Scheduling',
    name: 'Schedule Crew',
    description: 'Assign work teams to projects',
    icon: 'Users',
    color: 'action',
  },
  
  // Conditions
  {
    id: 'lead_value',
    type: 'condition',
    category: 'Conditions',
    name: 'Lead Value Check',
    description: 'Filter by project value',
    icon: 'TrendingUp',
    color: 'condition',
  },
  {
    id: 'job_type',
    type: 'condition',
    category: 'Conditions',
    name: 'Job Type Check',
    description: 'Residential vs Commercial filter',
    icon: 'Building',
    color: 'condition',
  },
  
  // Delays
  {
    id: 'delay_minutes',
    type: 'delay',
    category: 'Delays',
    name: 'Wait (Minutes)',
    description: 'Short delay for immediate follow-ups',
    icon: 'Clock',
    color: 'step',
  },
  {
    id: 'delay_hours',
    type: 'delay',
    category: 'Delays',
    name: 'Wait (Hours)',
    description: 'Medium delay for same-day actions',
    icon: 'Clock',
    color: 'step',
  },
  
  // Integrations
  {
    id: 'quickbooks_sync',
    type: 'integration',
    category: 'Integrations',
    name: 'QuickBooks Sync',
    description: 'Financial data synchronization',
    icon: 'DollarSign',
    color: 'approved',
  },
  {
    id: 'eagleview_report',
    type: 'integration',
    category: 'Integrations',
    name: 'EagleView Report',
    description: 'Aerial measurements and roof analysis',
    icon: 'Camera',
    color: 'approved',
  },
];