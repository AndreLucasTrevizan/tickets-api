import { Router } from 'express';
import { uploadFiles } from '../../middleware/uploadFiles';
import { addingAttachments } from './controller';
import { isAuthenticated } from '../../middleware/isAuthenticated';

const router = Router();

router.route('/tickets/attachments').post(isAuthenticated, uploadFiles.array('attachments'), addingAttachments);

export { router as TicketsRouter };
