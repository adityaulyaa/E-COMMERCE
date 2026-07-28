# 1. Project Overview

## Application Description

This project is a single-vendor web-based e-commerce application that enables customers to perform independent shopping processes from product search to transaction completion.

The application is developed using a separated frontend and backend architecture that communicate through RESTful API.

The application has only one primary actor: Customer.

The application can be accessed through desktop and mobile browsers with a responsive interface.

---

## Project Objective

The main objective of this project is to provide a secure, responsive, and user-friendly online shopping platform.

The application is designed to allow users to:

- Register an account
- Login to the system
- Browse product catalog
- Search and filter products
- Manage shopping cart
- Perform checkout process
- Execute payment simulation
- View order history

Authentication uses JSON Web Token (JWT) to maintain secure user access.

---

## Project Scope Summary

The project covers the following features:

- User Authentication
- Product Catalog
- Shopping Cart
- Checkout
- Mock Payment Simulation
- Order Management
- Order History

The project **does not include**:

- Admin Panel
- Real Payment Gateway
- Shipping Provider Integration
- Inventory Management
- Mobile Application (Android/iOS)

---

## Target User

This project has only one type of user: Customer.

Customer is a user who can perform all shopping activities from registration to viewing transaction history.

---

## Technology Overview

| Layer | Technology |
|-------|------------|
| Frontend | React |
| Backend | Spring Boot |
| Database | MySQL |
| Security | Spring Security + JWT |
| Communication | RESTful API |

---

## Development Notes

### Development Rules

- This document is the single source of truth for the project.
- Never implement features outside the project scope.
- Never assume requirements that are not explicitly documented.
- All future development must follow this specification.
- The project is customer-oriented and does not include administrative features.
- Maintain consistency with the defined architecture and technology stack.

---

# 2. Project Scope

## 2.1 In Scope

The project scope encompasses all functional requirements defined in the system specification.

| Module | Use Cases | Included Features |
|---------|----------:|-------------------|
| Authentication | 3 | Register, Login, Logout |
| Product Catalog | 4 | View Product List, Search Product, Filter Product, View Product Detail |
| Shopping Cart | 4 | View Cart, Add to Cart, Update Cart, Remove Cart Item |
| Order Processing | 4 | Checkout, Choose Payment Method, Process Payment, Retry Payment |
| Order | 2 | View Order History, View Order Detail |

The project consists of **5 main modules**. There are a total of **17 use cases** that form the basis of implementation scope.

All use cases serve as the foundation for backend implementation, frontend implementation, database design, REST API development, and system testing.

All features listed in the table above must be implemented. No new features may be added to the project unless they are explicitly included in this list.

---

## 2.2 Out of Scope

This project explicitly **does not include**:

- Admin Panel
- Administrator User
- Multi Role User
- Real Payment Gateway Integration
- Shipping Provider Integration
- Inventory Management
- Android Application
- iOS Application
- Desktop Application
- Marketplace Multi Vendor
- Any features outside the defined scope

These features must not be implemented unless there is an explicit change request to the project requirements.

---

## 2.3 Primary Actor

The application has only **one primary actor**: Customer.

Customer is an end user of the application who performs all shopping processes independently.

Customer has the following access rights:

- Register account
- Login
- Logout
- View Product List
- Search Product
- Filter Product
- View Product Detail
- View Shopping Cart
- Add Product to Cart
- Update Cart
- Remove Cart Item
- Checkout
- Choose Payment Method
- Process Payment
- Retry Payment
- View Order History
- View Order Detail

The project has no Admin actor or any other user roles.

---

## 2.4 Core Business Flow

```
Open Application
       ↓
Already Have Account?
       ├── Yes → Login
       └── No → Register → Login
              ↓
    Display Product Catalog
              ↓
    Search / Browse Product
              ↓
    View Product Detail
              ↓
    Add Product to Shopping Cart
              ↓
    System Updates Shopping Cart
              ↓
        Checkout
              ↓
    Choose Payment Method
              ↓
    Process Payment
       ├── Success → Create Order
       └── Failed → Retry Payment
              ↓
    Payment Successful
              ↓
    View Order History
              ↓
    View Order Detail
              ↓
           End
```

All module implementations must follow this business flow sequence to ensure consistent user experience.

---

## 2.5 Business Objectives

The main business objectives of this project are:

- Provide an online sales platform.
- Expand customer reach.
- Simplify product purchase processes.
- Provide a straightforward and easy-to-understand transaction process.
- Provide payment simulation without integrating a real payment gateway.
- Provide transaction history that customers can monitor.

---

## 2.6 Development Constraints

Implementation constraints for this project:

- Web application only.
- Responsive Web Design.
- Single Vendor E-Commerce.
- Single Actor (Customer).
- Frontend and Backend separated.
- Communication via RESTful API.
- Database uses MySQL.
- Authentication uses Spring Security and JWT.
- Payment uses Mock Payment Simulation.
- No administrator features.
- No shipping provider integration.
- No real payment gateway integration.

---

## 2.7 Development Rules

### Development Rules

- PROJECT_SPEC.md is the single source of truth for all project implementation.
- Never implement features outside the defined project scope.
- Never create Admin modules unless explicitly requested.
- Never introduce additional user roles.
- Never implement Multi Vendor functionality.
- Never integrate real payment gateways.
- Never implement shipping providers.
- Never implement inventory management.
- Never create mobile applications as part of this project.
- Every implementation must follow the defined business flow.
- Every feature must belong to one of the five defined modules.
- Every implementation must be traceable to one or more of the seventeen defined use cases.
- If a requested feature is not included in the project scope, it must be treated as a change request instead of part of the current implementation.
- Maintain consistency with the defined architecture, business flow, and project boundaries.

---

# 3. Business Requirements

## 3.1 Business Goals

The application development aims to meet the company's business needs through a web-based e-commerce platform.

The business objectives are:

- Provide an online product sales platform.
- Expand customer reach without location constraints.
- Simplify the purchasing process from product search to payment.
- Enable customers to monitor transaction history independently.

All features in the application are developed to support these business objectives.

---

## 3.2 Business Problems

The business problems that the application aims to solve:

- Sales still rely on conventional processes.
- Customers need online purchasing access.
- The purchasing process must be simple and structured.
- Customers need access to their transaction history.

---

## 3.3 Target User

The application is designed for only one type of user.

### Customer

Customer is the end user of the application.

Customer uses the application to perform all purchasing processes independently.

Customer's primary activities include:

- Register account
- Login
- Browse product catalog
- Search products
- Filter products
- View product detail
- Manage shopping cart
- Checkout
- Select payment method
- Complete payment simulation
- View order history
- View order detail

All business requirements of the application are designed to meet Customer needs as the sole primary actor.

---

## 3.4 Customer Journey

The main business flow of the application based on Customer processes:

```
Open Application
       ↓
Already Have Account?
       ├── Yes → Login
       └── No → Register → Login
              ↓
    System Displays Product List
              ↓
    Customer Searches or Browses Products
              ↓
    Customer Views Product Detail
              ↓
    Customer Adds Product to Shopping Cart
              ↓
    System Updates Shopping Cart
              ↓
    Customer Proceeds to Checkout
              ↓
    Customer Selects Payment Method
              ↓
    System Processes Mock Payment
       ├── Payment Success
       │      ↓
       │   System Creates Order
       │      ↓
       │   Payment Confirmation
       │
       └── Payment Failed
              ↓
          Retry Payment
              ↓
    Customer Opens Order History
              ↓
    System Retrieves Order Data
              ↓
    Customer Views Order Detail
              ↓
           End
```

The business process begins when Customer opens the application. If Customer does not have an account, they must register first. After registration or if they already have an account, Customer logs in. The system displays the product list. Customer searches or selects products. Customer views product details before purchasing. Customer adds products to the Shopping Cart. The system updates the Shopping Cart contents. Customer proceeds to Checkout. Customer selects a payment method. The system performs payment simulation. If payment is successful, the system creates a transaction and displays payment confirmation. If payment fails, Customer can perform Retry Payment. After successful transaction, Customer can view Order History and transaction details.

---

## 3.5 Functional Requirement Summary

All business requirements are realized through five main application modules.

| Module | Business Responsibility |
|---------|-------------------------|
| Authentication | Manages Customer authentication through Register, Login, and Logout processes. |
| Product Catalog | Provides product information and product search and filtering capabilities. |
| Shopping Cart | Manages the list of products that Customer will purchase. |
| Order Processing | Manages Checkout and payment simulation processes until transaction is created. |
| Order | Provides transaction history and Customer order details. |

All modules work sequentially following the Customer Journey described above.

---

## 3.6 Business Requirement Traceability

The relationship between business goals and modules that implement them:

| Business Goal | Supported Modules |
|---------------|-------------------|
| Online Product Sales | Product Catalog, Shopping Cart |
| Wider Customer Reach | Authentication, Product Catalog |
| Simple Purchasing Process | Shopping Cart, Order Processing |
| Order Tracking | Order |

Each module is developed to fulfill one or more business goals so that all implementations always have a clear business requirement foundation.

---

## 3.7 Development Rules

### Development Rules

- Every implemented feature must support at least one business goal.
- Every module must solve a real business requirement.
- Never implement technical features without business value.
- Every business process must follow the defined Customer Journey.
- Customer experience must remain simple, sequential, and consistent.
- The application is designed around Customer needs only.
- Business requirements take precedence over implementation preferences.
- Do not introduce business processes that are not defined in this specification.

---

# 4. Functional Requirements

## 4.1 Authentication Module

---

### Purpose

Authentication is responsible for managing the Customer authentication process so that only registered users who have successfully logged in can access features that require authentication.

This module uses Spring Security and JSON Web Token (JWT) as authentication mechanisms.

---

### Features

The Authentication module consists of three main features:

- Register
- Login
- Logout

---

## 4.1.1 Register

### Description

Register allows a Customer to create a new account using Full Name, Email, Password, and Confirm Password.

Customers can only access features that require authentication after successfully registering and logging in.

---

### Preconditions

- Customer does not yet have an account.
- Customer is on the Register page.

---

### Workflow

```
Customer opens Register page
       ↓
Customer enters:
- Full Name
- Email
- Password
- Confirm Password
       ↓
Customer clicks Register
       ↓
System validates registration data
       ↓
Registration data valid?
       ├── No
       │     Return validation error
       │
       └── Yes
              ↓
       System checks email uniqueness
              ↓
       Email already registered?
       ├── Yes
       │     Display email already registered
       │
       └── No
              ↓
       Create Customer account
              ↓
       Save Customer into database
              ↓
       Display registration success message
              ↓
       Redirect to Login page
```

---

### Business Rules

- Email must be unique.
- Password and Confirm Password must be the same.
- All fields are required.
- Account is created only if all validations succeed.
- Customer is directed to Login page after successful registration.

---

### Validation Rules

- Full Name cannot be empty.
- Email must have a valid format.
- Email has not been used before.
- Password cannot be empty.
- Confirm Password must match Password.

---

### System Behavior

