import { Router } from 'express';
import { createRoles, deleteRoles, listRoles, updateRoles } from './controller';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAdmin } from '../../middleware/isAdmin';

const router = Router();

router.route('/roles').post(isAuthenticated, isAdmin, createRoles);
router.route('/roles').put(isAuthenticated, isAdmin,updateRoles);
router.route('/roles').delete(isAuthenticated, isAdmin,deleteRoles);
router.route('/roles').get(isAuthenticated, listRoles);

export { router as RolesRouter };
