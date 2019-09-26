import { UserService } from './user.service';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { of, interval, Observable } from 'rxjs';
import { skip, first, catchError } from 'rxjs/operators';
import { User } from './user';

@Injectable()
export class ChallengeStorageService {
  downloadUrlCache = new Map<string, Observable<any>>();
  downloadMetadataCache = new Map<string, Observable<any>>();
  constructor(
    private storage: AngularFireStorage,
  ) { }
  addFile(currentTeam: User, file: File): AngularFireUploadTask {
    return this.storage.upload(
      `users/${currentTeam.email}/${file.name}`,
      file,
    );
  }
  getDownloadUrl(filePath: string) {
    if (!this.downloadUrlCache.has(filePath)) {
      this.downloadUrlCache.set(
        filePath,
        this.storage.ref(filePath).getDownloadURL(),
      );
    }
    return this.downloadUrlCache.get(filePath).pipe(catchError(() => {
      console.log('impossible d\'uploader le fichier');
      return interval(3000).pipe(skip(1),first());
    }));
  }

  deleteFile(filePath: string) {
    return this.storage.ref(filePath).delete();
  }
  getFileMetadata(filePath: string) {
    if (!this.downloadMetadataCache.has(filePath)) {
      this.downloadMetadataCache.set(
        filePath,
        this.storage.ref(filePath).getMetadata(),
      );
    }
    return this.downloadMetadataCache.get(filePath).pipe(catchError(() => {
      console.log('impossible de récupérer les métadonnées du fichier');
      return of('failure');
    }));
  }
}