- Receive registration data.
- Validate all inputs.
- Check if email has been used.
- Save new Customer.
- Return success or failure status.
- Direct Customer to Login page if registration succeeds.

---

### Acceptance Criteria

- Customer successfully creates a new account.
- Customer data is saved in database.
- Already used email is rejected.
- Invalid data results in validation error.
- Customer is directed to Login page after successful registration.

---

## 4.1.2 Login

### Description

Login allows a Customer to authenticate using Email and Password to gain access to all features that require authentication.

---

### Preconditions

- Customer has an account.
- Customer is on the Login page.

---

### Workflow

```
Customer opens Login page
       ↓
Customer enters Email and Password
       ↓
Customer clicks Login
       ↓
System validates credentials
       ↓
Credentials valid?
       ├── No
       │     Return validation error
       │
       └── Yes
              ↓
       System searches Customer by Email
              ↓
       Account found?
       ├── No
       │     Display account not found
       │
       └── Yes
              ↓
       Verify Password
              ↓
       Password correct?
       ├── No
       │     Display incorrect password
       │
       └── Yes
              ↓
       Generate JWT Access Token
              ↓
       Create authenticated session
              ↓
       Redirect to Home page
```

---

### Business Rules

- Login uses Email and Password.
- Password must match the account data.
- JWT is created only if authentication succeeds.
- Customer can only access protected features after successful login.

---

### Validation Rules

- Email is required.
- Password is required.
- Email must be registered.
- Password must match.

---

### System Behavior

- Receive login credentials.
- Perform validation.
- Retrieve account by Email.
- Verify Password.
- Generate JWT Access Token.
- Create authenticated session.
- Direct Customer to Home.

---

### Acceptance Criteria

- Successful login generates JWT.
- Customer is directed to Home.
- Unregistered email is rejected.
- Incorrect password is rejected.
- Invalid login data results in validation error.

---

## 4.1.3 Logout

### Description

Logout ends the Customer's authenticated session so that all endpoints requiring authentication can no longer be accessed.

---

### Preconditions

- Customer has logged in.
- Customer still has an active authenticated session.

---

### Workflow

```
Customer clicks Logout
       ↓
System receives logout request
       ↓
Validate authenticated session
       ↓
Session active?
       ├── No
       │     Redirect to Login
       │
       └── Yes
              ↓
       Invalidate authentication
              ↓
       Remove JWT token from client
              ↓
       Clear authenticated session
              ↓
       Display logout success message
              ↓
       Redirect to Login page
```

---

### Business Rules

- Logout can only be performed by a logged-in Customer.
- JWT must be invalidated after Logout.
- All authenticated sessions must be ended.

---

### Validation Rules

- Session must be active.
- Customer must be logged in.

---

### System Behavior

- Receive logout request.
- Validate authenticated session.
- Remove JWT from client side.
- End authenticated session.
- Direct Customer to Login page.

---

### Acceptance Criteria

- Customer successfully logs out.
- JWT cannot be used again.
- Customer is directed to Login.
- Endpoints requiring authentication cannot be accessed after Logout.

---

### Development Rules

- Authentication uses Spring Security.
- Authentication uses JWT.
- Password must be stored using BCrypt Password Encoder.
- Password must not be stored in plaintext.
- JWT is created only after successful authentication.
- All endpoints requiring authentication must verify JWT.
- Logout must end authenticated session securely.
- Validation must be performed before authentication process.
- Authentication must be the only login mechanism in the application.
- All implementations must follow the defined workflow.
- Business Rules must not be violated in backend or frontend implementation.

---

## 4.2 Product Catalog Module

---

### Purpose

Product Catalog is responsible for providing product information to Customers and application visitors.

This module allows users to:

- View product list
- Search products
- Filter products
- View product details

All processes in this module are read-only and do not modify product data.

---

### Features

The Product Catalog module consists of four main features:

- View Product List
- Search Product
- Filter Product
- View Product Detail

---

## 4.2.1 View Product List

### Description

This feature allows Customers and visitors to view all available products in the application.

---

### Preconditions

- Customer or visitor opens the Product Catalog page.

---

### Workflow

```
Customer opens Product Catalog page
       ↓
System retrieves product list
       ↓
Products available?
       ├── No
       │     Display "No products available"
       │
       └── Yes
              ↓
       Display product list
```

---

### Business Rules

- All available products can be displayed.
- Product list is the starting point for all purchasing processes.
- Unavailable products must not be displayed if defined in implementation.

---

### Validation Rules

- Request must be valid.
- System must successfully retrieve product data.

---

### System Behavior

- Retrieve product list.
- Send product list to frontend.
- Display information if products are not available.

---

### Acceptance Criteria

- Product list is successfully displayed.
- Empty products display empty state.
- System errors result in error message.

---

## 4.2.2 Search Product

### Description

This feature allows Customers and visitors to search for products based on name or specific keywords.

---

### Preconditions

- Customer is on the Product Catalog page.

---

### Workflow

```
Customer enters search keyword
       ↓
Customer clicks Search
       ↓
System validates keyword
       ↓
Keyword valid?
       ├── No
       │     Display validation message
       │
       └── Yes
              ↓
       Search products by keyword
              ↓
       Matching products found?
       ├── No
       │     Display "Product not found"
       │
       └── Yes
              ↓
       Display search result
```

---

### Business Rules

- Search uses product name or keywords.
- System only displays matching products.
- Search does not modify product data.

---

### Validation Rules

- Keyword cannot be empty.
- Keyword must be valid.

---

### System Behavior

- Receive keyword.
- Validate keyword.
- Perform search.
- Return search results.

---

### Acceptance Criteria

- Products found matching keyword.
- Products not found display appropriate information.
- Invalid keyword results in validation error.

---

## 4.2.3 Filter Product

### Description

This feature allows Customers and visitors to narrow down the product list using specific filters.

Example filters:

- Category
- Price Range
- Rating

---

### Preconditions

- Customer is on the Product Catalog page.

---

### Workflow

```
Customer selects filter
       ↓
Customer applies filter
       ↓
System validates filter
       ↓
Filter valid?
       ├── No
       │     Display validation message
       │
       └── Yes
              ↓
       Retrieve filtered products
              ↓
       Matching products found?
       ├── No
       │     Display "No matching products"
       │
       └── Yes
              ↓
       Display filtered product list
```

---

### Business Rules

- Filter only affects display results.
- Product data does not change.
- Only products that meet filter criteria are displayed.

---

### Validation Rules

- Filter must be valid.
- Filter criteria must be recognized by system.

---

### System Behavior

- Receive filter.
- Validate filter.
- Retrieve products matching filter.
- Send filter results.

---

### Acceptance Criteria

- Products matching filter are successfully displayed.
- No results display empty state.
- Invalid filter results in validation error.

---

## 4.2.4 View Product Detail

### Description

This feature allows Customers and visitors to view complete information about a product before making a purchase.

---

### Preconditions

- Customer selects a product.

---

### Workflow

```
Customer selects product
       ↓
System retrieves product detail
       ↓
Product found?
       ├── No
       │     Display "Product not found"
       │
       └── Yes
              ↓
       Display product detail
```

---

### Business Rules

- Product detail is only displayed if product is found.
- Product information must be complete.
- Product detail serves as the basis before Customer performs Add to Cart.

---

### Validation Rules

- Product ID must be valid.
- Product must be available.

---

### System Behavior

- Retrieve product detail.
- Send product information.
- Display error if product is not found.

---

### Acceptance Criteria

- Product detail is successfully displayed.
- Product not found results in error message.

---

### Development Rules

- Product Catalog is a read-only module.
- Product Catalog must not modify product data.
- Search must not modify data.
- Filter must not modify data.
- Product Detail only displays product information.
- Product List must be the main entry point to the purchasing process.
- Search and Filter can be used together if implementation supports it.
- All features must follow the defined workflow.
- Validation is performed before search or filter processes.
- All implementations must maintain consistent user experience when exploring products.

---

## 4.3 Shopping Cart Module

---

### Purpose

Shopping Cart is responsible for managing all products that Customer will purchase before the Checkout process is performed.

This module allows Customer to:

- View Shopping Cart contents
- Add products
- Update quantity
- Remove products

Shopping Cart is the main stage before Customer proceeds to the Checkout process.

---

### Features

The Shopping Cart module consists of four main features:

- View Cart
- Add to Cart
- Update Cart
- Remove Cart Item

---

## 4.3.1 View Cart

### Description

This feature allows Customer to view all Shopping Cart contents including quantity information, subtotal for each item, and total shopping amount.

---

### Preconditions

- Customer has logged in.
- Shopping Cart may contain one or more products.

---

### Workflow

```
Customer opens Shopping Cart
       ↓
System retrieves Shopping Cart
       ↓
Retrieve Cart Items
       ↓
Calculate subtotal for each item
       ↓
Calculate total amount
       ↓
Shopping Cart contains items?
       ├── No
       │     Display "Shopping Cart is empty"
       │
       └── Yes
              ↓
       Display Shopping Cart
```

---

### Business Rules

- Shopping Cart is only owned by logged-in Customer.
- System must calculate subtotal for each item.
- System must calculate total shopping amount automatically.
- Shopping Cart can be in empty state.

---

### Validation Rules

- Customer must be logged in.
- Shopping Cart must be successfully retrieved.

---

### System Behavior

- Retrieve all Shopping Cart items.
- Calculate subtotal.
- Calculate total payment.
- Send Shopping Cart data to frontend.
- Display empty state if Shopping Cart is empty.

---

### Acceptance Criteria

- Shopping Cart is successfully displayed.
- Subtotal for all items is calculated correctly.
- Total payment is calculated correctly.
- Empty Shopping Cart displays empty state.

---

### Related Features

Depends On

- Authentication

Used By

- Checkout

---

## 4.3.2 Add to Cart

### Description

This feature allows Customer to add products to Shopping Cart as preparation before Checkout.

---

### Preconditions

- Customer has logged in.
- Product is still available.

---

### Workflow

```
Customer selects product
       ↓
Customer clicks Add to Cart
       ↓
System receives request
       ↓
Check product availability
       ↓
Product available?
       ├── No
       │     Display "Product is out of stock"
       │
       └── Yes
              ↓
       Product already exists in Shopping Cart?
       ├── Yes
       │     Increase quantity
       │
       └── No
              ↓
       Create new Cart Item
       ↓
Update Shopping Cart
       ↓
Display success notification
```

---

### Business Rules

- Product can only be added if stock is available.
- Product already in Shopping Cart does not create new item.
- Quantity must increase if product already exists.
- Shopping Cart must be updated after changes.

---

### Validation Rules

- Customer must be logged in.
- Product ID must be valid.
- Product must be available.
- Quantity must not exceed stock.

---

### System Behavior

- Check product availability.
- Check Cart Item existence.
- Increase quantity or create new Cart Item.
- Update Shopping Cart.
- Return success notification.

---

### Acceptance Criteria

- Product is successfully added.
- Quantity increases if product already exists.
- Out of stock products cannot be added.
- Quantity must not exceed stock.

---

### Related Features

Depends On

- View Product Detail

Used By

- View Cart
- Checkout

