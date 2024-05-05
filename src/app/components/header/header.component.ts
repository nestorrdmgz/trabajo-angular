import {Component, OnInit} from '@angular/core';
import {doc, Firestore, getDoc} from "@angular/fire/firestore";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  implements OnInit {
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
      }).catch((error) => {
        console.error('Error al obtener el documento de usuario con el id:', id, error);
      });
    } else {
      console.error('No user id found.');
    }
  }

  logout(): void {
    // Borrar los datos del localStorage
    localStorage.removeItem('userId'); // Cambia 'userId' al nombre de tu clave en localStorage

    // Redireccionar a otra página
    window.location.href = '/login'; // Cambia 'pagina-de-inicio.html' a la URL deseada
  }

}
