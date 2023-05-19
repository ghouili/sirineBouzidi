import React, { createContext, useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

const GeneralContext = createContext();

const ProviderContext = ({ children }) => {
    const cookies = new Cookies();

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [productDeatails, setProductDetails] = useState({ open: false });
    const [openCart, setOpenCart] = useState(false);
    const [openPay, setOpenPay] = useState(false);
    const [theme, setTheme] = useState('light');

    const [cartItems, setCartItems] = useState([]);

    const ToggleSidebar = () => {
        var sidebar = document.getElementById("main__sidebar");
        setSidebarOpen(!sidebarOpen);
        if (!sidebarOpen) {
            sidebar.style.width = "255px";
        } else {
            sidebar.style.width = "85px";
        }
    }

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

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

    const HandleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    const saveCartToCookies = async (cartItems) => {
        try {
            await cookies.set('cart', JSON.stringify(cartItems), { path: '/' });
            console.log(cartItems);
        } catch (error) {
            console.error(error);
        }
    };

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

    const deleteCartFromCookies = async () => {
        try {
            await cookies.remove('cart', { path: '/' });
        } catch (error) {
            console.error(error);
        }
    };

    const updateCartItemQte = async (index, newQte) => {
        setCartItems(prevItems => {
          const newItems = [...prevItems]; // create a new copy of the items array
          newItems[index] = { ...newItems[index], qte: newQte }; // update the qte property of the item at the given index
          return newItems;
        });
      
        await saveCartToCookies(cartItems); // pass the updated newItems array to the saveCartToCookies function
    };

    const values = { sidebarOpen, theme, productDeatails, openCart, cartItems, openPay, setCartItems, setOpenPay, setOpenCart, setProductDetails, setSidebarOpen, ToggleSidebar, HandleThemeSwitch, deleteCartFromCookies, addProductsToCart, deleteCartItem, updateCartItemQte };
    return (
        <GeneralContext.Provider value={values} >
            {children}
        </GeneralContext.Provider>
    )
}

export { ProviderContext, GeneralContext }