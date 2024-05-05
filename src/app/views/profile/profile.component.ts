import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, getDoc, docSnapshots, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any;

  constructor(private firestore: Firestore) { }

  ngOnInit(): void {
    this.datausuario();
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  datausuario(): void {
    const id = this.getUserId();
    if (id) {
      const userDocRef = doc(this.firestore, `usuarios/${id}`);
      getDoc(userDocRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          this.userData = docSnapshot.data();
          console.log(this.userData);
        } else {
          console.error('No existe ningún documento de usuario con el id:', id);
        }
      }).catch((error: any) => {
        console.error('Error al obtener el documento de usuario con el id:', id, error);
      });
    } else {
      console.error('No user id found.');
    }
  }

  removemap(): void {
    const id = this.getUserId();
    if (id) {
      const userDocRef = doc(this.firestore, `usuarios/${id}`);
      updateDoc(userDocRef, { carrito: null }).then(() => {
        console.log('Campo "carrito" eliminado correctamente');
        this.datausuario(); // Actualizar datos del usuario después de eliminar el campo "carrito"
      }).catch((error: any) => {
        console.error('Error al eliminar el campo "carrito":', error);
      });
    } else {
      console.error('No user id found.');
    }
  }
}
