import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    provideFirebaseApp(() => initializeApp({"projectId":"meal-planner-401311","appId":"1:190346825102:web:8e4beb0778f61cacfe68df","databaseURL":"https://meal-planner-401311-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"meal-planner-401311.appspot.com","apiKey":"AIzaSyDI_S85R9jJW9wO32ORBfcKlDmJufCZoe4","authDomain":"meal-planner-401311.firebaseapp.com","messagingSenderId":"190346825102","measurementId":"G-321QYBKH15"})),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
