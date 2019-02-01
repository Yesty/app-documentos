import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface IDocumento {
  codigo: number;
  descripcion: string;
  tipo: string;
  fechaCreacion: number;
  estado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  private documentosCollection: AngularFirestoreCollection<IDocumento>;
  private documentos: Observable<IDocumento[]>;

  constructor(private db: AngularFirestore) {
    this.documentosCollection = db.collection<IDocumento>('documentos');

    // Se consuluta el estado actual de los datos
    this.documentos = this.documentosCollection.snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getDocumentos() {
    this.documentos = this.documentosCollection.snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    return this.documentos;
  }

  getDocumento = (id: string) => this.documentosCollection.doc(id).valueChanges();
  updateDocumento = (documento: IDocumento, id: string) => this.documentosCollection.doc(id).update(documento);
  addDocumento = (documento: IDocumento) => this.documentosCollection.add(documento);
  deleteDocumento = (id: string) => this.documentosCollection.doc(id).delete();

}
