import { Router } from 'express';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAdmin } from '../../middleware/isAdmin';
import { createCategory, deleteCategory, listCategories, updateCategory } from './controller';

const router = Router();

router.route('/categories').post(isAuthenticated, isAdmin, createCategory);
router.route('/categories').put(isAuthenticated, isAdmin, updateCategory);
router.route('/categories').delete(isAuthenticated, isAdmin, deleteCategory);
router.route('/categories').get(isAuthenticated, listCategories);

export { router as CategoriesRouter };
