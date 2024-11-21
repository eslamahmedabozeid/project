
Task Overview
The task involves creating a web application using the latest Angular version to manage and display Products, Orders, and Customers data. The data is provided in JSON files. The application consists of three main pages:

Products Page: Displays all available products, highlights low-stock items, and allows users to edit product quantities.
Orders Page: Displays all orders with their total price and payment method.
Order Details Page: Displays details of a specific order, including customer and product details.
Additionally, the application implements functionality to add new orders and follows best practices in Angular development.

Task Implementation Details
1. Application Structure
The project is structured to follow Angular best practices:

Lazy Loading: Each feature (Products, Orders, Order Details) is implemented in its own module and loaded lazily.
Service Layer: A centralized service (ApiService) manages all HTTP requests and business logic.
Reusable Components: UI components such as tables, forms, and modals are designed for reuse.
State Management: Local storage is used for persistent state management of product quantities.
2. Pages Overview
Products Page
Displays all products in a responsive grid layout.
Highlights low-stock products (quantity ≤ 5).
Provides buttons to increase or decrease product quantities.
Updates product quantities in both the UI and localStorage.
Uses the editProductQuantity(productId, quantity) service method to simulate server-side updates.
Allows users to navigate to an Add Order page with selected products.
Code Highlights:

ngOnInit: Loads products from localStorage or API.
Quantity controls: Handlers for increasing, decreasing, and saving product quantities.
Responsive Design: CSS implemented using SCSS and media queries.
Orders Page
Displays all orders in a table format.
Shows order details like total price and payment method.
Provides a button to view order details (navigates to the Order Details page).
Orders data is fetched using the getOrders() service method.
Code Highlights:

Orders are dynamically loaded from the JSON file using the ApiService.
Total price is calculated by summing the prices of all products in an order.
Order Details Page
Displays:
Order details (Order ID, Date, Payment Method, etc.).
Customer details (Name, Email, Address).
Product details (Name, Quantity, Price).
Data is fetched using the getOrder(orderId) service method.
Code Highlights:

Uses route parameters to fetch the order ID and retrieve details dynamically.
Displays the data in a responsive and structured layout.
3. Additional Features
Add New Order
Users can select products from the Products Page and proceed to an Add Order page.
Add Order Page:
Allows users to input customer details and select a payment method.
Submits the new order using the addOrder(order) service method.
Updates the orders.json file (simulated).
4. Responsive Design
The UI is fully responsive, using a grid system and SCSS:

Mobile View: Adjusts layouts for smaller screens using media queries.
Desktop View: Displays detailed information in a clean layout.
5. Angular Features Used
Routing & Lazy Loading:

Feature modules (Products, Orders, Order Details) are loaded lazily to optimize performance.
Routes are defined using RouterModule.
Dependency Injection:

ApiService handles data retrieval and updates using HTTP methods.
Services are injected into components following Angular's DI pattern.
Semantic HTML:

Proper usage of semantic tags (<section>, <article>, <header>, etc.) for accessibility and readability.
Latest Angular Version:

Developed using Angular 16+ with standalone APIs and signals (where applicable).
LocalStorage Integration:

Products are cached in localStorage for persistence between sessions.
Synchronization with UI ensures updated data is stored and retrieved correctly.
6. Bonus Features
Highlighting Low-Stock Products:
Products with quantities ≤ 5 are visually highlighted.
Persistent Product State:
Product quantities are stored in localStorage, ensuring changes persist across page reloads.
Evaluation Criteria
Project Structure
The project is modularized, with separate feature modules for Products, Orders, and Order Details.
Common components and services are placed in shared folders for reusability.
Clean Code
Consistent coding style with proper comments.
All methods are well-documented, describing their purpose and functionality.
Responsive UI
Tested on multiple devices to ensure consistent behavior across different screen sizes.
ReadMe
The repository includes a comprehensive README.md with:

Instructions for setting up and running the application.
Details of the application's features and implementation.
Source Control
The project was developed using Git:

Branches: Separate branches for features (e.g., products-page, orders-page).
Commits: Each commit is atomic, with clear messages describing changes.
Methods Implemented in ApiService
getProducts(): Fetches the products list from products.json.
getOrders(): Fetches the orders list from orders.json.
getOrder(orderId): Fetches details of a specific order.
addOrder(order): Adds a new order (simulated using local updates).
editProductQuantity(productId, quantity): Edits the quantity of a product.
Conclusion
This project meets all the requirements specified in the task, following Angular best practices. It is a scalable, maintainable, and responsive web application designed for optimal performance and user experience.


# Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
