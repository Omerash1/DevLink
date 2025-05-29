import { Request, Response } from 'express';
import Link from '../models/Link';

// @desc    Get all links for a user
// @route   GET /api/links
// @access  Private
export const getLinks = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;
    
    const query: any = { user: req.user!.id };
    
    // Apply filters if they exist
    if (req.query.tag) {
      query.tags = req.query.tag;
    }
    
    if (req.query.favorite === 'true') {
      query.isFavorite = true;
    }
    
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search as string, 'i');
      query.$or = [
        { title: searchRegex },
        { url: searchRegex },
        { description: searchRegex }
      ];
    }
    
    // Count total documents for pagination
    const total = await Link.countDocuments(query);
    
    // Get links with pagination
    const links = await Link.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex)
      .populate('tags', 'name color');
    
    res.json({
      links,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    console.error('Get links error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a single link by ID
// @route   GET /api/links/:id
// @access  Private
export const getLinkById = async (req: Request, res: Response): Promise<void> => {
  try {
    const link = await Link.findOne({
      _id: req.params.id,
      user: req.user!.id
    }).populate('tags', 'name color');
    
    if (!link) {
      res.status(404).json({ message: 'Link not found' });
      return;
    }
    
    res.json({ link });
  } catch (error) {
    console.error('Get link by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new link
// @route   POST /api/links
// @access  Private
export const createLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, url, description, tags, isFavorite } = req.body;
    
    // Create the link
    const link = await Link.create({
      title,
      url,
      description,
      tags: tags || [],
      isFavorite: isFavorite || false,
      user: req.user!.id
    });
    
    const populatedLink = await Link.findById(link._id).populate('tags', 'name color');
    
    res.status(201).json({ link: populatedLink });
  } catch (error) {
    console.error('Create link error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a link
// @route   PUT /api/links/:id
// @access  Private
export const updateLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, url, description, tags, isFavorite } = req.body;
    
    // Find link and check ownership
    let link = await Link.findOne({
      _id: req.params.id,
      user: req.user!.id
    });
    
    if (!link) {
      res.status(404).json({ message: 'Link not found' });
      return;
    }
    
    // Update link
    link = await Link.findByIdAndUpdate(
      req.params.id,
      {
        title,
        url,
        description,
        tags,
        isFavorite
      },
      { new: true }
    ).populate('tags', 'name color');
    
    res.json({ link });
  } catch (error) {
    console.error('Update link error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a link
// @route   DELETE /api/links/:id
// @access  Private
export const deleteLink = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find link and check ownership
    const link = await Link.findOne({
      _id: req.params.id,
      user: req.user!.id
    });
    
    if (!link) {
      res.status(404).json({ message: 'Link not found' });
      return;
    }
    
    // Delete link
    await link.deleteOne();
    
    res.json({ message: 'Link removed' });
  } catch (error) {
    console.error('Delete link error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Toggle favorite status
// @route   PATCH /api/links/:id/favorite
// @access  Private
export const toggleFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find link and check ownership
    let link = await Link.findOne({
      _id: req.params.id,
      user: req.user!.id
    });
    
    if (!link) {
      res.status(404).json({ message: 'Link not found' });
      return;
    }
    
    // Toggle favorite status
    link = await Link.findByIdAndUpdate(
      req.params.id,
      { isFavorite: !link.isFavorite },
      { new: true }
    ).populate('tags', 'name color');
    
    res.json({ link });
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Mark link as visited
// @route   PATCH /api/links/:id/visited
// @access  Private
export const markVisited = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find link and check ownership
    let link = await Link.findOne({
      _id: req.params.id,
      user: req.user!.id
    });
    
    if (!link) {
      res.status(404).json({ message: 'Link not found' });
      return;
    }
    
    // Update last visited timestamp
    link = await Link.findByIdAndUpdate(
      req.params.id,
      { lastVisited: new Date() },
      { new: true }
    ).populate('tags', 'name color');
    
    res.json({ link });
  } catch (error) {
    console.error('Mark visited error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};