import { defineStore } from 'pinia'
import { ref } from 'vue'
import tagService from '@/services/tagService'
import type { Tag } from '@/types'

export const useTagStore = defineStore('tag', () => {
  const tags = ref<Tag[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchTags = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await tagService.getTags()
      tags.value = response.tags
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch tags'
      console.error('Failed to fetch tags:', err)
    } finally {
      loading.value = false
    }
  }

  const getTag = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await tagService.getTag(id)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch tag'
      console.error('Failed to fetch tag:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createTag = async (tagData: Partial<Tag>) => {
    loading.value = true
    error.value = null
    try {
      const response = await tagService.createTag(tagData)
      tags.value.push(response.tag)
      return response.tag
    } catch (err: any) {
      error.value = err.message || 'Failed to create tag'
      console.error('Failed to create tag:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateTag = async (id: string, tagData: Partial<Tag>) => {
    loading.value = true
    error.value = null
    try {
      const response = await tagService.updateTag(id, tagData)
      const index = tags.value.findIndex(tag => tag._id === id)
      if (index !== -1) {
        tags.value[index] = response.tag
      }
      return response.tag
    } catch (err: any) {
      error.value = err.message || 'Failed to update tag'
      console.error('Failed to update tag:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteTag = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      await tagService.deleteTag(id)
      tags.value = tags.value.filter(tag => tag._id !== id)
    } catch (err: any) {
      error.value = err.message || 'Failed to delete tag'
      console.error('Failed to delete tag:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getTagById = (id: string) => {
    return tags.value.find(tag => tag._id === id)
  }

  const clearError = () => {
    error.value = null
  }

  return {
    tags,
    loading,
    error,
    fetchTags,
    getTag,
    createTag,
    updateTag,
    deleteTag,
    getTagById,
    clearError
  }
})