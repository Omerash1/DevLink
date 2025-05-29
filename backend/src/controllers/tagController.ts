import { Request, Response } from 'express';
import Tag from '../models/Tag';
import Link from '../models/Link';

// @desc    Get all tags for a user
// @route   GET /api/tags
// @access  Private
export const getTags = async (req: Request, res: Response): Promise<void> => {
  try {
    const tags = await Tag.find({ user: req.user!.id });
    res.json({ tags });
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a single tag by ID
// @route   GET /api/tags/:id
// @access  Private
export const getTagById = async (req: Request, res: Response): Promise<void> => {
  try {
    const tag = await Tag.findOne({
      _id: req.params.id,
      user: req.user!.id
    });
    
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    
    // Get links with this tag
    const links = await Link.find({
      user: req.user!.id,
      tags: tag._id
    }).sort({ createdAt: -1 });
    
    res.json({ tag, links });
  } catch (error) {
    console.error('Get tag by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new tag
// @route   POST /api/tags
// @access  Private
export const createTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, color } = req.body;
    
    // Check if tag with this name already exists for this user
    const existingTag = await Tag.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
      user: req.user!.id
    });
    
    if (existingTag) {
      res.status(400).json({ message: 'Tag with this name already exists' });
      return;
    }
    
    // Create tag
    const tag = await Tag.create({
      name,
      color: color || '#3B82F6', // Default blue if no color provided
      user: req.user!.id
    });
    
    res.status(201).json({ tag });
  } catch (error) {
    console.error('Create tag error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a tag
// @route   PUT /api/tags/:id
// @access  Private
export const updateTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, color } = req.body;
    
    // Find tag and check ownership
    let tag = await Tag.findOne({
      _id: req.params.id,
      user: req.user!.id
    });
    
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    
    // Check if new name conflicts with existing tag
    if (name && name !== tag.name) {
      const existingTag = await Tag.findOne({
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        user: req.user!.id,
        _id: { $ne: tag._id } // Exclude current tag
      });
      
      if (existingTag) {
        res.status(400).json({ message: 'Tag with this name already exists' });
        return;
      }
    }
    
    // Update tag
    tag = await Tag.findByIdAndUpdate(
      req.params.id,
      { name, color },
      { new: true }
    );
    
    res.json({ tag });
  } catch (error) {
    console.error('Update tag error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a tag
// @route   DELETE /api/tags/:id
// @access  Private
export const deleteTag = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find tag and check ownership
    const tag = await Tag.findOne({
      _id: req.params.id,
      user: req.user!.id
    });
    
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    
    // Remove tag from all links
    await Link.updateMany(
      { tags: tag._id },
      { $pull: { tags: tag._id } }
    );
    
    // Delete tag
    await tag.deleteOne();
    
    res.json({ message: 'Tag removed' });
  } catch (error) {
    console.error('Delete tag error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};