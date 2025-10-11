import { AgentsStatus } from '../../../components/admin/ia-agents/AgentsStatus';
import { CostMonitor } from '../../../components/admin/ia-agents/CostMonitor';
import { AgentLogs } from '../../../components/admin/ia-agents/AgentLogs';

export default function IAAgentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-exo font-bold text-white">
          IA Agents Management
        </h1>
        <p className="text-text-light mt-2">
          Control y monitoreo de agentes autónomos de inteligencia artificial
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AgentsStatus />
        <CostMonitor />
      </div>
      
      <AgentLogs />
    </div>
  );
}