---

## 4.3.3 Update Cart

### Description

This feature allows Customer to update product quantity in Shopping Cart.

---

### Preconditions

- Customer has logged in.
- Shopping Cart has at least one item.

---

### Workflow

```
Customer opens Shopping Cart
       ↓
Modify quantity
       ↓
System validates quantity
       ↓
Quantity valid?
       ├── No
       │     Display validation error
       │
       └── Yes
              ↓
       Update Cart Item
              ↓
       Recalculate subtotal
              ↓
       Recalculate total amount
              ↓
       Display updated Shopping Cart
```

---

### Business Rules

- Quantity must be greater than zero.
- Quantity must not exceed stock.
- Every quantity change must recalculate subtotal.
- Total payment must always be updated.

---

### Validation Rules

- Quantity must be valid.
- Quantity must not exceed stock.
- Product must still be available.

---

### System Behavior

- Validate quantity.
- Update Cart Item.
- Recalculate subtotal.
- Recalculate total payment.
- Return updated Shopping Cart.

---

### Acceptance Criteria

- Quantity is successfully updated.
- Total payment is updated accordingly.
- Invalid quantity results in validation error.

---

### Related Features

Depends On

- View Cart

Used By

- Checkout

---

## 4.3.4 Remove Cart Item

### Description

This feature allows Customer to remove products from Shopping Cart.

---

### Preconditions

- Customer has logged in.
- Shopping Cart has items.

---

### Workflow

```
Customer selects Cart Item
       ↓
Customer clicks Remove
       ↓
System removes Cart Item
       ↓
Recalculate subtotal
       ↓
Recalculate total amount
       ↓
Shopping Cart still contains items?
       ├── No
       │     Display empty Shopping Cart
       │
       └── Yes
              ↓
       Display updated Shopping Cart
              ↓
       Display success notification
```

---

### Business Rules

- Product can be removed anytime before Checkout.
- Shopping Cart must be updated after removal.
- Total payment must be recalculated.

---

### Validation Rules

- Cart Item must exist.
- Customer must be logged in.

---

### System Behavior

- Remove Cart Item.
- Recalculate subtotal.
- Recalculate total payment.
- Send updated Shopping Cart.

---

### Acceptance Criteria

- Product is successfully removed.
- Shopping Cart is updated.
- Total payment is updated.
- Empty Shopping Cart is displayed if all items are removed.

---

### Related Features

Depends On

- View Cart

Used By

- Checkout

---

### Development Rules

- Shopping Cart is only owned by logged-in Customer.
- Each Customer has only one active Shopping Cart.
- Each Cart Item represents one Product.
- Same product must not create new Cart Item.
- Quantity must be increased if Product already exists in Shopping Cart.
- Minimum quantity is 1.
- Quantity must not exceed product stock.
- System must calculate subtotal for each Cart Item automatically.
- System must calculate total payment automatically.
- All Shopping Cart changes must immediately update subtotal and total.
- Shopping Cart must always be synchronized with Product data.
- All implementations must follow the defined workflow.
- Business Rules must not be violated in backend or frontend implementation.

---

## 4.4 Order Processing Module

---

### Purpose

Order Processing is responsible for managing all transaction processes after Customer completes shopping.

This module includes:

- Checkout
- Choose Payment Method
- Process Payment
- Retry Payment

The main purpose of this module is to transform Shopping Cart into a successful transaction through Mock Payment simulation process.

---

### Features

The Order Processing module consists of four main features:

- Checkout
- Choose Payment Method
- Process Payment
- Retry Payment

---

## 4.4.1 Checkout

### Description

Checkout is the final validation process before Customer proceeds to payment.

The system must generate an Order Summary containing all transaction information.

---

### Preconditions

- Customer has logged in.
- Shopping Cart has at least one item.

---

### Workflow

```
Customer opens Shopping Cart
       ↓
Customer clicks Checkout
       ↓
System validates Shopping Cart
       ↓
Shopping Cart valid?
       ├── No
       │     Display checkout failed message
       │
       └── Yes
              ↓
       Calculate subtotal
              ↓
       Calculate total payment
              ↓
       Generate Order Summary
              ↓
       Display Order Summary
```

---

### Business Rules

- Checkout can only be performed if Shopping Cart has items.
- All subtotals are recalculated.
- Total payment is recalculated.
- Order Summary must be created before payment.

---

### Validation Rules

- Customer must be logged in.
- Shopping Cart must not be empty.
- All products must still be valid.

---

### System Behavior

- Validate Shopping Cart.
- Calculate subtotal.
- Calculate total payment.
- Create Order Summary.
- Send Order Summary to frontend.

---

### Acceptance Criteria

- Order Summary is successfully displayed.
- Empty Shopping Cart cannot Checkout.
- Total payment is calculated correctly.

---

### Related Features

Depends On

- View Cart
- Update Cart

Used By

- Choose Payment Method

---

## 4.4.2 Choose Payment Method

### Description

Customer selects the payment method to be used to complete the transaction.

Available payment methods:

- Bank Transfer
- QRIS
- E-Wallet

---

### Preconditions

- Checkout is successful.
- Order Summary is displayed.

---

### Workflow

```
Display available payment methods
       ↓
Customer selects payment method
       ↓
System validates payment method
       ↓
Payment method valid?
       ├── No
       │     Display invalid payment method
       │
       └── Yes
              ↓
       Save selected payment method
              ↓
       Continue to Payment
```

---

### Business Rules

- Customer can only select one payment method.
- Payment method must be available.
- Payment selection is saved before payment process.

---

### Validation Rules

- Payment Method must be selected.
- Payment Method must be valid.

---

### System Behavior

- Display payment methods.
- Validate payment method.
- Save payment method.
- Prepare payment process.

---

### Acceptance Criteria

- Payment Method is successfully selected.
- Payment Method is saved.
- Invalid Payment Method is rejected.

---

### Related Features

Depends On

- Checkout

Used By

- Process Payment

---

## 4.4.3 Process Payment

### Description

This feature performs payment simulation using Mock Payment Gateway.

If payment is successful, the system creates a transaction.

If payment fails, transaction moves to Failed status.

---

### Preconditions

- Payment Method has been selected.

---

### Workflow

```
Customer reviews payment
       ↓
Customer clicks Pay Now
       ↓
System processes Mock Payment
       ↓
Payment successful?
       ├── No
       │     Update Payment Status = Failed
       │
       │     Display payment failed
       │
       └── Yes
              ↓
       Create Order
              ↓
       Create Order Items
              ↓
       Reduce Product Stock
              ↓
       Clear Shopping Cart
              ↓
       Update Payment Status = Success
              ↓
       Display payment success
```

---

### Business Rules

- Payment uses Mock Payment.
- Order is only created if payment succeeds.
- Shopping Cart is cleared after successful payment.
- Product Stock is reduced after successful transaction.
- Payment status must always be updated.

---

### Validation Rules

- Payment Method has been selected.
- Shopping Cart is still valid.
- Products are still available.

---

### System Behavior

- Process Mock Payment.
- Update Payment Status.
- Create Order.
- Create Order Items.
- Reduce product stock.
- Clear Shopping Cart.
- Send payment result.

---

### Acceptance Criteria

- Successful payment generates Order.
- Shopping Cart is empty after transaction.
- Stock is successfully updated.
- Failed payment generates Failed status.

---

### Related Features

Depends On

- Choose Payment Method

Used By

- Retry Payment
- View Order History

---

## 4.4.4 Retry Payment

### Description

Retry Payment allows Customer to retry payment for previously failed transactions.

---

### Preconditions

- Payment status is Failed.

---

### Workflow

```
Customer opens failed transaction
       ↓
Customer clicks Retry Payment
       ↓
System processes Mock Payment
       ↓
Payment successful?
       ├── No
       │     Keep Payment Status = Failed
       │
       │     Display payment failed
       │
       └── Yes
              ↓
       Update Payment Status = Success
              ↓
       Create Order
              ↓
       Create Order Items
              ↓
       Reduce Product Stock
              ↓
       Clear Shopping Cart
              ↓
       Display payment success
```

---

### Business Rules

- Retry can only be performed on Failed transactions.
- Retry uses the same payment method or new method based on implementation.
- Order is only created after successful payment.

---

### Validation Rules

- Payment Status must be Failed.
- Transaction is still valid.

---

### System Behavior

- Reprocess payment.
- Update Payment Status.
- Create Order if successful.
- Send payment result.

---

### Acceptance Criteria

- Successful retry generates Order.
- Failed retry maintains Failed status.
- Retry is only available for Failed transactions.

---

### Related Features

Depends On

- Process Payment

Used By

- View Order History

---

### Development Rules

- Checkout can only be performed if Shopping Cart has at least one item.
- Order Summary must be created before payment.
- Customer can only select one Payment Method.
- Payment uses Mock Payment Gateway.
- Real Payment Gateway must not be implemented.
- Order is only created after successful payment.
- Order Items are only created after successful payment.
- Shopping Cart must be cleared after successful payment.
- Product Stock must be reduced after successful payment.
- Payment Status must always be updated.
- Retry Payment is only available for transactions with Failed status.
- All implementations must follow the defined workflow.
- Business Rules must not be violated in backend or frontend implementation.

---

## 4.5 Order Module

---

### Purpose

Order Module is responsible for providing Customer access to view transaction history and complete information from each successfully created order.

This module only functions to display stored transaction information and does not modify transaction data.

This module consists of two main features:

- View Order History
- View Order Detail

---

### Features

The Order Module consists of two main features:

- View Order History
- View Order Detail

---

## 4.5.1 View Order History

### Description

This feature allows Customer to view all list of successfully created transactions.

Transaction history must display concise information about each order.

---

### Preconditions

- Customer has logged in.
- Customer has at least one successfully created transaction.

---

### Workflow

```
Customer opens Order History
       ↓
System receives request
       ↓
Retrieve Customer Orders
       ↓
Order History available?
       ├── No
       │     Display "No order history found"
       │
       └── Yes
              ↓
       Sort orders by latest transaction
              ↓
       Prepare order summary
              ↓
       Display Order History
```

---

### Business Rules

- Customer can only view their own transaction history.
- Transaction history is sorted by latest transaction.
- Each transaction displays concise information.
- Order History is read-only.

---

### Validation Rules

- Customer must be logged in.
- Customer must be valid.
- Transaction data must be successfully retrieved.

---

### System Behavior

- Retrieve all Orders belonging to Customer.
- Sort transactions by latest date.
- Prepare transaction summary data.
- Send transaction list to frontend.

---

### Acceptance Criteria

- Order History is successfully displayed.
- Transaction history is sorted from latest.
- Customer without transactions sees empty state.
- System errors result in error message.

---

### Related Features

Depends On

- Process Payment
- Retry Payment

Used By

- View Order Detail

---

## 4.5.2 View Order Detail

### Description

This feature allows Customer to view complete information from one selected transaction.

The displayed information must reflect the transaction condition when the order was created (transaction snapshot), not the current product condition.

---

### Preconditions

- Customer has logged in.
- Customer has transactions.
- Customer selects one transaction.

