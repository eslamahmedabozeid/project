import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  customer: any;
  products: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const orderId = +this.route.snapshot.paramMap.get('id')!;

    // Fetch order details
    this.apiService.getOrder(orderId).subscribe((orderData) => {
      this.order = orderData;

      // Fetch customer details based on UserId from order
      this.apiService.getCustomers().subscribe((users) => {
        this.customer = users.find((user) => user.Id === this.order.UserId);
      });

      // Fetch all products
      this.apiService.getProducts().subscribe((productData) => {
        this.products = productData;
      });
    });
  }

  getProduct(productId: number): any {
    return this.products.find((product) => product.ProductId === productId);
  }
}
