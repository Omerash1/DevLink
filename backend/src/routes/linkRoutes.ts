// src/routes/linkRoutes.ts
import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { 
  getLinks, 
  getLinkById, 
  createLink, 
  updateLink, 
  deleteLink,
  toggleFavorite,
  markVisited
} from '../controllers/linkController';

const router = Router();

// Link routes
router.route('/')
  .get(protect, getLinks)
  .post(protect, createLink);

router.route('/:id')
  .get(protect, getLinkById)
  .put(protect, updateLink)
  .delete(protect, deleteLink);

router.patch('/:id/favorite', protect, toggleFavorite);
router.patch('/:id/visited', protect, markVisited);

export default router;