---

### Workflow

```
Customer selects Order
       ↓
System receives request
       ↓
Retrieve Order
       ↓
Order found?
       ├── No
       │     Display "Order not found"
       │
       └── Yes
              ↓
       Retrieve Order Items
              ↓
       Retrieve Payment Information
              ↓
       Prepare Order Detail
              ↓
       Display Order Detail
```

---

### Business Rules

- Customer can only view their own order details.
- Transaction details must display transaction snapshot data.
- Transaction details must not change even if product information changes.
- Transaction details are read-only.

---

### Validation Rules

- Order ID must be valid.
- Order must be owned by the logged-in Customer.
- Order data must be available.

---

### System Behavior

- Retrieve Order information.
- Retrieve all Order Items.
- Retrieve Payment information.
- Prepare transaction details.
- Send data to frontend.

---

### Acceptance Criteria

- Transaction details are successfully displayed.
- Order not found results in error message.
- All transaction information is displayed completely.

---

### Information Display

The Order Detail page must display at minimum the following information:

- Order Number
- Order Date
- Product List
- Product Quantity
- Unit Price (Transaction Snapshot)
- Subtotal
- Total Payment
- Payment Method
- Payment Status
- Order Status

All information is a transaction snapshot at the time successful payment was made.

---

### Related Features

Depends On

- View Order History

Used By

- None (terminal feature)

---

### Development Rules

- Customer can only view Orders belonging to them.
- Order Module is read-only.
- Order History must be sorted by latest transaction.
- Order Detail must use transaction snapshot.
- Transaction information must not change due to future Product data changes.
- Payment Status must be displayed according to transaction status.
- Order Status must be displayed according to Order status.
- Order Module must not modify transaction data.
- All implementations must follow the defined workflow.
- Business Rules must not be violated in backend or frontend implementation.

---

# 5. Non Functional Requirements

## 5.1 Usability

### Purpose

The application must be easy to understand and easy to use by Customer without requiring training or specific guidance.

The main focus is to provide a simple, consistent, and intuitive user experience.

---

### Requirements

- User Interface must be easy to understand.
- Navigation must be simple and consistent.
- All main features can be accessed without complicated processes.
- Displayed information must be easy to read.
- Validation and error messages must be easy to understand.

---

### Acceptance Criteria

- Customer can use all main features without specific guidance.
- Navigation between pages is easy to understand.
- Forms have clear validation.
- Error messages are easy to understand by users.

---

### Development Rules

- Use consistent interface design.
- Use terminology that is easy to understand.
- Avoid unnecessary processes.
- All pages must have consistent navigation.
- Validation messages must be informative.

---

## 5.2 Responsiveness

### Purpose

The application must be usable comfortably on various screen sizes using Responsive Web Design.

---

### Requirements

- Display must automatically adjust to screen size.
- Application can be used on desktop, laptop, tablet, and mobile browsers.
- Layout must not break on screen size changes.
- All features remain usable on various devices.

---

### Acceptance Criteria

- All pages display properly on various screen sizes.
- There is no unnecessary horizontal scrolling.
- All components remain accessible.
- Forms remain usable on mobile devices.

---

### Development Rules

- Use Responsive Web Design.
- Use flexible layout.
- Avoid fixed width that causes broken display.
- All pages must be responsive.
- Display consistency must be maintained on all pages.

---

## 5.3 Security

### Purpose

The system must protect user data, authentication, and access to features that require login.

---

### Requirements

- Authentication uses JSON Web Token (JWT).
- Endpoints that require authentication must be protected.
- Passwords must not be stored in plaintext form.
- User data must be protected during authentication process.

---

### Acceptance Criteria

- Login generates valid JWT.
- Private endpoints cannot be accessed without authentication.
- Passwords are stored in encrypted form.
- Unauthorized requests generate appropriate responses.

---

### Development Rules

- Use Spring Security.
- Use JWT as authentication mechanism.
- Use BCrypt Password Encoder.
- Do not store passwords in plaintext form.
- Protected endpoints must perform JWT validation.
- Apply stateless authentication principle.

---

## 5.4 Availability

### Purpose

The application must be accessible stably through web browser to support Customer shopping process.

---

### Requirements

- Application must be available during operations.
- All main pages can be accessed.
- System is capable of processing requests consistently.
- System disruptions must be minimized.

---

### Acceptance Criteria

- Customer can access application through browser.
- All main modules can be used.
- System is capable of processing requests consistently.
- Errors are handled with appropriate mechanisms.

---

### Development Rules

- Backend must handle exceptions centrally.
- REST API must provide consistent responses.
- Avoid crashes caused by user input errors.
- Validation must be performed before business processes are executed.
- All modules must support application operations stably.

---

## 5.5 Performance

### Purpose

The application must provide fast response time so that Customer obtains good user experience.

---

### Requirements

- Pages are loaded efficiently.
- Transaction processes run quickly.
- Frontend and Backend communication uses RESTful API.
- Database queries are performed efficiently.

---

### Acceptance Criteria

- Main pages can be loaded quickly.
- Login process runs responsively.
- Shopping Cart is updated without significant delays.
- Checkout and Payment are processed efficiently.

---

### Development Rules

- Avoid unnecessary processing.
- Optimize REST API communication.
- Use efficient database queries.
- Separate Frontend and Backend according to system architecture.
- Apply Three-Tier Architecture consistently.

---

# 6. Technology Stack

## 6.1 Frontend Stack

### Purpose

Frontend is responsible for presenting the user interface to Customer and communicates with Backend through RESTful API.

### Technologies

| Technology | Purpose |
|------------|---------|
| React | Builds web-based application interface. |
| Axios | Sends and receives data through RESTful API. |
| Context API | Manages global state application. |
| Responsive Web Design | Adjusts display on various screen sizes. |

---

## 6.2 Backend Stack

### Purpose

Backend is responsible for executing all business logic, authentication, data management, and database communication.

### Technologies

| Technology | Purpose |
|------------|---------|
| Spring Boot | Main backend framework. |
| Spring Security | Secures application endpoints. |
| JSON Web Token (JWT) | User authentication mechanism. |
| REST Controller | Provides RESTful API for frontend. |

---

## 6.3 Database Stack

### Purpose

Database stores all application data permanently.

### Technologies

| Technology | Purpose |
|------------|---------|
| MySQL | Stores all user, product, cart, and transaction data. |

---

## 6.4 Communication Stack

### Purpose

Describes how frontend and backend communicate with each other.

### Technologies

| Technology | Purpose |
|------------|---------|
| RESTful API | Communication media between frontend and backend. |
| JSON | Data exchange format between systems. |
| Authorization Bearer JWT | Authentication token transmission mechanism on protected endpoints. |

---

## 6.5 Architecture Stack

### Purpose

Application uses Three-Tier Architecture to separate system responsibilities.

### Technologies

| Layer | Responsibility |
|-------|----------------|
| Presentation Tier | Provides user interface. |
| Logic Tier | Executes all application business logic. |
| Data Tier | Stores all application data permanently. |

---

## 6.6 Project Structure Technologies

### Purpose

Project structure follows separation of responsibilities on frontend and backend to make code easy to develop and maintain.

### Frontend Structure

| Directory | Responsibility |
|-----------|----------------|
| pages | Main application pages. |
| components | Reusable UI Components. |
| hooks | Custom React Hooks. |
| services | RESTful API integration using Axios. |
| layouts | Application page layout. |
| routes | Application routing. |
| contexts | Global State using Context API. |
| utils | Helper Functions. |
| assets | Static Assets. |

### Backend Structure

| Directory | Responsibility |
|-----------|----------------|
| config | Application configuration. |
| controller | REST Controller. |
| service | Business Logic. |
| repository | Database Access Layer. |
| entity | Database table representation. |
| dto | Request and Response Object. |
| mapper | Entity and DTO Mapping. |
| security | Spring Security and JWT Configuration. |
| exception | Global Exception Handling. |
| util | Utility Helper Classes. |

---

## 6.7 Development Rules

- React is the official frontend framework used in this project.
- Spring Boot is the official backend framework used in this project.
- MySQL is the official database used in this project.
- RESTful API is the only communication mechanism between frontend and backend.
- JSON is the official data exchange format of the application.
- JWT is the official authentication mechanism of the application.
- Spring Security is the official security mechanism of the application.
- Three-Tier Architecture must be maintained throughout development.
- Frontend and backend structure must follow the defined directory division.
- Do not replace framework, database, architecture, or authentication mechanism without explicit instruction.
- Do not add new technologies not defined in PROJECT_SPEC.md without prior approval.

---

# 7. Project Structure

## 7.1 Purpose

Project structure is used to maintain code organization consistency, separate responsibilities of each component, improve maintainability, and facilitate the development process by AI developers and programmers.

---

## 7.2 Frontend Project Structure

### Purpose

Frontend follows an organized directory structure based on the responsibilities of each component.

### Directory Structure

| Directory | Responsibility |
|-----------|----------------|
| pages | Stores main application pages. |
| components | Collection of reusable UI components. |
| hooks | Storage for custom React Hooks. |
| services | RESTful API integration module using Axios. |
| layouts | Manages interface layout framework. |
| routes | Navigation configuration between pages. |
| contexts | Global state management using Context API. |
| utils | Collection of helper functions. |
| assets | Storage for images and static assets. |

---

## 7.3 Backend Project Structure

### Purpose

Backend uses modular structure to separate business logic, database access, security, and API communication.

### Directory Structure

| Directory | Responsibility |
|-----------|----------------|
| config | Application configuration. |
| controller | REST Controller to receive requests. |
| service | Main application business logic. |
| repository | Database access. |
| entity | Database table representation. |
| dto | Request and Response Object. |
| mapper | Mapping between Entity and DTO. |
| security | Spring Security and JWT configuration. |
| exception | Global Exception Handling. |
| util | Utility Helper Classes. |

---

## 7.4 Directory Responsibilities

The rules for using directories ensure that each file is placed in the appropriate location.

### Frontend

- pages only contains main application pages.
- components only contains reusable UI components.
- hooks only contains custom hooks.
- services only contains REST API communication.
- layouts only contains application layouts.
- routes only contains routing configuration.
- contexts only contains global state.
- utils only contains helper functions.
- assets only contains static assets.

### Backend

- controller only receives HTTP Request and returns HTTP Response.
- service only contains business logic.
- repository only accesses database.
- entity only represents database tables.
- dto only used as request and response objects.
- mapper only performs Entity and DTO conversion.
- security only contains security configuration.
- exception only handles errors centrally.
- util only contains helper classes.

---

## 7.5 Development Rules

- All project structure must follow the defined directory structure.
- Do not create new top-level directories without explicit instruction.
- Do not change defined directory names.
- Do not move files to directories that do not match their responsibilities.
- Each new file must be placed in the appropriate directory.
- Business Logic may only reside in the service layer.
- Database Access may only be performed through repository.
- REST Endpoints may only be created in controller.
- Security configuration may only reside in the security directory.
- Entity must not be used as Request or Response Object.
- Use DTO as data exchange media between API and client.
- Use mapper to perform conversion between Entity and DTO.
- Reusable UI Components may only reside in the components directory.
- Frontend REST API communication may only be performed through the services directory.
- Frontend Global State may only be managed through contexts.
- Do not create alternative folder structures without prior approval.

