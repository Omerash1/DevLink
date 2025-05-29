// src/routes/tagRoutes.ts
import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { 
  getTags, 
  getTagById, 
  createTag, 
  updateTag, 
  deleteTag 
} from '../controllers/tagController';

const router = Router();

// Tag routes
router.route('/')
  .get(protect, getTags)
  .post(protect, createTag);

router.route('/:id')
  .get(protect, getTagById)
  .put(protect, updateTag)
  .delete(protect, deleteTag);

export default router;