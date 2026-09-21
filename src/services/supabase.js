import { createClient } from '@supabase/supabase-js';
import { INITIAL_BUSINESSES, INITIAL_CATEGORIES, INITIAL_LOCATIONS, INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_PLANS } from '../data/mockData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qowpfopjvbcicwqdifvd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvd3Bmb3BqdmJjaWN3cWRpZnZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwMDIyNDgsImV4cCI6MjEwNTU3ODI0OH0.5LD-23Tww4zq-r06MyEsQpBSwZPaG0VU-zkLw9FHXFw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

// Storage helper with fallback to localStorage
const STORAGE_KEYS = {
  BUSINESSES: 'scd_businesses_v1',
  PRODUCTS: 'scd_products_v1',
  ORDERS: 'scd_orders_v1',
  CATEGORIES: 'scd_categories_v1',
  LOCATIONS: 'scd_locations_v1',
  FAVORITES: 'scd_favorites_v1'
};

export const localDb = {
  getBusinesses: () => {
    const data = localStorage.getItem(STORAGE_KEYS.BUSINESSES);
    return data ? JSON.parse(data) : INITIAL_BUSINESSES;
  },
  saveBusinesses: (businesses) => {
    localStorage.setItem(STORAGE_KEYS.BUSINESSES, JSON.stringify(businesses));
  },
  getProducts: (businessId) => {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    const all = data ? JSON.parse(data) : INITIAL_PRODUCTS;
    return businessId ? all.filter(p => p.businessId === businessId) : all;
  },
  saveProducts: (products) => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },
  getOrders: (businessId) => {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    const all = data ? JSON.parse(data) : INITIAL_ORDERS;
    return businessId ? all.filter(o => o.businessId === businessId) : all;
  },
  saveOrders: (orders) => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },
  getFavorites: () => {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  },
  toggleFavorite: (businessId) => {
    const favs = localDb.getFavorites();
    const next = favs.includes(businessId) ? favs.filter(id => id !== businessId) : [...favs, businessId];
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(next));
    return next;
  }
};
