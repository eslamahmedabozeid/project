import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  products: any[] = [];
  currentPage: number = 1; // Track the current page

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Fetch orders and products
    this.apiService.getOrders().subscribe((data) => {
      this.orders = data.map((order) => ({
        ...order,
        OrderDate: this.fixDateFormat(order.OrderDate),
      }));
    });

    this.apiService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  private fixDateFormat(dateStr: string): string {
    return dateStr.replace(/(\d{4})(\d{2}:\d{2}:\d{2})/, '$1 $2');
  }

  calculateTotal(orderProducts: any[]): number {
    return orderProducts.reduce((total, item) => {
      const product = this.products.find((p) => p.ProductId === item.ProductId);
      return total + (product ? product.ProductPrice * item.Quantity : 0);
    }, 0);
  }

  viewOrderDetails(orderId: number): void {
    // Navigate to the Order Details page
    window.location.href = `/order-details/${orderId}`;
  }
}
