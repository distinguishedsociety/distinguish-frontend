import axios from 'axios'
import Cookies from 'js-cookie'
import { signOut, useSession } from 'next-auth/react'

const api = `https://localhost:9000/internal/api/users`

//login user
export async function login(username, password) {
  let user
  let error
  const loginData = {
    email: username,
    password: password,
  }
  try {
    let result = await axios({
      url: `${api}/login`,
      method: 'POST',
      data: {
        ...loginData,
      },
    })

    if (result.data.data.status === 'error') {
      return { user, error: 'An error occurred.' }
    }
    // localStorage.setItem("user" , "sakshi")
    user = result
    return { user, error }
  } catch (e) {
    error = e.message
    return { user, error }
  }
}

export async function registerUser(name, username, password) {
  let user
  let error
  const userData = {
    name: name,
    email: username,
    password: password,
  }
  try {
    let result = await axios({
      url: `${api}/signup`,
      method: 'POST',
      data: {
        ...userData,
      },
    })
    if (result.data.data.status === 'error') {
      return { user, error: 'An error occurred.' }
    }
    // localStorage.setItem("user" , "sakshi")
    user = result
    return { user, error }
  } catch (e) {
    error = e.response.data.message
    return { user, error }
  }
}
// Get all products
export async function getAllProducts() {
  let products
  let error

  try {
    let result = await axios.get(`${api}/products`)

    if (result.data.data.status === 'error') {
      return { products, error: 'An error occurred.' }
    }

    products = result.data.data.products
    return { products, error }
  } catch (e) {
    error = e.message
    return { products, error }
  }
}

// get single product
export async function getProduct(slug) {
  let product
  let error
  try {
    let result = await axios.get(`${api}/products/${slug}`, {})

    if (result.data.data.status === 'error') {
      return { product, error: 'An error occurred.' }
    }

    product = result.data.data.product
    let index = Object.values(product.inventory).findIndex(function (number) {
      return number > 0
    })

    return { product, index, error }
  } catch (e) {
    error = e.message
    return { product, error }
  }
}

// get into banner
export async function getIntroBanner() {
  let introBanner
  let error

  try {
    let result = await axios.get(`${api}/introBanner`)
    console.log(result)

    if (result.data.status === 'error') {
      return { introBanner, error: 'An error occurred.' }
    }
    introBanner = result.data.data
    return { introBanner, error }
  } catch (e) {
    error = e.message
    return { introBanner, error }
  }
}

// get banner
export async function getBanners() {
  let banners
  let error

  try {
    let result = await axios.get(`${api}/banners`)

    if (result.data.status === 'error') {
      return { banners, error: 'An error occurred.' }
    }
    banners = result.data.data
    return { banners, error }
  } catch (e) {
    error = e.message
    return { banners, error }
  }
}

// get all blogs
export async function getAllBlogs() {
  let blogs
  let error

  try {
    let result = await axios.get(`${api}/blogs`)

    if (result.data.status === 'error') {
      return { blogs, error: 'An error occurred.' }
    }
    blogs = result.data.data

    return { blogs, error }
  } catch (e) {
    error = e.message
    return { blogs, error }
  }
}

// get single blog
export async function getBlog(id) {
  let blog
  let error

  try {
    let result = await axios.get(
      `http://ec2-3-89-29-221.compute-1.amazonaws.com/admin/blog/${id}`
    )

    if (result.data.status === 'error') {
      return { blog, error: 'An error occurred.' }
    }
    blog = result.data.data
    return { blog, error }
  } catch (e) {
    error = e.message
    return { blog, error }
  }
}

//get user cart
export async function getCart(token) {
  let cart
  let error

  try {
    let result = await axios.get(`${api}/cart`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    if (result.data.status === 'error') {
      return 'An error occurred.'
    }
    cart = result.data.data
    return {cart , error}
  } catch (e) {
    error = e.message
    return {cart , error}
  }
}

// Add to cart
export async function addItemToCart(product, size, quantity, token) {
  let cart
  let error

  try {
    let result = await axios({
      url: `${api}/addToCart`,
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: {
        slug: product.slug,
        size: size,
        qty: quantity,
      },
    })

    if (result.data.status === 'error') {
      return { cart, error: 'An error occurred.' }
    }
    cart = result.data.data
    return { cart, error }
  } catch (e) {
    error = e.response.data.message
    return { cart, error }
  }
}

export async function updateCart(id, qty, size, token) {
  let cart
  let error

  try {
    let result = await axios({
      url: `${api}/updateCart`,
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: {
        id: id,
        qty: qty,
        size: size,
      },
    })

    if (result.data.status === 'error') {
      return { cart, error: 'An error occurred.' }
    }
    cart = result.data.data

    return { cart, error }
  } catch (e) {
    error = e.response.data.message
    return { cart, error }
  }
}

//get Profile
export async function getProfile(token) {
  let me, error
  try {
    let result = await axios.get(`${api}/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    if (result.data.status === 'error') {
      return { me, error: 'An error occurred.' }
    }
    me = result.data.data

    return { me, error }
  } catch (e) {
    error = e.message
    return { me, error }
  }
}

export async function addToWishlist(token, slug) {
  let wishlist
  let error

  try {
    let result = await axios({
      url: `${api}/addToWishlist`,
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: {
        slug: slug,
      },
    })

    if (result.data.status === 'error') {
      return { wishlist, error: 'An error occurred.' }
    }
    wishlist = result.data.data
    return { wishlist, error }
  } catch (e) {
    error = e.message
    return { wishlist, error }
  }
}

export async function getWishlist(token) {
  let wishlist

  try {
    let result = await axios.get(`${api}/wishlist`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    if (result.data.status === 'error') {
      return 'An error occurred.'
    }
    wishlist = result.data.data

    return wishlist
  } catch (e) {
    error = e.message
    return error
  }
}

export const fetchDeliveryOptions = async (pincode, country) => {
  let data
  let error

  try {
    let result = await axios({
      url: `${api}/fetchCartDeliveryOptions`,
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: { 
        pincode: pincode,
        delivery_country: country,
        order_type: "Prepaid",
      },
    })

    if (result.data.status === 'error') {
      return {data, error: 'An error occurred.'}
    }
    data = result.data.data

    return {data, error}
  } catch (e) {
    error = e.message   
    return {data, error}
  }
}

export const verfiyCoupon = async (payload, token) => {
  let data
  let error
  
  try {
    let result = await axios({
      url: `http://localhost:3002/internal/api/users/verifyCoupon`,
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: {
        code: payload
      },
    })
    if (result.data.status === 'error') {
      return {data, error: 'An error occurred.'}
    }
  return result.data
  } catch(e){
    error = e.message
    return {data, error}
  }
}
