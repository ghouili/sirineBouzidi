import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const saveCartToCookies = async (cartItems) => {
  try {
    await cookies.set('cart', JSON.stringify(cartItems), { path: '/' });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCartFromCookies = async () => {
  try {
    await cookies.remove('cart', { path: '/' });
  } catch (error) {
    console.error(error);
  }
};