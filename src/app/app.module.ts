import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { HomeComponent } from './views/home/home.component';
import { AddProductsComponent } from './views/add-products/add-products.component';
import { ProductComponent } from './components/product/product.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    AddProductsComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyAWrf2Iu0EoVrPXRudUNTSERrbF8xb28m4",
      authDomain: "controlmaterial-pwm.firebaseapp.com",
      databaseURL: "https://controlmaterial-pwm-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "controlmaterial-pwm",
      storageBucket: "controlmaterial-pwm.appspot.com",
      messagingSenderId: "855174970998",
      appId: "1:855174970998:web:af7b856461b3e1f859a957",
      measurementId: "G-NDVY1V6JFF"
    })),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
