import { supabase } from '../config/supabase';
import type { Database } from '../types/supabase';

type Client = Database['public']['Tables']['clients']['Row'];
type Robot = Database['public']['Tables']['robots']['Row'];
type KnowledgeBase = Database['public']['Tables']['knowledge_bases']['Row'];

export const supabaseClient = {
  // Clients
  async getClients() {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createClient(client: Database['public']['Tables']['clients']['Insert']) {
    const { data, error } = await supabase
      .from('clients')
      .insert(client)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateClient(id: string, updates: Database['public']['Tables']['clients']['Update']) {
    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Robots
  async getRobots(clientId?: string) {
    let query = supabase
      .from('robots')
      .select('*, clients(*)');
    
    if (clientId) {
      query = query.eq('client_id', clientId);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createRobot(robot: Database['public']['Tables']['robots']['Insert']) {
    const { data, error } = await supabase
      .from('robots')
      .insert(robot)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateRobot(id: string, updates: Database['public']['Tables']['robots']['Update']) {
    const { data, error } = await supabase
      .from('robots')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Knowledge Bases
  async getKnowledgeBases(robotId: string) {
    const { data, error } = await supabase
      .from('knowledge_bases')
      .select('*')
      .eq('robot_id', robotId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createKnowledgeBase(kb: Database['public']['Tables']['knowledge_bases']['Insert']) {
    const { data, error } = await supabase
      .from('knowledge_bases')
      .insert(kb)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteKnowledgeBase(id: string) {
    const { error } = await supabase
      .from('knowledge_bases')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};