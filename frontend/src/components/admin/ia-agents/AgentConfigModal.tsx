'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Save } from 'lucide-react';

interface AgentConfig {
  system_prompt: string;
  model: string;
  temperature: number;
  max_tokens: number;
  tools: string[];
  enabled: boolean;
}

interface AgentConfigModalProps {
  agentId: string;
  agentName: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (agentId: string, config: Partial<AgentConfig>) => Promise<void>;
  initialConfig?: AgentConfig;
}

export function AgentConfigModal({ 
  agentId, 
  agentName, 
  isOpen, 
  onClose, 
  onSave,
  initialConfig 
}: AgentConfigModalProps) {
  const [config, setConfig] = useState<AgentConfig>({
    system_prompt: '',
    model: 'gemini-flash',
    temperature: 0.5,
    max_tokens: 2000,
    tools: [],
    enabled: true
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialConfig) {
      setConfig(initialConfig);
    }
  }, [initialConfig]);

  if (!isOpen) return null;

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(agentId, config);
      onClose();
    } catch (error) {
      console.error('Error saving config:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-secondary-darker border border-secondary-dark rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-secondary-dark">
          <h2 className="text-xl font-semibold text-white">
            Configurar {agentName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="system_prompt">System Prompt</Label>
            <textarea
              id="system_prompt"
              value={config.system_prompt}
              onChange={(e) => setConfig({ ...config, system_prompt: e.target.value })}
              className="w-full min-h-[120px] px-3 py-2 bg-secondary-dark border border-secondary rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue"
              placeholder="Describe el rol y comportamiento del agente..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="model">Modelo</Label>
              <Select
                value={config.model}
                onValueChange={(value) => setConfig({ ...config, model: value })}
              >
                <SelectTrigger className="bg-secondary-dark border-secondary text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini-flash-8b">Gemini Flash 8B</SelectItem>
                  <SelectItem value="gemini-flash">Gemini Flash</SelectItem>
                  <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature: {config.temperature}</Label>
              <input
                type="range"
                id="temperature"
                min="0"
                max="1"
                step="0.1"
                value={config.temperature}
                onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="max_tokens">Max Tokens</Label>
            <Input
              id="max_tokens"
              type="number"
              value={config.max_tokens}
              onChange={(e) => setConfig({ ...config, max_tokens: parseInt(e.target.value) })}
              className="bg-secondary-dark border-secondary text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tools">Tools (separados por coma)</Label>
            <Input
              id="tools"
              value={config.tools.join(', ')}
              onChange={(e) => setConfig({ ...config, tools: e.target.value.split(',').map(t => t.trim()) })}
              className="bg-secondary-dark border-secondary text-white"
              placeholder="tool1, tool2, tool3"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-secondary-dark">
          <Button
            onClick={onClose}
            variant="outline"
            disabled={saving}
            className="border-secondary-dark text-gray-300 hover:bg-secondary-dark"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-accent-blue hover:bg-accent-blue/80"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </div>
    </div>
  );
}
