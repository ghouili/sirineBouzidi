import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { deleteCartFromCookies, saveCartToCookies } from "./CartAcion";

const cookies = new Cookies();

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    try {
      const cartItemsFromCookies = cookies.get("cart");
      if (cartItemsFromCookies) {
        setCartItems(cartItemsFromCookies);
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }, []);

  const deleteCartItem = async (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    await saveCartToCookies(newCartItems);
  };

  const addProductsToCart = async (products) => {
    const newCartItems = [...cartItems, ...products];
    setCartItems(newCartItems);
    await saveCartToCookies(newCartItems);
  };

  const clearCart = async () => {
    setCartItems([]);
    await deleteCartFromCookies();
  };

  return (
    <div>
      <h2>Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity}</td>
              <td>
                <button onClick={() => deleteCartItem(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => deleteCartFromCookies()}>Clear Cart</button>
      <button
        onClick={() =>
          addProductsToCart([
            { name: "Product 1", price: 10, quantity: 1 },
            { name: "Product 2", price: 15, quantity: 2 },
            { name: "Product 3", price: 20, quantity: 3 },
          ])
        }
      >
        Add Products
      </button>
    </div>
  );
};

export default Cart;
