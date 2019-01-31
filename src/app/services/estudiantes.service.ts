import { IDocumento } from './documentos.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Estudiante {
  codigo: string;
  documento: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  celular: string;
  fechaCreacion: number;
  documentos: IDocumento[];
}

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  private estudiantesCollection: AngularFirestoreCollection<Estudiante>;
  private estudiantes: Observable<Estudiante[]>;

  constructor(private db: AngularFirestore) {
    this.estudiantesCollection = db.collection<Estudiante>('estudiantes');

    // Se consuluta el estado actual de los datos
    this.estudiantes = this.estudiantesCollection.snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getEstudiantes = () => this.estudiantes;
  getEstudiante = (id: string) => this.estudiantesCollection.doc(id).valueChanges();
  updateEstudiante = (estudiante: Estudiante, id: string) => this.estudiantesCollection.doc(id).update(estudiante);
  addEstudiante = (estudiante: Estudiante) => this.estudiantesCollection.add(estudiante);
  deleteEstudiante = (id: string) => this.estudiantesCollection.doc(id).delete();

}
