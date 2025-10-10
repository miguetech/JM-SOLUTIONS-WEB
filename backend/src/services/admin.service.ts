import pool from '../config/database';

export class AdminService {
  
  // Dashboard Overview Metrics
  async getDashboardMetrics() {
    try {
      const client = await pool.connect();
      
      // Parallel queries for better performance
      const [
        companiesCount,
        leadsToday,
        highOpportunities,
        scrapeSessionsToday,
        meetingsCount,
        revenueData
      ] = await Promise.all([
        // Total companies
        client.query('SELECT COUNT(*) as count FROM companies'),
        
        // Leads generated today  
        client.query(`
          SELECT COUNT(*) as count FROM companies 
          WHERE created_at >= CURRENT_DATE
        `),
        
        // High opportunity leads
        client.query(`
          SELECT COUNT(*) as count FROM sales_opportunities 
          WHERE opportunity_level IN ('CRITICAL', 'HIGH')
        `),
        
        // Scrape sessions today
        client.query(`
          SELECT COUNT(*) as count FROM scraping_sessions 
          WHERE created_at >= CURRENT_DATE
        `),
        
        // Meetings scheduled this week
        client.query(`
          SELECT COUNT(*) as count FROM outreach_communications 
          WHERE message_type = 'meeting' 
          AND created_at >= date_trunc('week', CURRENT_DATE)
        `),
        
        // Revenue this month
        client.query(`
          SELECT COALESCE(SUM(estimated_monthly_value), 0) as revenue 
          FROM sales_opportunities 
          WHERE created_at >= date_trunc('month', CURRENT_DATE)
          AND opportunity_level IN ('CRITICAL', 'HIGH')
        `)
      ]);

      client.release();

      return {
        totalCompanies: parseInt(companiesCount.rows[0].count),
        leadsToday: parseInt(leadsToday.rows[0].count),
        highOpportunities: parseInt(highOpportunities.rows[0].count),
        scrapeSessionsToday: parseInt(scrapeSessionsToday.rows[0].count),
        meetingsThisWeek: parseInt(meetingsCount.rows[0].count),
        revenueThisMonth: parseFloat(revenueData.rows[0].revenue) || 0
      };
    } catch (error) {
      console.error('Error getting dashboard metrics:', error);
      throw error;
    }
  }

  // Lead generation trends (last 7 days)
  async getLeadTrends() {
    try {
      const client = await pool.connect();
      
      const result = await client.query(`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as leads,
          COUNT(CASE WHEN so.opportunity_level IN ('CRITICAL', 'HIGH') THEN 1 END) as conversions
        FROM companies c
        LEFT JOIN sales_opportunities so ON c.business_id = so.company_id
        WHERE c.created_at >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY DATE(created_at)
        ORDER BY date DESC
      `);

      client.release();
      return result.rows;
    } catch (error) {
      console.error('Error getting lead trends:', error);
      throw error;
    }
  }

  // Leads by niche/category
  async getLeadsByNiche() {
    try {
      const client = await pool.connect();
      
      const result = await client.query(`
        SELECT 
          CASE 
            WHEN c.search_keywords ILIKE '%abogado%' OR c.search_keywords ILIKE '%lawyer%' THEN 'Abogados'
            WHEN c.search_keywords ILIKE '%restaurant%' OR c.search_keywords ILIKE '%comida%' THEN 'Restaurantes'
            WHEN c.search_keywords ILIKE '%inmobil%' OR c.search_keywords ILIKE '%real estate%' THEN 'Inmobiliarias'
            WHEN c.search_keywords ILIKE '%auto%' OR c.search_keywords ILIKE '%car%' THEN 'Automotriz'
            WHEN c.search_keywords ILIKE '%digital%' OR c.search_keywords ILIKE '%web%' THEN 'Servicios Digitales'
            ELSE 'Otros'
          END as niche,
          COUNT(*) as leads,
          ROUND(AVG(CASE WHEN so.opportunity_score > 0 THEN so.opportunity_score ELSE NULL END), 1) as avg_score
        FROM companies c
        LEFT JOIN sales_opportunities so ON c.business_id = so.company_id
        GROUP BY niche
        ORDER BY leads DESC
      `);

      client.release();
      return result.rows;
    } catch (error) {
      console.error('Error getting leads by niche:', error);
      throw error;
    }
  }

  // Recent activity from multiple tables
  async getRecentActivity() {
    try {
      const client = await pool.connect();
      
      const result = await client.query(`
        (
          SELECT 
            'scraper' as type,
            session_id as title,
            CONCAT('Scrapeadas ', businesses_found, ' empresas') as description,
            created_at,
            status
          FROM scraping_sessions
          ORDER BY created_at DESC
          LIMIT 3
        )
        UNION ALL
        (
          SELECT 
            'outreach' as type,
            CONCAT('Comunicación con ', c.name) as title,
            CONCAT('Canal: ', oc.channel, ' - Tipo: ', oc.message_type) as description,
            oc.created_at,
            oc.status
          FROM outreach_communications oc
          JOIN companies c ON oc.company_id = c.business_id
          ORDER BY oc.created_at DESC
          LIMIT 3
        )
        ORDER BY created_at DESC
        LIMIT 6
      `);

      client.release();
      return result.rows;
    } catch (error) {
      console.error('Error getting recent activity:', error);
      throw error;
    }
  }

  // Scraper status and performance
  async getScraperStatus() {
    try {
      const client = await pool.connect();
      
      const [statusResult, performanceResult] = await Promise.all([
        // Latest scraper session
        client.query(`
          SELECT status, session_id, businesses_found, success_rate, created_at
          FROM scraping_sessions 
          ORDER BY created_at DESC 
          LIMIT 1
        `),
        
        // Scraper performance today
        client.query(`
          SELECT 
            COUNT(*) as sessions_today,
            AVG(success_rate) as avg_success_rate,
            SUM(businesses_found) as total_companies_today
          FROM scraping_sessions 
          WHERE created_at >= CURRENT_DATE
        `)
      ]);

      client.release();
      
      return {
        latestSession: statusResult.rows[0] || null,
        performance: performanceResult.rows[0]
      };
    } catch (error) {
      console.error('Error getting scraper status:', error);
      throw error;
    }
  }

  // Database statistics
  async getDatabaseStats() {
    try {
      const client = await pool.connect();
      
      const result = await client.query(`
        SELECT 
          schemaname,
          tablename,
          n_tup_ins as inserts,
          n_tup_upd as updates,
          n_tup_del as deletes,
          n_live_tup as live_rows
        FROM pg_stat_user_tables 
        WHERE schemaname = 'public'
        ORDER BY n_live_tup DESC
      `);

      client.release();
      return result.rows;
    } catch (error) {
      console.error('Error getting database stats:', error);
      throw error;
    }
  }
}