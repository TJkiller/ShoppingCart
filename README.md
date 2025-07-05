# Shopping Cart Program 🛒

A Python-based shopping cart application demonstrating core programming concepts including loops, data structures, input validation, and menu-driven interfaces.

## Features

- **Interactive Menu System**: Navigate through options with numbered inputs
- **Cart Management**: Add, view, edit, and remove items
- **Validation**: Robust input checking for prices and selections
- **Receipt Generation**: Professionally formatted checkout summary
- **Persistent Cart**: Items remain until checkout or explicit removal

## How to Run

1. Ensure Python 3.6+ is installed
2. Clone the repository:
   ```bash
   git clone https://github.com/TJkiller/ShoppingCart.git
   ```
3. Navigate to project directory:
   ```bash
   cd ShoppingCart
   ```
4. Execute the program:
   ```bash
   python cart.py
   ```

## Program Walkthrough with Screenshots

### 1. Main Menu Interface
![Menu page](https://github.com/user-attachments/assets/8436b491-6b3f-46e1-b598-17390d428ab1)  
*Access all cart operations through the numbered menu system*

---

### 2. Adding Items
![Adding Item](https://github.com/user-attachments/assets/9480dea5-296e-4fbc-b198-64e441167b21)  
*Add products with prices - automatic validation ensures correct inputs*

---

### 3. Viewing Cart Contents
![View cart](https://github.com/user-attachments/assets/e5024629-3ff1-47d1-ba60-b1eefd1b9cb4)   
*See all items in a formatted table with running total*

---

### 4. Editing Existing Items
![Editing Item](https://github.com/user-attachments/assets/c264012c-baa5-4db7-8437-89cf8b631be9)  
*Modify product names or prices while preserving other values*

---

### 5. Removing Items
![Removing Item](https://github.com/user-attachments/assets/0c89d4d8-8576-4fe8-86db-40716f9e3fd0)    
*Delete items by number reference with confirmation*

---

### 6. Checkout Process
![checkOut](https://github.com/user-attachments/assets/445d8ee5-9e62-4e49-b08f-a99a82673e4d)  
*Final receipt generation and cart reset after purchase*

---

### 7. Program Exit
![Existing](https://github.com/user-attachments/assets/2276855d-e567-43da-8b1e-9bb3bc79a309)  
*Confirmation prompt when exiting with items in cart*

## Technical Highlights

- **Data Structures**: Uses lists of dictionaries for cart storage
- **Input Validation**: 
  - Price must be positive numbers
  - Menu selections must be valid options
  - Item references must exist in cart
- **String Formatting**: Professional alignment of receipt items
- **Control Flow**: Nested loops for menu navigation and operations
