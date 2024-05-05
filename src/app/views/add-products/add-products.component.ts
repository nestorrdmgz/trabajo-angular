import { Component } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs } from "@angular/fire/firestore";
import { FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Storage, ref, uploadBytes, getDownloadURL } from "@angular/fire/storage";


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent {

  constructor(
    private firestore: Firestore,
    private router: Router,
    private storage: Storage
  ) {}

  name = new FormControl('', Validators.required);
  num = new FormControl('', [Validators.required, Validators.min(1)]);

  fotoname: string = ''
  //Sube imagenes a storage
  cargarImagen($event: any) {
    const file = $event.target.files[0]; // Obtiene el archivo seleccionado del evento
    const imgRef = ref(this.storage, `images/${file.name}`); // Usa file.name para obtener el nombre del archivo

    uploadBytes(imgRef, file)
      .then(() => {
        getDownloadURL(imgRef)
          .then((url) => {
            // Puedes usar directamente file.name como nombre del archivo
            const fileName = file.name;
            this.fotoname = fileName;
          })
          .catch((error) => console.log('Error al obtener la URL de descarga:', error));
      })
      .catch(error => console.log('Error al subir la imagen:', error));
  }


  getFileNameFromUrl(url: string): string {
    // Obtener el nombre de la foto de la URL
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  }


  procesar() {
    if (this.name.valid && this.num.valid) {

      const nameValue = this.name.value;
      const numValue = this.num.value;

      const userData = { name: nameValue, num: numValue, url: this.fotoname };

      const Ref = collection(this.firestore, 'productos'); // Cambia 'usuarios' por el nombre de tu colección en Firestore
      addDoc(Ref, userData)
        .then(() => {
          console.log('Datos agregados correctamente a Firestore:', userData);
          this.name.reset();
          this.num.reset();
          this.router.navigate(['/home']);
        })
        .catch((error) => {
          console.error('Error al agregar datos a Firestore:', error);
        });
    } else {
      console.error('Por favor, completa el formulario correctamente.');
    }
  }

}
