import api from './api';
import type { Link, LinkParams, LinksResponse, UrlAnalysis } from '@/types';

interface LinkResponse {
  link: Link;
  message?: string;
}

const linkService = {
  async getLinks(params?: LinkParams): Promise<LinksResponse> {
    const response = await api.get('/links', { params });
    return response.data;
  },

  async getLink(id: string): Promise<LinkResponse> {
    const response = await api.get(`/links/${id}`);
    return response.data;
  },

  async createLink(linkData: Partial<Link>): Promise<LinkResponse> {
    const response = await api.post('/links', linkData);
    return response.data;
  },

  async updateLink(id: string, linkData: Partial<Link>): Promise<LinkResponse> {
    const response = await api.put(`/links/${id}`, linkData);
    return response.data;
  },

  async deleteLink(id: string): Promise<void> {
    await api.delete(`/links/${id}`);
  },

  async toggleFavorite(id: string): Promise<LinkResponse> {
    const response = await api.patch(`/links/${id}/favorite`);
    return response.data;
  },

  async markVisited(id: string): Promise<LinkResponse> {
    const response = await api.patch(`/links/${id}/visit`);
    return response.data;
  },

  async analyzeUrl(url: string): Promise<UrlAnalysis> {
    const response = await api.post('/links/analyze', { url });
    return response.data;
  }
};

export default linkService;