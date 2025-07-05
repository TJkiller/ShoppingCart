def display_cart(cart):
    """Display the current shopping cart items in a formatted table"""
    if not cart:
        print("\nYour cart is empty.\n")
        return
    
    print("\n" + "=" * 60)
    print(f"{'YOUR SHOPPING CART':^60}")
    print("=" * 60)
    print(f"{'No.':<5}{'Item':<30}{'Price':>15}")
    print("-" * 60)
    
    total = 0
    for i, item in enumerate(cart, 1):
        print(f"{i:<5}{item['product']:<30}R{item['price']:>14.2f}")
        total += item['price']
    
    print("=" * 60)
    print(f"{'TOTAL:':<35}R{total:>14.2f}")
    print("=" * 60 + "\n")

def main():
    cart = []
    print("\n" + "=" * 60)
    print(f"{'WELCOME TO THE SHOPPING CART PROGRAM':^60}")
    print("=" * 60)
    
    while True:
        # Display main menu
        print("\nMAIN MENU:")
        print("1. Add item to cart")
        print("2. View cart")
        print("3. Remove item from cart")
        print("4. Edit item in cart")
        print("5. Checkout")
        print("6. Exit")
        
        choice = input("\nPlease choose an option (1-6): ").strip()
        
        # Add item
        if choice == '1':
            print("\n" + "-" * 60)
            print("ADD ITEM TO CART")
            print("-" * 60)
            
            while True:
                product = input("\nEnter product name (or 'back' to return): ").strip()
                if not product:
                    print("Error: Product name cannot be empty.")
                    continue
                if product.lower() == 'back':
                    break
                
                while True:
                    price_input = input(f"Enter price for {product}: R").strip()
                    try:
                        price = float(price_input)
                        if price <= 0:
                            print("Error: Price must be positive.")
                            continue
                        break
                    except ValueError:
                        print("Error: Please enter a valid number.")
                
                cart.append({"product": product, "price": price})
                print(f"\n✓ Added '{product}' for R{price:.2f} to your cart")
                display_cart(cart)
                break
        
        # View cart
        elif choice == '2':
            print("\n" + "-" * 60)
            print("VIEW CART CONTENTS")
            print("-" * 60)
            display_cart(cart)
        
        # Remove item
        elif choice == '3':
            print("\n" + "-" * 60)
            print("REMOVE ITEM FROM CART")
            print("-" * 60)
            
            if not cart:
                print("Your cart is empty. Nothing to remove.")
                continue
            
            display_cart(cart)
            while True:
                try:
                    item_num = input("Enter item number to remove (or 'back' to cancel): ").strip()
                    if item_num.lower() == 'back':
                        break
                    
                    item_num = int(item_num)
                    if 1 <= item_num <= len(cart):
                        removed_item = cart.pop(item_num - 1)
                        print(f"\n✓ Removed '{removed_item['product']}' from your cart")
                        display_cart(cart)
                        break
                    else:
                        print(f"Error: Please enter a number between 1 and {len(cart)}")
                except ValueError:
                    print("Error: Please enter a valid number.")
        
        # Edit item
        elif choice == '4':
            print("\n" + "-" * 60)
            print("EDIT ITEM IN CART")
            print("-" * 60)
            
            if not cart:
                print("Your cart is empty. Nothing to edit.")
                continue
            
            display_cart(cart)
            while True:
                try:
                    item_num = input("Enter item number to edit (or 'back' to cancel): ").strip()
                    if item_num.lower() == 'back':
                        break
                    
                    item_num = int(item_num)
                    if 1 <= item_num <= len(cart):
                        item = cart[item_num - 1]
                        print(f"\nEditing item #{item_num}: {item['product']} (R{item['price']:.2f})")
                        
                        # Get new product name
                        new_product = input(f"Enter new product name (or press Enter to keep '{item['product']}'): ").strip()
                        if new_product:
                            item['product'] = new_product
                        
                        # Get new price
                        while True:
                            new_price = input(f"Enter new price for {item['product']} (or press Enter to keep R{item['price']:.2f}): R").strip()
                            if not new_price:
                                break
                            try:
                                new_price = float(new_price)
                                if new_price <= 0:
                                    print("Error: Price must be positive.")
                                    continue
                                item['price'] = new_price
                                break
                            except ValueError:
                                print("Error: Please enter a valid number.")
                        
                        print(f"\n✓ Item #{item_num} updated successfully")
                        display_cart(cart)
                        break
                    else:
                        print(f"Error: Please enter a number between 1 and {len(cart)}")
                except ValueError:
                    print("Error: Please enter a valid number.")
        
        # Checkout
        elif choice == '5':
            print("\n" + "=" * 60)
            print(f"{'CHECKOUT - FINAL RECEIPT':^60}")
            print("=" * 60)
            
            if not cart:
                print("Your cart is empty. Nothing to checkout.")
                continue
            
            display_cart(cart)
            print("Thank you for your purchase!\n")
            cart = []  # Reset cart after checkout
        
        # Exit program
        elif choice == '6':
            if cart:
                print("\nYou have items in your cart. Are you sure you want to exit?")
                confirm = input("Type 'yes' to exit without checkout, or any key to continue: ").strip().lower()
                if confirm != 'yes':
                    continue
            print("\n" + "=" * 60)
            print(f"{'Thank you for using our Shopping Cart Program!':^60}")
            print("=" * 60)
            break
        
        else:
            print("Invalid choice. Please enter a number between 1-6.")

if __name__ == "__main__":
    main()