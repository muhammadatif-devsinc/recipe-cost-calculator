import { withRouteErrorHandler } from '../../utilities';
import * as validators from './validators';
import * as handlers from './handlers';
import { Router } from 'express';

const router = Router();

router.get(
  '/',
  withRouteErrorHandler(handlers.getLastRecipe)
);

router.post(
  '/',
  validators.createRecipeValidator(),
  withRouteErrorHandler(handlers.createOrSaveRecipe)
);

export default router;
