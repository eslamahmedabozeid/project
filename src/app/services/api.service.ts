import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private productsUrl = 'assets/api/porducts.json';
  private ordersUrl = 'assets/api/orders.json';
  private customersUrl = 'assets/api/users.json';
  private cart: any[] = [];

  constructor(private http: HttpClient) {}

  // Fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      map((data) => {
        this.products = data; // Cache the products
        return data;
      })
    );
  }
  // Fetch all orders
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl);
  }

  // Fetch a single order by ID
  getOrder(orderId: number): Observable<Order | undefined> {
    return this.getOrders().pipe(
      map((orders) => orders.find((order) => order.OrderId === orderId))
    );
  }

  // Add a new order (Simulating POST request)
  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.ordersUrl, order);
  }
  private products: Product[] = [];

  // Edit product quantity (Simulating PUT request)
  editProductQuantity(productId: number, quantity: number): Observable<Product | null> {
    const product = this.products.find((p) => p.ProductId === productId); // Uses ProductId
    if (product) {
      product.AvailablePieces = quantity; // Updates AvailablePieces
      return new Observable((observer) => {
        observer.next(product);
        observer.complete();
      });
    }
    return new Observable((observer) => {
      observer.next(null);
      observer.complete();
    });
  }

  // Fetch all customers
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl);
  }

  // Fetch a single customer by ID
  getCustomerById(customerId: string): Observable<Customer | undefined> {
    return this.getCustomers().pipe(
      map((customers) => customers.find((customer) => customer.Id === customerId))
    );
  }


  getCartItems(): any[] {
    return this.cart;
  }

  addToCart(product: any): void {
    const existingProduct = this.cart.find((item) => item.ProductId === product.ProductId);
    if (existingProduct) {
      existingProduct.Quantity++;
    } else {
      this.cart.push({ ...product, Quantity: 1 });
    }
    this.saveCartToLocalStorage();
  }

  removeItem(productId: number): void {
    this.cart = this.cart.filter((item) => item.ProductId !== productId);
    this.saveCartToLocalStorage();
  }

  clearCart(): void {
    this.cart = [];
    this.saveCartToLocalStorage();
  }

  getCart(): any[] {
    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart ? JSON.parse(storedCart) : [];
    return this.cart;
  }
  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));

  }

}
