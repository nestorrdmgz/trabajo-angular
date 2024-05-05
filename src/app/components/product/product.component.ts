import {Component, OnInit} from '@angular/core';
import {Storage, ref, getDownloadURL} from '@angular/fire/storage';
import {Firestore, collection, collectionData, doc, setDoc, getDoc, docSnapshots, getDocs, updateDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productos$: Observable<any[]> | null = null;
  imagesMap: Map<string, string[]> = new Map<string, string[]>();
  carrito: { [nombre: string]: number } = {};
  userId = '';
  mensajeError: string = '';

  constructor(
    private storage: Storage,
    private firestore: Firestore
  ) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.userId = '';
  }


  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  async getProducts(): Promise<void> {
    const ref = collection(this.firestore, 'productos');
    this.productos$ = collectionData(ref);
    this.productos$.subscribe(async productos => {
      for (const producto of productos) {
        const imageUrls = await this.getProductImageUrls(producto.url);
        this.imagesMap.set(producto.url, imageUrls);
        // Inicializar la propiedad contador a 0 si aún no está definida
        if (producto.contador === undefined) {
          producto.contador = 0;
        }
      }
    });
  }

  async getProductImageUrls(imageName: string): Promise<string[]> {
    try {
      const imageRef = ref(this.storage, 'images/' + imageName);
      const url = await getDownloadURL(imageRef);
      return [url]; // Return array to support multiple images in the future
    } catch (error) {
      console.error('Error getting image URL:', error);
      return [];
    }
  }

  // Función para incrementar el contador y agregar al carrito
  // Función para incrementar el contador y agregar al carrito
  increment(producto: any): void {
    producto.contador = parseInt(producto.contador, 10) || 0; // Convertir a número o establecer a 0 si no se puede convertir
    if (producto.contador < producto.num) {
      producto.contador++;
      this.addToCart(producto.name);
    }
  }

// Función para decrementar el contador y eliminar del carrito si es 0
  decrement(producto: any): void {
    producto.contador = parseInt(producto.contador, 10) || 0; // Convertir a número o establecer a 0 si no se puede convertir
    if (producto.contador > 0) {
      producto.contador--;
      this.minusToCart(producto.name);
    }
  }

// Función para agregar al carrito
  addToCart(nombre: string): void {
    if (this.carrito.hasOwnProperty(nombre)) {
      this.carrito[nombre]++;
    } else {
      this.carrito[nombre] = 1;
    }
    console.log(this.carrito);
  }

// Función para restar al carrito
  minusToCart(nombre: string): void {
    if (this.carrito.hasOwnProperty(nombre)) {
      this.carrito[nombre]--;
      if (this.carrito[nombre] === 0) {
        delete this.carrito[nombre];
      }
    }
    console.log(this.carrito);
  }

  uploadCart(): void {
    const id = this.getUserId();
    const userDocRef = doc(this.firestore, `usuarios/${id}`);
    if (Object.keys(this.carrito).length != 0) {
      getDoc(userDocRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const updatedUserData = {...userData, carrito: this.carrito};
          setDoc(userDocRef, updatedUserData)
            .then(() => {
              this.getAllProducts();
              console.log('Carrito actualizado correctamente en Firebase para el usuario con DNI:', id);
            })
            .catch((error) => {
              console.error('Error al actualizar el carrito en Firebase para el usuario con DNI:', id, error);
            });
        } else {
          console.error('No existe ningún documento de usuario con el DNI:', id);
        }
      }).catch((error) => {
        console.error('Error al obtener el documento de usuario con el DNI:', id, error);
      });
    } else {
      this.mensajeError = 'Debe agregar al menos un artículo';

      setTimeout(() => {
        this.mensajeError = '';
      }, 3000);
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
          const nuevo = doc.data().num - cantidad;
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
      this.getProducts();
    } catch (error) {
      console.error('Error al actualizar el campo "num" del documento:', error);
    }
  }







}
