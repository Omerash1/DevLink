import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import linkService from '@/services/linkService'
import type { Link, LinkParams, LinksResponse } from '@/types'

export const useLinkStore = defineStore('link', () => {
  const links = ref<Link[]>([])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const total = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const favoriteLinks = computed(() => links.value.filter(link => link.isFavorite))
  const recentLinks = computed(() => 
    [...links.value]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10)
  )

  const fetchLinks = async (params?: LinkParams) => {
    loading.value = true
    error.value = null
    try {
      const response: LinksResponse = await linkService.getLinks(params)
      links.value = response.links
      currentPage.value = response.page
      totalPages.value = response.totalPages
      total.value = response.total
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch links'
      console.error('Failed to fetch links:', err)
    } finally {
      loading.value = false
    }
  }

  const getLink = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await linkService.getLink(id)
      return response.link
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch link'
      console.error('Failed to fetch link:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createLink = async (linkData: Partial<Link>) => {
    loading.value = true
    error.value = null
    try {
      const response = await linkService.createLink(linkData)
      links.value.unshift(response.link) // Add to beginning
      total.value += 1
      return response.link
    } catch (err: any) {
      error.value = err.message || 'Failed to create link'
      console.error('Failed to create link:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateLink = async (id: string, linkData: Partial<Link>) => {
    loading.value = true
    error.value = null
    try {
      const response = await linkService.updateLink(id, linkData)
      const index = links.value.findIndex(link => link._id === id || link.id === id)
      if (index !== -1) {
        links.value[index] = response.link
      }
      return response.link
    } catch (err: any) {
      error.value = err.message || 'Failed to update link'
      console.error('Failed to update link:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteLink = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      await linkService.deleteLink(id)
      links.value = links.value.filter(link => link._id !== id && link.id !== id)
      total.value = Math.max(0, total.value - 1)
    } catch (err: any) {
      error.value = err.message || 'Failed to delete link'
      console.error('Failed to delete link:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const toggleFavorite = async (id: string) => {
    try {
      const response = await linkService.toggleFavorite(id)
      const index = links.value.findIndex(link => link._id === id || link.id === id)
      if (index !== -1) {
        links.value[index] = response.link
      }
      return response.link
    } catch (err: any) {
      error.value = err.message || 'Failed to toggle favorite'
      console.error('Failed to toggle favorite:', err)
      throw err
    }
  }

  const markVisited = async (id: string) => {
    try {
      const response = await linkService.markVisited(id)
      const index = links.value.findIndex(link => link._id === id || link.id === id)
      if (index !== -1) {
        links.value[index] = response.link
      }
      return response.link
    } catch (err: any) {
      error.value = err.message || 'Failed to mark as visited'
      console.error('Failed to mark as visited:', err)
      throw err
    }
  }

  const analyzeUrl = async (url: string) => {
    try {
      return await linkService.analyzeUrl(url)
    } catch (err: any) {
      console.error('Failed to analyze URL:', err)
      throw err
    }
  }

  const searchLinks = (query: string) => {
    if (!query.trim()) return links.value
    
    const searchTerm = query.toLowerCase()
    return links.value.filter(link => 
      link.title.toLowerCase().includes(searchTerm) ||
      link.url.toLowerCase().includes(searchTerm) ||
      (link.description && link.description.toLowerCase().includes(searchTerm))
    )
  }

  const getLinksByTag = (tagId: string) => {
    return links.value.filter(link => link.tags.includes(tagId))
  }

  const clearError = () => {
    error.value = null
  }

  const resetPagination = () => {
    currentPage.value = 1
    totalPages.value = 1
    total.value = 0
  }

  return {
    // State
    links,
    currentPage,
    totalPages,
    total,
    loading,
    error,
    
    // Computed
    favoriteLinks,
    recentLinks,
    
    // Actions
    fetchLinks,
    getLink,
    createLink,
    updateLink,
    deleteLink,
    toggleFavorite,
    markVisited,
    analyzeUrl,
    searchLinks,
    getLinksByTag,
    clearError,
    resetPagination
  }
})