import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataStoreService } from '../../services/data-store.service';
import { take } from 'rxjs/operators';
import { v4 as unique } from 'uuid';
import { OrderData } from '../../models/order.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  countries = ['USA', 'CANADA'];
  payment = ['VISA', 'MASTERCARD'];

  constructor(
    public fb: FormBuilder,
    public dataStoreService: DataStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: [this.countries[0], Validators.required],
      paymentMethod: [this.payment[0], Validators.required],
      card: ['', [Validators.required, Validators.maxLength(16)]],
      expiryDate: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(7),
          Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{4})$/),
        ],
      ],
      cvc: ['', [Validators.required, Validators.maxLength(4)]],
      cardHolderName: ['', Validators.required],
    });
  }

  onSubmit(form: any): void {
    this.dataStoreService.cartItems$.pipe(take(1)).subscribe((val) => {
      console.table('Form Values', form);
      console.log('Cart Items', val);
      const order: OrderData = {
        orderNumber: unique(),
        total:
          '$' +
          val
            .reduce(
              (sum, { price }) =>
                sum + parseFloat(price.substring(1, price.length)),
              0
            )
            .toString(),
      };
      this.dataStoreService.setOrders([order]);
      if (window.confirm('Order Submitted Successfully')) {
        this.router.navigate(['/orders']);
        this.dataStoreService.clearCart();
      }
    });
  }
}
