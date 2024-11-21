import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any[] = []; // All products
  lowStockProducts: any[] = []; // Filtered products with low stock
  cart: any[] = [];
  constructor(private apiService: ApiService,private router: Router) {}

  ngOnInit(): void {
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');

    if (storedProducts.length > 0) {
      this.products = storedProducts;
      this.lowStockProducts = this.products.filter(product => product.AvailablePieces <= 5);
    } else {
      this.apiService.getProducts().subscribe((data) => {
        this.products = data;
        this.lowStockProducts = this.products.filter(product => product.AvailablePieces <= 5);
        localStorage.setItem('products', JSON.stringify(this.products)); // تخزين المنتجات في localStorage
      });
    }
  }

  increaseQuantity(product: any): void {
    product.newQuantity = (product.newQuantity || product.AvailablePieces) + 1;
    product.AvailablePieces = product.newQuantity; // تحديث AvailablePieces
    this.updateProductInLocalStorage(product); // حفظ المنتج في localStorage
  }

  decreaseQuantity(product: any): void {
    const currentQuantity = product.newQuantity || product.AvailablePieces;
    if (currentQuantity > 0) {
      product.newQuantity = currentQuantity - 1;
      product.AvailablePieces = product.newQuantity; // تحديث AvailablePieces
      this.updateProductInLocalStorage(product); // حفظ المنتج في localStorage
    }
  }
  updateProductInLocalStorage(product: any): void {
    const productsFromStorage = JSON.parse(localStorage.getItem('products') || '[]');
    const productIndex = productsFromStorage.findIndex((p: any) => p.ProductId === product.ProductId);

    if (productIndex !== -1) {
      // تحديث المنتج الموجود
      productsFromStorage[productIndex] = product;
    } else {
      // إذا لم يكن موجودًا، أضفه
      productsFromStorage.push(product);
    }

    // حفظ القائمة المحدثة في localStorage
    localStorage.setItem('products', JSON.stringify(productsFromStorage));
  }


  openAddOrder(): void {
    this.router.navigate(['/add-order']); // Replace with the correct route for the Add Order page
  }


  addToOrder(product: any): void {
    this.apiService.addToCart(product); // Use the service to add the product to the cart
    alert(`${product.ProductName} has been added to the order!`);
  }




}
