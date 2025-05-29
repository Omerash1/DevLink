import api from './api';
import type { Tag } from '@/types';

interface TagResponse {
  tag: Tag;
  message?: string;
}

interface TagsResponse {
  tags: Tag[];
  message?: string;
}

const tagService = {
  async getTags(): Promise<TagsResponse> {
    const response = await api.get('/tags');
    return response.data;
  },

  async getTag(id: string): Promise<TagResponse> {
    const response = await api.get(`/tags/${id}`);
    return response.data;
  },

  async createTag(tagData: Partial<Tag>): Promise<TagResponse> {
    const response = await api.post('/tags', tagData);
    return response.data;
  },

  async updateTag(id: string, tagData: Partial<Tag>): Promise<TagResponse> {
    const response = await api.put(`/tags/${id}`, tagData);
    return response.data;
  },

  async deleteTag(id: string): Promise<void> {
    await api.delete(`/tags/${id}`);
  }
};

export default tagService;