---

# 8. System Architecture

## 8.1 Purpose

System architecture serves as an implementation guide to ensure all application components have clear responsibilities, are easy to develop, easy to maintain, and remain consistent throughout the development process.

---

## 8.2 Architecture Overview

The application follows a web-based architecture with separated frontend and backend components.

Key characteristics:

- Application is a web application.
- Frontend is separated from backend.
- Frontend communicates with backend using RESTful API.
- Backend processes business logic.
- Backend stores and retrieves data from database.
- Database serves as permanent storage for all application data.

---

## 8.3 Three-Tier Architecture

The application uses Three-Tier Architecture.

| Layer | Responsibility |
|--------|----------------|
| Presentation Tier | Provides user interface and receives Customer interaction using React. |
| Logic Tier | Executes all application business logic using Spring Boot. |
| Data Tier | Stores all application data using MySQL. |

Each layer has distinct responsibilities and communicates according to the defined architecture.

---

## 8.4 System Communication Flow

System communication flow from Customer to Database:

```
Customer
   ↓
React Frontend
   ↓
RESTful API
   ↓
Spring Boot Backend
   ↓
MySQL Database
```

Communication flow:

1. Customer performs interaction through browser.
2. React sends request to backend using RESTful API.
3. Backend processes request according to business logic.
4. Backend retrieves or stores data in MySQL.
5. Backend returns response to frontend.
6. Frontend displays result to Customer.

---

## 8.5 Backend Layer Flow

Request processing flow within backend:

```
Controller
   ↓
Service
   ↓
Repository
   ↓
MySQL
```

Responsibilities of each layer:

### Controller

- Receives HTTP Request.
- Performs initial validation if needed.
- Calls Service.
- Returns HTTP Response.

### Service

- Executes all business logic.
- Manages application workflow.
- Communicates with Repository.

### Repository

- Accesses database.
- Stores data.
- Retrieves data.
- Updates data.
- Deletes data.

### Database

- Stores all application data permanently.

---

## 8.6 Development Rules

- All frontend requests must go through RESTful API.
- Frontend must not access database directly.
- Frontend may only communicate with backend.
- Backend must be the only component that accesses database.
- All business logic may only reside in Service Layer.
- Controller is only responsible for receiving request and returning response.
- Controller must not access Repository directly.
- Controller must not contain business logic.
- Service must be the connector between Controller and Repository.
- Repository is only responsible for database access.
- Repository must not contain business logic.
- Database may only be accessed through Repository.
- All communication between layers must follow the defined sequence.
- Do not bypass layers.
- Three-Tier Architecture must be maintained throughout development.
- Do not add new architectural patterns without approval.
- Do not change the system communication flow that has been defined.

---

# 9. Database Design

## 9.1 Purpose

Database Design serves as a reference for database implementation to ensure all application data is stored consistently, has good integrity, supports all business processes, and follows the defined ERD design.

---

## 9.2 Database Overview

The application database architecture:

- Database uses MySQL.
- Database is designed based on application business process requirements.
- Database supports Authentication, Product Catalog, Shopping Cart, Order Processing, and Order processes.
- Database uses Primary Key and Foreign Key.
- Database follows normalization principles up to Third Normal Form (3NF).

---

## 9.3 Entity Relationship Overview

| Entity | Purpose |
|---------|---------|
| User | Stores Customer account information. |
| Product | Stores product information. |
| Cart | Stores Customer shopping cart. |
| CartItem | Stores list of products in Cart. |
| Orders | Stores Customer transactions. |
| OrderItem | Stores product details in each transaction. |
| Payment | Stores transaction payment information. |

All entities are related through Primary Key and Foreign Key to support application business processes.

---

## 9.4 Entity Specifications

| Entity | Primary Key | Purpose | Used By |
|---------|-------------|----------|---------|
| User | user_id | Stores Customer account data for Authentication module. | Authentication, Shopping Cart, Order Processing, Order |
| Product | product_id | Stores product catalog for Product Catalog module. | Product Catalog, Shopping Cart, Order Processing |
| Cart | cart_id | Stores shopping cart for Shopping Cart module. | Shopping Cart, Order Processing |
| CartItem | cart_item_id | Stores individual items in shopping cart. | Shopping Cart, Order Processing |
| Orders | order_id | Stores completed transactions for Order module. | Order Processing, Order |
| OrderItem | order_item_id | Stores product details in completed transactions. | Order Processing, Order |
| Payment | payment_id | Stores payment information for transactions. | Order Processing, Order |

---

## 9.5 Relationship Specifications

| Relationship | Cardinality | Description |
|--------------|-------------|-------------|
| User → Cart | 1:1 | Each User has exactly one active Cart. Cart is owned by one User. |
| User → Orders | 1:N | Each User can have multiple Orders. Each Order belongs to one User. |
| Cart → CartItem | 1:N | Each Cart can have multiple CartItems. Each CartItem belongs to one Cart. |
| Product → CartItem | 1:N | Each Product can appear in multiple Carts. Each CartItem references one Product. |
| Orders → OrderItem | 1:N | Each Order has multiple OrderItems. Each OrderItem belongs to one Order. |
| Product → OrderItem | 1:N | Each Product can appear in multiple Orders. Each OrderItem references one Product. |
| Orders → Payment | 1:1 | Each Order has exactly one Payment. Each Payment belongs to one Order. |

All relationships are used to maintain data integrity and support application business processes.

---

## 9.6 Business Rules

### User

- Email must be unique.
- Customer must have an account before using features that require authentication.

### Product

- Product can only be added to Cart if stock is available.
- Stock must not be negative.
- Product is used as a transaction reference.

### Cart

- Each Customer has only one active Cart.
- Cart is owned by only one Customer.
- Cart is the source of data during Checkout.

### CartItem

- One Product can only appear once in the same Cart.
- If Product is added again, system updates quantity.
- Quantity must be greater than zero.
- Quantity must not exceed Product stock.

### Orders

- One Customer can have multiple Orders.
- Order is created after payment succeeds.
- Order serves as transaction history.
- Order stores confirmed transaction information.

### OrderItem

- Each Order has at least one OrderItem.
- OrderItem stores product name snapshot.
- OrderItem stores product price snapshot at transaction time.
- OrderItem does not change after Order is successfully created.

### Payment

- Each Order has only one Payment.
- Retry Payment is only allowed when Payment status is Failed.
- Payment is used as transaction payment information.

---

## 9.7 Data Integrity Rules

- Primary Key must be unique.
- Foreign Key must reference valid data.
- Email must be unique.
- Cart.user_id must be unique.
- Payment.order_id must be unique.
- Combination of (cart_id, product_id) must be unique.
- Quantity must be greater than zero.
- Price must not be negative.
- Stock must not be negative.
- Relationships must follow the defined ERD.

---

## 9.8 Development Rules

- All entities must follow ERD.
- Do not add new entities without approval.
- Do not delete defined entities.
- Do not change relationships between entities.
- Do not change relationship cardinality.
- Use Primary Key according to design.
- Use Foreign Key according to design.
- Maintain data integrity in all database operations.
- Do not store data that causes redundancy.
- Maintain normalization up to Third Normal Form (3NF).
- All Business Rules must be followed during implementation.
- Database must support all Functional Requirements that have been defined.
- Do not change database structure without approval.

---

# 10. Backend Design

## 10.1 Purpose

Backend Design serves as an implementation guide for backend development using Spring Boot with Layered Architecture approach so that each layer has clear responsibilities, is easy to maintain, and is consistent with system requirements.

---

## 10.2 Backend Architecture Overview

Backend application architecture overview:

- Backend uses Spring Boot.
- Uses Layered Architecture.
- Request is processed through Controller → Service → Repository → Database.
- Entity is used as data representation.
- DTO is used for API communication.
- Mapper is used for Entity and DTO conversion.
- Security handles authentication using JWT.
- Exception handles error centrally.

---

## 10.3 Backend Layer Responsibilities

| Layer | Responsibility |
|-------|----------------|
| Controller | Receives HTTP Request, performs initial validation, calls Service, and returns HTTP Response. |
| Service | Executes business logic, manages application workflow, and communicates with Repository. |
| Repository | Accesses database, stores, retrieves, updates, and deletes data. |
| Entity | Represents database table and stores application data. |
| DTO | Request and Response object for API communication. |
| Mapper | Performs conversion between Entity and DTO. |
| Security | Manages Spring Security configuration and JWT authentication. |
| Exception | Centralized exception handling for error responses. |
| Util | Provides utility helper classes for common operations. |

---

## 10.4 Module Responsibilities

| Module | Controller | Service | Repository | Entity |
|--------|------------|---------|------------|--------|
| Authentication | AuthenticationController | AuthenticationService | UserRepository | User |
| Product | ProductController | ProductService | ProductRepository | Product |
| Shopping Cart | ShoppingCartController | ShoppingCartService | CartRepository, CartItemRepository | Cart, CartItem |
| Order Processing | OrderProcessingController | OrderProcessingService | OrdersRepository, PaymentRepository | Orders, Payment |
| Order | OrderController | OrderService | OrdersRepository, OrderItemRepository | Orders, OrderItem |

---

## 10.5 Controller Design

| Controller | Responsibility | Main Operations |
|------------|-----------------|------------------|
| AuthenticationController | Handles user registration, login, and logout operations. | Register, Login, Logout |
| ProductController | Manages product catalog operations including viewing, searching, filtering, and detail retrieval. | View Product List, Search Product, Filter Product, View Product Detail |
| ShoppingCartController | Manages shopping cart operations including viewing, adding, updating, and removing items. | View Cart, Add to Cart, Update Cart, Remove Cart Item |
| OrderProcessingController | Handles checkout, payment method selection, and payment processing operations. | Checkout, Choose Payment Method, Process Payment, Retry Payment |
| OrderController | Provides access to order history and order detail information. | View Order History, View Order Detail |

---

## 10.6 Service Design

| Service | Responsibility | Main Business Logic |
|---------|-----------------|---------------------|
| AuthenticationService | Manages customer authentication and account management. | Email uniqueness validation, password encryption, JWT token generation, credential verification |
| ProductService | Handles product catalog operations and product information retrieval. | Product search, product filtering, product availability validation |
| ShoppingCartService | Manages shopping cart operations and cart calculations. | Cart item management, quantity validation, subtotal and total calculation, stock validation |
| OrderProcessingService | Manages checkout and payment processing workflow. | Order summary generation, payment method validation, mock payment processing, order creation, stock reduction, cart clearing |
| OrderService | Provides access to order history and order details. | Order retrieval, order sorting, order detail assembly with payment information |

---

## 10.7 Repository Design

