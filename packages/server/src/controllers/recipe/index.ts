import { withRouteErrorHandler } from '../../utilities';
import * as handlers from './handlers';
import { Router } from 'express';

const router = Router();
router.get('/:recipeName', withRouteErrorHandler(handlers.getRecipe));
router.post('/', withRouteErrorHandler(handlers.createRecipe));

export default router;
