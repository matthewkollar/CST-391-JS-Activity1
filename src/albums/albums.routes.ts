import { Router } from 'express';
import * as AlbumsController from './albums.controller';

const router = Router();

// Get all albums
router.get('/', AlbumsController.readAlbums);

// Get albums by artist (e.g., /albums/artist/The Beatles)
router.get('/artist/:artist', AlbumsController.readAlbumsByArtist);

// Other endpoints…
router.get('/search/artist/:search', AlbumsController.readAlbumsByArtistSearch);
router.get('/search/description/:search', AlbumsController.readAlbumsByDescriptionSearch);
router.post('/', AlbumsController.createAlbum);
router.put('/', AlbumsController.updateAlbum);
router.delete('/:albumId', AlbumsController.deleteAlbum);

export default router;
