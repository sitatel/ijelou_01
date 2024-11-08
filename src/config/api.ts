export const API_CONFIG = {
  BASE_URL: 'https://api.convai.com',
  API_KEY: process.env.VITE_CONVAI_API_KEY || '',
  ENDPOINTS: {
    CHARACTER: {
      CREATE: '/character/create',
      UPDATE: '/character/update',
      GET: '/character/get',
      DELETE: '/character/delete',
      GET_RESPONSE: '/character/getResponse'
    },
    KNOWLEDGE_BANK: {
      UPLOAD: '/character/knowledge-bank/upload',
      LIST: '/character/knowledge-bank/list',
      DELETE: '/character/knowledge-bank/delete'
    }
  }
};