| Repository | Managed Entity | Responsibility |
|------------|-----------------|------------------|
| UserRepository | User | Manages customer account data access and retrieval. |
| ProductRepository | Product | Manages product data access, search, and filtering operations. |
| CartRepository | Cart | Manages shopping cart data access and operations. |
| CartItemRepository | CartItem | Manages individual shopping cart item data access. |
| OrdersRepository | Orders | Manages order transaction data access and retrieval. |
| OrderItemRepository | OrderItem | Manages order item details data access and retrieval. |
| PaymentRepository | Payment | Manages payment information data access and retrieval. |

---

## 10.8 Entity Design

| Entity | Purpose | Related Modules |
|--------|---------|-----------------|
| User | Represents customer account and authentication information. | Authentication, Shopping Cart, Order Processing, Order |
| Product | Represents product information in catalog. | Product Catalog, Shopping Cart, Order Processing |
| Cart | Represents active shopping cart for customer. | Shopping Cart, Order Processing |
| CartItem | Represents individual product items in shopping cart. | Shopping Cart, Order Processing |
| Orders | Represents completed customer transactions. | Order Processing, Order |
| OrderItem | Represents product details in completed transactions. | Order Processing, Order |
| Payment | Represents payment information for transactions. | Order Processing, Order |

---

## 10.9 DTO Design

DTO is used as Request and Response objects in API communication.

Key purposes:

- Separates API representation from Entity.
- Used in communication between Client and Controller.
- Reduces direct Entity exposure to API.
- Used for request validation.

---

## 10.10 Mapper Design

Mapper function:

- Maps Entity to DTO for API responses.
- Maps DTO to Entity for API requests.
- Centralizes data conversion process.
- Reduces code duplication.

---

## 10.11 Security Design

Backend security architecture:

- Uses Spring Security framework.
- Uses JWT Authentication mechanism.
- Endpoints requiring authentication must be validated.
- JWT is used for user identity on each request.
- Security is separated from business logic.

---

## 10.12 Exception Handling Design

Centralized error handling architecture:

- Centralized Exception Handling for consistent error responses.
- Validation Error handling for invalid request data.
- Authentication Error handling for failed authentication.
- Resource Not Found handling for missing resources.
- Internal Server Error handling for unexpected errors.

---

## 10.13 Development Rules

- Controller only receives Request and returns Response.
- Controller must not access Repository directly.
- Business Logic only resides in Service.
- Repository is only responsible for database access.
- Entity must not be used directly as API Request or Response.
- DTO is used as API communication media.
- Mapper is responsible for Entity and DTO conversion.
- Security must be applied on endpoints requiring authentication.
- Errors are handled centrally through Exception Handler.
- All modules must follow Layered Architecture.
- Do not add new Layer without approval.
- Do not change responsibilities of each Layer.
- Backend must support all Functional Requirements that have been defined.

---

# 11. Frontend Design

## 11.1 Purpose

Frontend Design serves as an implementation guide for application interface development using React so that all pages, components, navigation, and API integration have structure consistent with system requirements.

---

## 11.2 Frontend Overview

Frontend application architecture overview:

- Frontend uses React.
- Uses REST API based on JSON.
- Uses Axios as API communication media.
- Uses Context API as Global State Management.
- Uses JWT Authentication for features requiring authentication.
- Frontend communicates with backend through REST API.

---

## 11.3 Frontend Structure

| Directory | Responsibility |
|-----------|----------------|
| pages | Stores main application pages. |
| components | Collection of reusable UI components. |
| hooks | Storage for custom React Hooks. |
| services | REST API integration module using Axios. |
| layouts | Manages interface layout framework. |
| routes | Navigation configuration between pages. |
| contexts | Global state management using Context API. |
| utils | Collection of helper functions. |
| assets | Storage for images and static assets. |

---

## 11.4 Page Design

| Module | Main Pages | Description |
|--------|-----------|-------------|
| Authentication | Login, Register | Pages for customer account creation and authentication. |
| Product | Product List, Product Detail | Pages for viewing product catalog and product information. |
| Shopping Cart | Shopping Cart | Page for managing shopping cart items before checkout. |
| Order Processing | Checkout, Payment | Pages for order summary and payment processing. |
| Order | Order History, Order Detail | Pages for viewing transaction history and transaction details. |

---

## 11.5 Layout Design

Layout provides consistent visual framework for the application:

- Provides consistent visual framework across pages.
- Reused by multiple pages to maintain consistency.
- Manages application interface structure including header, navigation, and footer.

---

## 11.6 Component Design

| Component Category | Responsibility |
|-------------------|-----------------|
| Authentication Components | Components for login and register forms with validation. |
| Product Components | Components for displaying products, product lists, and product filters. |
| Shopping Cart Components | Components for displaying cart items, quantities, and cart calculations. |
| Order Processing Components | Components for order summary, payment method selection, and payment status. |
| Order Components | Components for displaying order history and order details. |
| Shared Components | Components reused across multiple modules such as buttons, modals, and alerts. |

---

## 11.7 Routing Design

| Route Type | Description |
|-----------|-------------|
| Public Route - Register | Route for new customer registration without authentication. |
| Public Route - Login | Route for customer login without authentication. |
| Public Route - Product List | Route for viewing product catalog without authentication. |
| Public Route - Product Detail | Route for viewing product details without authentication. |
| Protected Route - Shopping Cart | Route for managing shopping cart requiring authentication. |
| Protected Route - Checkout | Route for checkout process requiring authentication. |
| Protected Route - Payment | Route for payment processing requiring authentication. |
| Protected Route - Order History | Route for viewing transaction history requiring authentication. |
| Protected Route - Order Detail | Route for viewing transaction details requiring authentication. |

---

## 11.8 State Management Design

Context API is used as Global State Management:

- Authentication Context stores authentication state and user information.
- Shopping Cart Context stores shopping cart data and cart operations.
- Application Context stores shared application state and global configurations.

---

## 11.9 API Integration Design

| Module | Frontend Layer | Backend API |
|--------|----------------|------------|
| Authentication | AuthenticationService | POST /auth/register, POST /auth/login, POST /auth/logout |
| Product | ProductService | GET /products, GET /products/{id}, GET /products/search, GET /products/filter |
| Shopping Cart | ShoppingCartService | GET /cart, POST /cart/items, PUT /cart/items/{id}, DELETE /cart/items/{id} |
| Order Processing | OrderProcessingService | POST /checkout, POST /orders/payment, POST /orders/payment/retry |
| Order | OrderService | GET /orders, GET /orders/{id} |

---

## 11.10 Development Rules

- All pages must follow Functional Requirements.
- Frontend structure must follow Frontend Structure defined in TSD.
- REST API is only accessed through services folder.
- Global state is managed using Context API.
- Routing must follow configuration in routes folder.
- Layout is used to maintain interface consistency.
- Components must be reusable whenever possible.
- Endpoints requiring authentication must use JWT.
- Do not add new frontend structure without approval.
- Do not change Frontend structure defined in TSD.
- Frontend must support all Functional Requirements that have been defined.

---

# 12. API Specification

## 12.1 Purpose

API Specification serves as a communication contract between Frontend and Backend so that all data exchange processes are performed consistently using REST API.

---

## 12.2 API Overview

API communication architecture:

- RESTful API architecture pattern.
- JSON as data exchange format.
- Client-Server Communication model.
- JWT Authentication for protected endpoints.
- Public Endpoints accessible without authentication.
- Protected Endpoints require authentication.

---

## 12.3 Authentication

API authentication mechanism:

- JSON Web Token (JWT) as authentication mechanism.
- Bearer Token transmitted via Authorization header.
- Login generates JWT token for authenticated requests.
- Logout terminates authentication session.
- Public Endpoints accessible without JWT.
- Protected Endpoints require valid JWT.

---

## 12.4 Common Headers

| Header | Required | Description |
|--------|----------|-------------|
| Content-Type | Yes | Must be application/json for request body. |
| Authorization | Conditional | Required for protected endpoints. Format: Bearer {token}. |
| Accept | Optional | Specifies expected response format. Default: application/json. |

---

## 12.5 API Endpoints

| Module | Method | Endpoint | Description | Authentication |
|--------|--------|----------|-------------|----------------|
| Authentication | POST | /auth/register | Customer account registration. | No |
| Authentication | POST | /auth/login | Customer login and JWT generation. | No |
| Authentication | POST | /auth/logout | Customer logout and session termination. | Yes |
| Product | GET | /products | Retrieve product list. | No |
| Product | GET | /products/{id} | Retrieve product detail by ID. | No |
| Product | GET | /products/search | Search products by keyword. | No |
| Product | GET | /products/filter | Filter products by criteria. | No |
| Shopping Cart | GET | /cart | Retrieve customer shopping cart. | Yes |
| Shopping Cart | POST | /cart/items | Add product to shopping cart. | Yes |
| Shopping Cart | PUT | /cart/items/{id} | Update cart item quantity. | Yes |
| Shopping Cart | DELETE | /cart/items/{id} | Remove item from shopping cart. | Yes |
| Order Processing | POST | /checkout | Generate order summary for checkout. | Yes |
| Order Processing | POST | /orders/payment | Process payment and create order. | Yes |
| Order Processing | POST | /orders/payment/retry | Retry failed payment. | Yes |
| Order | GET | /orders | Retrieve customer order history. | Yes |
| Order | GET | /orders/{id} | Retrieve order detail by ID. | Yes |

---

## 12.6 Request Validation

| Module | Validation Rule |
|--------|-----------------|
| Authentication - Register | Full Name required, Email required and must be valid format, Email must be unique, Password required, Confirm Password must match Password. |
| Authentication - Login | Email required, Password required. |
| Shopping Cart - Add to Cart | Product ID required, Product must exist, Product stock must be available, Quantity must be greater than zero, Quantity must not exceed stock. |
| Shopping Cart - Update Cart | Cart Item ID required, Quantity must be greater than zero, Quantity must not exceed product stock. |
| Order Processing - Checkout | Shopping Cart must not be empty, All cart items must be valid. |
| Order Processing - Payment | Payment Method required, Payment Method must be valid, Shopping Cart must be valid. |

---

## 12.7 Response Specification

| Response Type | Description |
|--------------|-------------|
| Success Response | Contains requested data or confirmation of successful operation. |
| Validation Error | Contains validation error messages for invalid request data. |
| Authentication Error | Indicates failed authentication or unauthorized access. |
| Business Error | Indicates business rule violation or operation failure. |
| System Error | Indicates unexpected system error or internal server error. |

---

## 12.8 HTTP Status Codes

Implementation of HTTP Status Code follows REST API standards.

---

## 12.9 Error Handling

| Error Category | Description |
|---------------|-------------|
| Validation Error | Request data does not meet validation requirements. |
| Authentication Error | Authentication failed or JWT invalid. |
| Resource Not Found | Requested resource does not exist. |
| Payment Failure | Payment processing failed during transaction. |
| System Error | Unexpected error during request processing. |

---

## 12.10 Development Rules

- All endpoints must follow API Specification defined in TSD.
- All communication uses REST API based on JSON.
- Endpoints requiring authentication must use JWT Bearer Token.
- Public endpoints follow Authentication Design in TSD.
- Requests must meet all Validation Rules in Functional Requirements.
- Responses must follow the defined API specification.
- Do not change endpoint URI.
- Do not change HTTP Method.
- Do not add new endpoints without approval.
- API must support all Functional Requirements.

