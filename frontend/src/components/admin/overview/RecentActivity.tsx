'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity,
  Bot,
  Database,
  Mail,
  Calendar,
  DollarSign
} from 'lucide-react';
import { adminService, type Activity as ActivityType } from '@/services/admin.service';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
    case 'completed':
      return 'bg-green-500/20 text-green-400 border-green-500/50';
    case 'active':
    case 'running':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    case 'scheduled':
    case 'pending':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
    case 'failed':
    case 'error':
      return 'bg-red-500/20 text-red-400 border-red-500/50';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'scraper':
      return Database;
    case 'outreach':
      return Mail;
    case 'meeting':
      return Calendar;
    case 'sale':
      return DollarSign;
    case 'ia':
      return Bot;
    default:
      return Activity;
  }
};

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Ahora';
  if (diffInMinutes < 60) return `${diffInMinutes} min`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
  return `${Math.floor(diffInMinutes / 1440)}d`;
};

export function RecentActivity() {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const data = await adminService.getRecentActivity();
        setActivities(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching recent activity:', error);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchActivity, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-accent-blue" />
            Actividad Reciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-start space-x-4 p-3 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-accent-blue" />
          Actividad Reciente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-text-light">
              No hay actividad reciente
            </div>
          ) : (
            activities.map((activity, index) => {
              const IconComponent = getActivityIcon(activity.type);
              return (
                <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-secondary-dark border border-gray-600 flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-accent-blue" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">
                        {activity.title}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(activity.status)} variant="outline">
                          {activity.status}
                        </Badge>
                        <span className="text-xs text-text-light">
                          {formatTimeAgo(activity.created_at)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-text-light mt-1">
                      {activity.description}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        <div className="mt-6 text-center">
          <button className="text-accent-blue hover:text-accent-blue/80 text-sm font-medium">
            Ver todas las actividades →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}