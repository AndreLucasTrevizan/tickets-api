import { Router } from 'express';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAdmin } from '../../middleware/isAdmin';
import { createStatus, deleteStatus, listStatus, updateStatus } from './controller';

const router = Router();

router.route('/status').post(isAuthenticated, isAdmin, createStatus);
router.route('/status').put(isAuthenticated, isAdmin, updateStatus);
router.route('/status').delete(isAuthenticated, isAdmin, deleteStatus);
router.route('/status').get(isAuthenticated, listStatus);

export { router as StatusRouter };
