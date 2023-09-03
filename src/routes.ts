import { Request, Response, Router } from 'express';
import { UsersRouter } from './modules/users/router';
import { RolesRouter } from './modules/roles/router';
import { CategoriesRouter } from './modules/categories/router';
import { TicketsRouter } from './modules/tickets/router';
import { StatusRouter } from './modules/status/router';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
  throw new Error('Gave bad');
}); 

router.use(UsersRouter);
router.use(RolesRouter);
router.use(CategoriesRouter);
router.use(StatusRouter);
router.use(TicketsRouter);

export default router;
