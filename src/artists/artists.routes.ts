import { Router } from 'express';
import * as ArtistsController from './artists.controller';

const router = Router();

router
  .route('/')
  .get(ArtistsController.readArtists);

export default router;