---

# 13. Module Specification

## 13.1 Authentication Module

### 13.1.1 Purpose

Authentication Module is responsible for managing Customer authentication process so that only registered users who have successfully logged in can access features that require authentication.

This module uses Spring Security and JSON Web Token (JWT) as authentication mechanisms.

---

### 13.1.2 Responsibilities

- Register new Customer account.
- Validate registration data and ensure email uniqueness.
- Authenticate Customer using Email and Password.
- Generate JWT token for authenticated requests.
- Manage Customer logout and session termination.
- Protect endpoints requiring authentication.

---

### 13.1.3 Workflow

Authentication Module workflow follows these steps:

1. Customer opens Register page and enters Full Name, Email, Password, and Confirm Password.
2. System validates registration data and checks email uniqueness.
3. If validation succeeds, system creates Customer account and saves to database.
4. Customer is directed to Login page.
5. Customer enters Email and Password on Login page.
6. System validates credentials and retrieves Customer account.
7. System verifies password match.
8. If verification succeeds, system generates JWT token.
9. Customer is authenticated and can access protected features.
10. Customer clicks Logout to end authenticated session.
11. System invalidates JWT token and terminates session.
12. Customer is redirected to Login page.

---

### 13.1.4 Module Interaction

Authentication Module interaction flow:

```
Frontend (Login/Register/Logout Page)
   ↓
AuthenticationController (receives request)
   ↓
AuthenticationService (performs authentication logic)
   ↓
UserRepository (accesses User database)
   ↓
User Entity (database table)
```

---

### 13.1.5 Database

| Entity / Table | Responsibility |
|----------------|-----------------|
| User | Stores Customer account information including email, encrypted password, and account details. |

---

### 13.1.6 API

| Feature | Method | Endpoint |
|---------|--------|----------|
| Register | POST | /auth/register |
| Login | POST | /auth/login |
| Logout | POST | /auth/logout |

---

### 13.1.7 Backend Classes

| Layer | Class |
|-------|-------|
| Controller | AuthenticationController |
| Service | AuthenticationService |
| Repository | UserRepository |
| Entity | User |

---

### 13.1.8 Frontend Components

Authentication Module frontend involvement:

- Pages: Register page, Login page for user authentication flows.
- Components: Registration form, login form, validation message components.
- Services: AuthenticationService for API communication with backend.
- Contexts: Authentication Context for managing global authentication state.
- Routes: Public routes for register and login, protected routes for authenticated features.

---

### 13.1.9 Business Rules

- Email must be unique across all Customer accounts.
- Password and Confirm Password must match during registration.
- All registration fields are required.
- Account is created only if all validations succeed.
- Customer is directed to Login page after successful registration.
- Password is verified using secure encryption method.
- JWT is generated only after successful authentication.
- JWT is used for subsequent authenticated requests.
- Logout invalidates JWT token.

---

### 13.1.10 Development Rules

- Follow Module Design for Authentication Module.
- Follow API Specification for authentication endpoints.
- Follow Database Design for User entity.
- Follow Frontend Design for authentication pages.
- Follow Backend Design for authentication layer.
- Follow Functional Requirements for Register, Login, and Logout.
- Do not change authentication endpoints.
- Do not add new authentication methods.
- Implement Spring Security and JWT as specified.
- Use BCrypt Password Encoder for password encryption.

---

### 13.1.11 Acceptance Criteria

- Customer successfully registers with valid data.
- Email uniqueness is enforced.
- Registration validation errors are displayed correctly.
- Customer successfully logs in with correct credentials.
- JWT token is generated after successful login.
- Invalid credentials are rejected.
- Customer successfully logs out.
- JWT token is invalidated after logout.
- Protected endpoints reject requests without valid JWT.

---

## 13.2 Product Module

### 13.2.1 Purpose

Product Module is responsible for providing product information to Customers and application visitors through product catalog operations including viewing, searching, filtering, and detail retrieval.

This module is read-only and does not modify product data.

---

### 13.2.2 Responsibilities

- Display product list to Customers and visitors.
- Provide product search functionality by keyword.
- Provide product filtering functionality by criteria.
- Display complete product detail information.
- Support product browsing without authentication.

---

### 13.2.3 Workflow

Product Module workflow follows these steps:

1. Customer opens Product Catalog page.
2. System retrieves product list from database.
3. System displays product list to Customer.
4. Customer enters search keyword or selects filter criteria.
5. System validates keyword or filter.
6. System retrieves filtered or searched products.
7. System displays matching products.
8. Customer selects specific product to view detail.
9. System retrieves product detail by ID.
10. System displays complete product information.

---

### 13.2.4 Module Interaction

Product Module interaction flow:

```
Frontend (Product List/Product Detail Page)
   ↓
ProductController (receives request)
   ↓
ProductService (performs product operations)
   ↓
ProductRepository (accesses Product database)
   ↓
Product Entity (database table)
```

---

### 13.2.5 Database

| Entity / Table | Responsibility |
|----------------|-----------------|
| Product | Stores product catalog information including name, description, price, stock, and product details. |

---

### 13.2.6 API

| Feature | Method | Endpoint |
|---------|--------|----------|
| View Product List | GET | /products |
| View Product Detail | GET | /products/{id} |
| Search Product | GET | /products/search |
| Filter Product | GET | /products/filter |

---

### 13.2.7 Backend Classes

| Layer | Class |
|-------|-------|
| Controller | ProductController |
| Service | ProductService |
| Repository | ProductRepository |
| Entity | Product |

---

### 13.2.8 Frontend Components

Product Module frontend involvement:

- Pages: Product List page, Product Detail page for displaying catalog.
- Components: Product card, product grid, product filter, search bar components.
- Services: ProductService for API communication with backend.
- Contexts: Application Context for shared product-related state if needed.
- Routes: Public routes for product list and product detail.

---

### 13.2.9 Business Rules

- Product list displays all available products.
- Search uses product name or keywords.
- Filter narrows product list by specific criteria.
- Product detail displays complete product information.
- Product catalog is accessible without authentication.
- Product data is read-only and not modified by this module.
- Empty product list displays appropriate message.
- Product not found displays appropriate error message.

---

### 13.2.10 Development Rules

- Follow Module Design for Product Module.
- Follow API Specification for product endpoints.
- Follow Database Design for Product entity.
- Follow Frontend Design for product pages.
- Follow Backend Design for product layer.
- Follow Functional Requirements for product catalog operations.
- Do not change product endpoints.
- Do not modify product data through this module.
- Product catalog is read-only module.
- All product operations must follow defined workflow.

---

### 13.2.11 Acceptance Criteria

- Product list is successfully displayed.
- Product search returns matching results.
- Product filter returns filtered results.
- Product detail is successfully displayed.
- Empty product list displays empty state.
- Product not found displays error message.
- Invalid search keyword displays validation error.
- Invalid filter displays validation error.

---

## 13.3 Shopping Cart Module

### 13.3.1 Purpose

Shopping Cart Module is responsible for managing all products that Customer will purchase before the Checkout process is performed.

This module allows Customer to view, add, update, and remove products from shopping cart.

---

### 13.3.2 Responsibilities

- Display Shopping Cart contents with quantity and price calculations.
- Add products to Shopping Cart with stock validation.
- Update product quantity in Shopping Cart.
- Remove products from Shopping Cart.
- Calculate subtotal for each cart item.
- Calculate total shopping amount.
- Validate product availability and stock.

---

### 13.3.3 Workflow

Shopping Cart Module workflow follows these steps:

1. Customer logs in to access Shopping Cart features.
2. Customer opens Shopping Cart page.
3. System retrieves Customer's Cart and CartItems.
4. System calculates subtotal and total amount.
5. System displays Shopping Cart contents.
6. Customer adds product to Cart from Product Detail page.
7. System validates product availability and stock.
8. System checks if product already exists in Cart.
9. If product exists, system increases quantity; otherwise creates new CartItem.
10. Customer updates quantity of CartItem.
11. System validates new quantity against stock.
12. System updates CartItem and recalculates totals.
13. Customer removes CartItem from Cart.
14. System removes CartItem and recalculates totals.

---

### 13.3.4 Module Interaction

Shopping Cart Module interaction flow:

```
Frontend (Shopping Cart Page)
   ↓
ShoppingCartController (receives request)
   ↓
ShoppingCartService (performs cart operations)
   ↓
CartRepository, CartItemRepository (access database)
   ↓
Cart, CartItem Entity (database tables)
```

---

### 13.3.5 Database

| Entity / Table | Responsibility |
|----------------|-----------------|
| Cart | Stores Customer shopping cart as container for cart items. |
| CartItem | Stores individual products in shopping cart with quantity information. |
| Product | Referenced by CartItem for product information and stock validation. |

---

### 13.3.6 API

| Feature | Method | Endpoint |
|---------|--------|----------|
| View Cart | GET | /cart |
| Add to Cart | POST | /cart/items |
| Update Cart | PUT | /cart/items/{id} |
| Remove Cart Item | DELETE | /cart/items/{id} |

---

### 13.3.7 Backend Classes

| Layer | Class |
|-------|-------|
| Controller | ShoppingCartController |
| Service | ShoppingCartService |
| Repository | CartRepository, CartItemRepository |
| Entity | Cart, CartItem |

---

### 13.3.8 Frontend Components

Shopping Cart Module frontend involvement:

- Pages: Shopping Cart page for managing cart items.
- Components: Cart item list, quantity selector, cart summary, cart total components.
- Services: ShoppingCartService for API communication with backend.
- Contexts: Shopping Cart Context for managing global cart state.
- Routes: Protected routes for shopping cart operations.

---

### 13.3.9 Business Rules

- Each Customer has only one active Shopping Cart.
- Shopping Cart requires authentication.
- Product can only be added if stock is available.
- Same product in Cart increases quantity instead of creating duplicate.
- Quantity must be greater than zero.
- Quantity must not exceed product stock.
- System calculates subtotal and total automatically.
- Shopping Cart can be empty.
- CartItem is removed when quantity becomes zero or Customer removes it.

---

### 13.3.10 Development Rules

- Follow Module Design for Shopping Cart Module.
- Follow API Specification for cart endpoints.
- Follow Database Design for Cart and CartItem entities.
- Follow Frontend Design for cart pages.
- Follow Backend Design for cart layer.
- Follow Functional Requirements for cart operations.
- Do not change cart endpoints.
- Enforce one-to-one relationship between User and Cart.
- Enforce stock validation on all cart operations.
- Recalculate totals on every cart modification.

---

### 13.3.11 Acceptance Criteria

- Shopping Cart is successfully displayed.
- Product is successfully added to Cart.
- Duplicate product increases quantity instead of creating new CartItem.
- CartItem quantity is successfully updated.
- CartItem is successfully removed.
- Subtotal is calculated correctly for each item.
- Total amount is calculated correctly.
- Out of stock products cannot be added.
- Quantity exceeding stock is rejected.
- Empty Shopping Cart displays empty state.

