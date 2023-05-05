import { withRouteErrorHandler } from '../../utilities';
import * as validators from './validators';
import * as handlers from './handlers';
import { Router } from 'express';

const router = Router();

router.get(
  '/:recipeName',
  withRouteErrorHandler(handlers.getRecipe)
);

router.post(
  '/',
  validators.createRecipeValidator(),
  withRouteErrorHandler(handlers.createRecipe)
);

export default router;
