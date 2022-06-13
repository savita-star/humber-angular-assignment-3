import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  countries = ['USA', 'CANADA'];
  payment = ['VISA', 'MASTERCARD'];

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: [this.countries[0], Validators.required],
      paymentMethod: [this.payment[0], Validators.required],
      card: [null, [Validators.required, Validators.maxLength(16)]],
      expiryDate: ['', Validators.required],
      cvc: ['', Validators.required],
      cardHolderName: ['', Validators.required],
    });
  }
}