---

## 13.4 Order Processing Module

### 13.4.1 Purpose

Order Processing Module is responsible for managing all transaction processes after Customer completes shopping, transforming Shopping Cart into a successful transaction through Mock Payment simulation process.

This module handles Checkout, payment method selection, payment processing, and retry payment.

---

### 13.4.2 Responsibilities

- Generate order summary for checkout validation.
- Manage payment method selection.
- Process Mock Payment simulation.
- Create Order and OrderItems after successful payment.
- Reduce product stock after successful payment.
- Clear Shopping Cart after successful payment.
- Allow retry payment for failed transactions.
- Update payment status based on payment result.

---

### 13.4.3 Workflow

Order Processing Module workflow follows these steps:

1. Customer opens Shopping Cart and clicks Checkout.
2. System validates Shopping Cart contents.
3. System generates Order Summary with all transaction details.
4. System displays Order Summary to Customer.
5. Customer selects payment method from available options.
6. System validates selected payment method.
7. System saves payment method selection.
8. Customer reviews payment and clicks Pay Now.
9. System processes Mock Payment.
10. If payment succeeds: System creates Order, creates OrderItems, reduces product stock, clears Shopping Cart, updates payment status to Success.
11. If payment fails: System updates payment status to Failed, displays payment failed message.
12. Customer can retry failed payment using same or different method.
13. System processes payment retry and creates Order if successful.

---

### 13.4.4 Module Interaction

Order Processing Module interaction flow:

```
Frontend (Checkout/Payment Page)
   ↓
OrderProcessingController (receives request)
   ↓
OrderProcessingService (performs order/payment operations)
   ↓
OrdersRepository, PaymentRepository, CartRepository (access database)
   ↓
Orders, OrderItem, Payment, Cart Entity (database tables)
```

---

### 13.4.5 Database

| Entity / Table | Responsibility |
|----------------|-----------------|
| Orders | Stores completed Customer transactions with order details. |
| OrderItem | Stores product details and snapshot prices for each transaction. |
| Payment | Stores payment information and payment status for transactions. |
| Cart | Referenced to retrieve cart items before creating order. |
| Product | Referenced to reduce stock after successful payment. |

---

### 13.4.6 API

| Feature | Method | Endpoint |
|---------|--------|----------|
| Checkout | POST | /checkout |
| Process Payment | POST | /orders/payment |
| Retry Payment | POST | /orders/payment/retry |

---

### 13.4.7 Backend Classes

| Layer | Class |
|-------|-------|
| Controller | OrderProcessingController |
| Service | OrderProcessingService |
| Repository | OrdersRepository, OrderItemRepository, PaymentRepository, CartRepository |
| Entity | Orders, OrderItem, Payment |

---

### 13.4.8 Frontend Components

Order Processing Module frontend involvement:

- Pages: Checkout page for order summary, Payment page for payment processing.
- Components: Order summary display, payment method selector, payment status components.
- Services: OrderProcessingService for API communication with backend.
- Contexts: Shopping Cart Context for cart information, Payment Context for payment state.
- Routes: Protected routes for checkout and payment operations.

---

### 13.4.9 Business Rules

- Checkout can only be performed if Shopping Cart has items.
- All subtotals and totals are recalculated during checkout.
- Order Summary must be created before payment.
- Customer can only select one payment method.
- Payment uses Mock Payment Gateway simulation.
- Order is created only after payment succeeds.
- OrderItems capture product snapshot at transaction time.
- Stock is reduced only after successful payment.
- Shopping Cart is cleared only after successful payment.
- Payment Status must be updated after payment attempt.
- Retry Payment is only available for Failed status transactions.

---

### 13.4.10 Development Rules

- Follow Module Design for Order Processing Module.
- Follow API Specification for order processing endpoints.
- Follow Database Design for Orders, OrderItem, Payment entities.
- Follow Frontend Design for checkout and payment pages.
- Follow Backend Design for order processing layer.
- Follow Functional Requirements for checkout and payment operations.
- Do not change order processing endpoints.
- Use Mock Payment simulation, not real payment gateway.
- Ensure transaction consistency during order creation.
- Maintain data integrity when reducing stock.
- Implement atomic operations for order creation.

---

### 13.4.11 Acceptance Criteria

- Order Summary is successfully generated and displayed.
- Payment method is successfully selected.
- Successful payment generates Order with OrderItems.
- Failed payment maintains Failed status.
- Shopping Cart is empty after successful payment.
- Product stock is reduced correctly after successful payment.
- Retry Payment is available for failed transactions.
- Successful retry creates Order and clears Cart.
- Payment Status is updated correctly after payment attempt.
- Empty Shopping Cart cannot proceed to checkout.

---

## 13.5 Order Module

### 13.5.1 Purpose

Order Module is responsible for providing Customer access to view transaction history and complete information from each successfully created order.

This module only displays stored transaction information and does not modify transaction data.

---

### 13.5.2 Responsibilities

- Display Customer transaction history.
- Sort orders by latest transaction date.
- Display complete order detail information.
- Show transaction snapshot with historical prices.
- Display payment information for transactions.
- Provide access to order details.

---

### 13.5.3 Workflow

Order Module workflow follows these steps:

1. Customer logs in and opens Order History page.
2. System retrieves all Orders belonging to Customer.
3. System sorts orders by latest transaction date.
4. System prepares order summary data.
5. System displays Order History to Customer.
6. If no orders exist, system displays empty state.
7. Customer selects specific order to view detail.
8. System retrieves Order with OrderItems and Payment information.
9. System displays complete Order Detail including product snapshot and payment info.
10. Order Detail shows information as it was at time of transaction.

---

### 13.5.4 Module Interaction

Order Module interaction flow:

```
Frontend (Order History/Order Detail Page)
   ↓
OrderController (receives request)
   ↓
OrderService (performs order retrieval operations)
   ↓
OrdersRepository, OrderItemRepository, PaymentRepository (access database)
   ↓
Orders, OrderItem, Payment Entity (database tables)
```

---

### 13.5.5 Database

| Entity / Table | Responsibility |
|----------------|-----------------|
| Orders | Stores completed Customer transactions. |
| OrderItem | Stores product details and snapshot prices for transactions. |
| Payment | Stores payment information and payment status for transactions. |
| User | Referenced to retrieve Customer orders. |

---

### 13.5.6 API

| Feature | Method | Endpoint |
|---------|--------|----------|
| View Order History | GET | /orders |
| View Order Detail | GET | /orders/{id} |

---

### 13.5.7 Backend Classes

| Layer | Class |
|-------|-------|
| Controller | OrderController |
| Service | OrderService |
| Repository | OrdersRepository, OrderItemRepository, PaymentRepository |
| Entity | Orders, OrderItem, Payment |

---

### 13.5.8 Frontend Components

Order Module frontend involvement:

- Pages: Order History page for transaction list, Order Detail page for transaction information.
- Components: Order list, order item details, payment information display components.
- Services: OrderService for API communication with backend.
- Contexts: Application Context for shared order-related state if needed.
- Routes: Protected routes for order history and order detail.

---

### 13.5.9 Business Rules

- Customer can only view their own orders.
- Order History is sorted by latest transaction date.
- Order Detail displays transaction snapshot data.
- Transaction information does not change due to future Product changes.
- Payment Status reflects transaction status.
- Order Status reflects order status.
- Order Module is read-only.
- Order data cannot be modified through this module.

---

### 13.5.10 Development Rules

- Follow Module Design for Order Module.
- Follow API Specification for order endpoints.
- Follow Database Design for Orders, OrderItem, Payment entities.
- Follow Frontend Design for order pages.
- Follow Backend Design for order layer.
- Follow Functional Requirements for order view operations.
- Do not change order endpoints.
- Order Module is read-only, no modifications allowed.
- Use transaction snapshot for historical accuracy.
- Enforce authorization to show only Customer's own orders.

---

### 13.5.11 Acceptance Criteria

- Order History is successfully displayed with all Customer orders.
- Orders are sorted from latest transaction.
- Customer without transactions sees empty state.
- Order Detail is successfully displayed.
- Order Detail shows transaction snapshot information.
- Payment information is displayed correctly.
- Customer cannot view other Customer's orders.
- Order not found displays error message.
- System errors result in error message.

---

# 14. AI Working Agreement

## 14.1 Purpose

The AI Working Agreement serves as a binding behavioral guideline for the AI Coding Agent (OpenCode) throughout the project implementation lifecycle. This agreement ensures that all implementation decisions, code modifications, and architectural choices remain consistent with PROJECT_SPEC.md, PROJECT_PLAN.md, and all related project documentation.

The purpose of this agreement is to establish explicit rules that prevent scope creep, undocumented changes, and deviation from the defined project specification. The AI Coding Agent must treat project documentation as the single source of truth and never implement features, modify architecture, or introduce behaviors that are not explicitly documented.

---

## 14.2 General Rules

- Always read PROJECT_SPEC.md before implementing any feature.
- Treat PROJECT_SPEC.md as the single source of truth for project requirements and architecture.
- Always understand the current module before writing code.
- Always follow documented specifications.
- Never ignore documented requirements.

---

## 14.3 Scope Rules

- Never implement features that are not documented.
- Never remove documented functionality.
- Never introduce undocumented behavior.
- Never modify business requirements without explicit approval.
- Never assume missing requirements.

---

## 14.4 Architecture Rules

- Never modify the defined system architecture.
- Never modify the documented database design.
- Never modify the documented backend design.
- Never modify the documented frontend design.
- Never modify documented API specifications.
- Always follow the documented project structure.

---

## 14.5 Module Rules

- Always implement modules according to the Module Specification.
- Always follow the documented workflow.
- Always follow documented Business Rules.
- Always satisfy Acceptance Criteria before considering a module complete.
- Never skip module responsibilities.

---

## 14.6 Implementation Rules

- Follow the implementation order defined in PROJECT_PLAN.md.
- Complete one module before starting another unless explicitly instructed.
- Never leave partially implemented functionality without explanation.
- Keep implementation consistent across all modules.
- Avoid unnecessary modifications outside the current implementation scope.

---

## 14.7 Decision Rules

- If any requirement is ambiguous, stop implementation.
- Clearly explain the ambiguity.
- Ask for clarification before continuing.
- Never guess undocumented behavior.
- Never invent requirements.

---

## 14.8 Modification Rules

- Never modify unrelated files.
- Never refactor unrelated modules.
- Never rename documented modules.
- Never change API contracts without approval.
- Never modify database schema unless documented.

---

## 14.9 Completion Rules

- Verify implementation against PROJECT_SPEC.md.
- Verify module Acceptance Criteria.
- Verify implementation consistency.
- Ensure no documented requirement is missing.
- Ensure completed work is ready before moving to the next task.

---

## 14.10 Communication Rules

- Clearly explain implementation decisions when necessary.
- Report blockers immediately.
- Inform the user when a requirement cannot be implemented because it is missing from the documentation.
- Distinguish between documented requirements and assumptions.
- Request approval before making significant architectural changes.

---
