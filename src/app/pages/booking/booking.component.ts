import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  bookingForm: FormGroup;
  isSubmitting = signal(false);
  isSubmitted = signal(false);
  
  minDate = new Date();
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 2));
  
  timeSlots = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30'
  ];
  
  guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-]{10,}$/)]],
      email: ['', [Validators.email]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      guests: [2, Validators.required],
      comments: ['']
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.isSubmitting.set(true);
      
      // Симуляція відправки на сервер
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.isSubmitted.set(true);
        this.snackBar.open('Бронювання успішно відправлено!', 'OK', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }, 1500);
    } else {
      this.bookingForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.bookingForm.reset({ guests: 2 });
    this.isSubmitted.set(false);
  }
}
