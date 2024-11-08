import api from './api';
import { API_CONFIG } from '../config/api';

export interface CreateRobotParams {
  charName: string;
  voiceType: string;
  backstory: string;
  actions?: string;
}

export interface UpdateRobotParams {
  charID: string;
  charName?: string;
  voiceType?: string;
  backstory?: string;
  actions?: string;
  model_group_name?: string;
  temperature?: number;
}

export const robotService = {
  async createRobot(params: CreateRobotParams) {
    const response = await api.post(API_CONFIG.ENDPOINTS.CHARACTER.CREATE, params);
    return response.data;
  },

  async updateRobot(params: UpdateRobotParams) {
    const response = await api.post(API_CONFIG.ENDPOINTS.CHARACTER.GET, params);
    return response.data;
  },

  async getRobot(charID: string) {
    const response = await api.post(API_CONFIG.ENDPOINTS.CHARACTER.GET, { charID });
    return response.data;
  },

  async deleteRobot(charID: string) {
    const response = await api.post(API_CONFIG.ENDPOINTS.CHARACTER.DELETE, { charID });
    return response.data;
  },

  async uploadKnowledgeBase(charID: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('file_name', file.name);
    
    const response = await api.post(API_CONFIG.ENDPOINTS.KNOWLEDGE_BANK.UPLOAD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  async listKnowledgeBase(charID: string) {
    const response = await api.post(API_CONFIG.ENDPOINTS.KNOWLEDGE_BANK.LIST, { character_id: charID });
    return response.data;
  },

  async deleteKnowledgeBase(documentId: string) {
    const response = await api.post(API_CONFIG.ENDPOINTS.KNOWLEDGE_BANK.DELETE, { document_id: documentId });
    return response.data;
  }
};