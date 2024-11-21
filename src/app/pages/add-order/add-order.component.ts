import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit {
  cartItems: any[] = [];
  customers: any[] = [];
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;

  newOrder: any = {
    UserId: '',
    PaymentType: 'Cash',
    Products: [],
  };

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    // Load cart items from the service (which reads from localStorage)
    this.cartItems = this.apiService.getCart();

    // Fetch customers
    this.apiService.getCustomers().subscribe((data) => (this.customers = data));

    this.updateTotals();
  }



  increaseQuantity(item: any): void {
    item.Quantity++;
    this.updateTotals();
  }

  decreaseQuantity(item: any): void {
    if (item.Quantity > 1) {
      item.Quantity--;
      this.updateTotals();
    }
  }

  removeFromCart(item: any): void {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.ProductId !== item.ProductId);
    this.updateTotals();
  }

  updateTotals(): void {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.ProductPrice * item.Quantity, 0);
    this.tax = this.subtotal * 0.1; // Example tax rate
    this.total = this.subtotal + this.tax;
  }

  submitOrder(): void {
    if (!this.newOrder.UserId || this.cartItems.length === 0) {
      alert('Please select a customer and add at least one product.');
      return;
    }

    this.newOrder.Products = this.cartItems.map((item) => ({
      ProductId: item.ProductId,
      Quantity: item.Quantity,
    }));

    this.apiService.addOrder(this.newOrder).subscribe(
      (response) => {
        alert('Order placed successfully!');
        this.router.navigate(['/orders']);
      },
      (error) => {
        console.error('Failed to place order:', error);
        alert('Failed to place order. Please try again.');
      }
    );
  }
}
