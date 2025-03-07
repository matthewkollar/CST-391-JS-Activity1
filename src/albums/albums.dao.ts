import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { Album } from './albums.model';
import { albumQueries } from './albums.queries';

export const readAlbums = async (): Promise<Album[]> => {
    return execute<Album[]>(albumQueries.readAlbums, []);
};

export const readAlbumsByArtist = async (artistName: string): Promise<Album[]> => {
    return execute<Album[]>(albumQueries.readAlbumsByArtist, [artistName]);
};

export const readAlbumsByArtistSearch = async (search: string): Promise<Album[]> => {
    console.log('search param', search);
    return execute<Album[]>(albumQueries.readAlbumsByArtistSearch, [search]);
};

export const readAlbumsByDescriptionSearch = async (search: string): Promise<Album[]> => {
    console.log('search param', search);
    return execute<Album[]>(albumQueries.readAlbumsByDescriptionSearch, [search]);
};

export const readAlbumsByAlbumId = async (albumId: number): Promise<Album[]> => {
    return execute<Album[]>(albumQueries.readAlbumsByAlbumId, [albumId]);
};

export const createAlbum = async (album: Album): Promise<OkPacket> => {
    return execute<OkPacket>(albumQueries.createAlbum, [
        album.title, album.artist, album.description, album.year, album.image
    ]);
};

export const updateAlbum = async (album: Album): Promise<OkPacket> => {
    return execute<OkPacket>(albumQueries.updateAlbum, [
        album.title, album.artist, album.year, album.image,album.description, album.albumId
    ]);
};

export const deleteAlbum = async (albumId: number): Promise<OkPacket> => {
    return execute<OkPacket>(albumQueries.deleteAlbum, [albumId]);
};
