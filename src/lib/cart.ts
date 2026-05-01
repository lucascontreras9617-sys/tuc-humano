import { atom, computed } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

export interface CartItem {
  productId: string;
  name: string;
  size: 'S' | 'M' | 'L' | 'XL';
  price: number;
  quantity: number;
  image: string;
}

// Persistent cart stored in localStorage
export const cartItems = persistentAtom<CartItem[]>('tuc-cart', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

// Computed: total item count
export const cartCount = computed(cartItems, (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);

// Computed: subtotal
export const cartSubtotal = computed(cartItems, (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

// Cart is open/closed (drawer)
export const cartOpen = atom(false);

export function openCart() {
  cartOpen.set(true);
}

export function closeCart() {
  cartOpen.set(false);
}

export function addToCart(item: Omit<CartItem, 'quantity'>) {
  const current = cartItems.get();
  const existing = current.findIndex(
    (i) => i.productId === item.productId && i.size === item.size
  );

  if (existing >= 0) {
    const updated = [...current];
    updated[existing] = {
      ...updated[existing],
      quantity: updated[existing].quantity + 1,
    };
    cartItems.set(updated);
  } else {
    cartItems.set([...current, { ...item, quantity: 1 }]);
  }
}

export function removeFromCart(productId: string, size: string) {
  cartItems.set(
    cartItems.get().filter(
      (i) => !(i.productId === productId && i.size === size)
    )
  );
}

export function updateQuantity(productId: string, size: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId, size);
    return;
  }
  cartItems.set(
    cartItems.get().map((i) =>
      i.productId === productId && i.size === size ? { ...i, quantity } : i
    )
  );
}

export function clearCart() {
  cartItems.set([]);
}
