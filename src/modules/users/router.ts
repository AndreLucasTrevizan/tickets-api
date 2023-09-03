import { Router } from 'express';
import { createUser, getUserProfile, listUsers, updateUserAvatar, userSignIn } from './controller';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAdmin } from '../../middleware/isAdmin';
import { upload } from '../../middleware/upload';

const router = Router();

router
  .route('/users')
  .post(
    isAuthenticated,
    isAuthenticated,
    createUser
    );
router.route('/sign_in').post(userSignIn);
router
  .route('/users')
  .get(
    isAuthenticated,
    isAdmin,
    listUsers
  );

router.route('/users/profile').get(isAuthenticated, getUserProfile);
router.route('/users/avatar').put(isAuthenticated, upload.single('avatar'), updateUserAvatar);

export { router as UsersRouter };
