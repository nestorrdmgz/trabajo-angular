import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  getDoc,
  docSnapshots,
  updateDoc,
  getDocs
} from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any;
  carrito: { [nombre: string]: number } = {};

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
          this.carrito = this.userData.carrito
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
      this.getAllProducts();
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


  async getAllProducts(): Promise<void> {
    try {
      // Obtener referencia a la colección de productos
      const productsRef = collection(this.firestore, 'productos');

      // Obtener snapshot de la colección
      const querySnapshot = await getDocs(productsRef);

      // Array para almacenar promesas de actualización
      const updatePromises: Promise<void>[] = [];

      // Recorrer los documentos en la colección
      querySnapshot.forEach((doc: any) => {
        // Obtener nombre del producto
        const nombreProducto = doc.data().name;

        // Verificar si el producto está en el carrito
        if (this.carrito.hasOwnProperty(nombreProducto)) {
          // Calcular nueva cantidad de productos
          const cantidad = this.carrito[nombreProducto];
          const nuevo = doc.data().num + cantidad;
          const publiId = doc.id;
          this.updatenum(publiId, nuevo);
        }
      });
      // Esperar a que todas las actualizaciones se completen
      await Promise.all(updatePromises);

      console.log('Actualización de productos completa.');
    } catch (error) {
      console.error('Error al actualizar productos:', error);
    }
  }





  async updatenum(id: string, nuevo: number): Promise<void> {
    try {
      // Crear referencia al documento
      const userDocRef = doc(this.firestore, `productos/${id}`);

      // Actualizar el campo "num" del documento
      await updateDoc(userDocRef, { num: nuevo });

      console.log(`Campo "num" del documento ${id} actualizado correctamente.`);
      this.datausuario();
    } catch (error) {
      console.error('Error al actualizar el campo "num" del documento:', error);
    }
  }
}
