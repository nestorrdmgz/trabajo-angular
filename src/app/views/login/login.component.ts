import { Component } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs } from "@angular/fire/firestore";
import { FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private firestore: Firestore, private router: Router) {}

  dni = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  async procesar() {
    if (this.dni.valid && this.password.valid) {
      const dniValue = this.dni.value;
      const passwordValue = this.password.value;

      const queryRef = query(collection(this.firestore, 'usuarios'), where('dni', '==', dniValue), where('password', '==', passwordValue));
      const querySnapshot = await getDocs(queryRef);

      if (querySnapshot.size > 0) {
        const doc = querySnapshot.docs[0];
        const userId = doc.id;


        // Save user ID in localStorage
        localStorage.setItem('userId', userId);

        // Redirect to home page
        this.router.navigate(['/home']);
      } else {
        console.log('Error de autenticación. DNI o contraseña incorrectos.');
      }

      this.dni.reset();
      this.password.reset();
    } else {
      console.error('Por favor, completa el formulario correctamente.');
    }
  }
}
