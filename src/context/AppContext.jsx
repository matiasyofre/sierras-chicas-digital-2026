import React, { createContext, useContext, useState, useEffect } from 'react';
import { localDb, DEMO_ACCOUNTS, supabase } from '../services/supabase';
import { INITIAL_CATEGORIES, INITIAL_LOCATIONS, INITIAL_PLANS } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Authentication & Role State (Defaults to 'guest' or saved session)
  const [currentUser, setCurrentUser] = useState(() => localDb.getAuthSession());
  const userRole = currentUser ? currentUser.role : 'guest'; // 'guest', 'user', 'merchant', 'admin'

  const [locations] = useState(INITIAL_LOCATIONS);
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('sierras_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });
  const [plans, setPlans] = useState(() => {
    const saved = localStorage.getItem('sierras_plans');
    return saved ? JSON.parse(saved) : INITIAL_PLANS;
  });
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('sierras_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });
  const [tags, setTags] = useState(() => {
    const saved = localStorage.getItem('sierras_tags');
    return saved ? JSON.parse(saved) : INITIAL_TAGS;
  });
  
  const [businesses, setBusinesses] = useState(() => localDb.getBusinesses());
  const [products, setProducts] = useState(() => localDb.getProducts());
  const [orders, setOrders] = useState(() => localDb.getOrders());
  const [favorites, setFavorites] = useState(() => localDb.getFavorites());

  // Search & Filters for directory
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart state for PWA store
  const [cart, setCart] = useState([]);
  const [cartBusiness, setCartBusiness] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync session
  useEffect(() => {
    localDb.saveAuthSession(currentUser);
  }, [currentUser]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sierras_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('sierras_plans', JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem('sierras_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('sierras_tags', JSON.stringify(tags));
  }, [tags]);

  // Sync to local DB
  useEffect(() => {
    localDb.saveBusinesses(businesses);
  }, [businesses]);

  useEffect(() => {
    localDb.saveProducts(products);
  }, [products]);

  useEffect(() => {
    localDb.saveOrders(orders);
  }, [orders]);

  // Auth Operations
  const loginWithDemo = (demoKey) => {
    const account = DEMO_ACCOUNTS[demoKey];
    if (account) {
      setCurrentUser(account);
      return account;
    }
    return null;
  };

  const loginWithEmail = async (email, password) => {
    try {
      // 1. Check if matches demo accounts
      const matchedDemo = Object.values(DEMO_ACCOUNTS).find(a => a.email.toLowerCase() === email.toLowerCase());
      if (matchedDemo) {
        setCurrentUser(matchedDemo);
        return { success: true, user: matchedDemo };
      }

      // 2. Try Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        // Fallback for custom emails
        const customUser = {
          id: 'usr-' + Date.now(),
          email,
          fullName: email.split('@')[0],
          role: 'user',
          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          location: 'Río Ceballos'
        };
        setCurrentUser(customUser);
        return { success: true, user: customUser };
      }

      const loggedUser = {
        id: data.user.id,
        email: data.user.email,
        fullName: data.user.user_metadata?.full_name || email.split('@')[0],
        role: data.user.user_metadata?.role || 'user',
        avatarUrl: data.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
      };
      setCurrentUser(loggedUser);
      return { success: true, user: loggedUser };
    } catch (err) {
      console.warn('Auth fallback:', err);
      const fallbackUser = {
        id: 'usr-' + Date.now(),
        email,
        fullName: email.split('@')[0],
        role: 'user',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
      };
      setCurrentUser(fallbackUser);
      return { success: true, user: fallbackUser };
    }
  };

  const registerWithEmail = async ({ email, password, fullName, role, businessName, location }) => {
    const newUser = {
      id: 'usr-' + Date.now(),
      email,
      fullName: fullName || email.split('@')[0],
      role: role || 'user',
      businessName: role === 'merchant' ? businessName : undefined,
      businessId: role === 'merchant' ? 'biz-1' : undefined,
      location: location || 'Río Ceballos',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    };

    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    localDb.saveAuthSession(null);
  };

  // Favorites
  const toggleFavorite = (businessId) => {
    const updated = localDb.toggleFavorite(businessId);
    setFavorites(updated);
  };

  // Cart operations
  const addToCart = (product, business) => {
    if (cartBusiness && cartBusiness.id !== business.id && cart.length > 0) {
      if (!window.confirm(`Tu carrito actual contiene productos de "${cartBusiness.name}". ¿Deseas vaciarlo para agregar de "${business.name}"?`)) {
        return;
      }
      setCart([{ ...product, qty: 1 }]);
      setCartBusiness(business);
      setIsCartOpen(true);
      return;
    }

    setCartBusiness(business);
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, qty } : item));
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const next = prev.filter(item => item.id !== productId);
      if (next.length === 0) setCartBusiness(null);
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
    setCartBusiness(null);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Merchant operations
  const updateBusiness = (updatedBiz) => {
    setBusinesses(prev => prev.map(b => b.id === updatedBiz.id ? { ...b, ...updatedBiz } : b));
  };

  const addNewBusiness = (newBiz) => {
    const bizWithId = {
      ...newBiz,
      id: 'biz-' + Date.now(),
      visitsCount: 1,
      rating: 5.0,
      reviewCount: 1,
      status: 'active',
      isOpen: true,
      isVerified: true
    };
    setBusinesses(prev => [bizWithId, ...prev]);
    return bizWithId;
  };

  const deleteBusiness = (bizId) => {
    setBusinesses(prev => prev.filter(b => b.id !== bizId));
    setProducts(prev => prev.filter(p => p.businessId !== bizId));
  };

  const recordVisit = (bizId) => {
    if (bizId) {
      setBusinesses(prev => prev.map(b => b.id === bizId ? { ...b, visitsCount: (b.visitsCount || 0) + 1 } : b));
    }
    setSettings(prev => ({ ...prev, totalSiteVisits: (prev.totalSiteVisits || 0) + 1 }));
  };

  // Product operations
  const updateProduct = (updatedProd) => {
    setProducts(prev => prev.map(p => p.id === updatedProd.id ? { ...p, ...updatedProd } : p));
  };

  const addProduct = (newProd) => {
    const prodWithId = { 
      ...newProd, 
      id: 'prod-' + Date.now(), 
      isActive: true, 
      inStock: true,
      hasUnlimitedStock: newProd.hasUnlimitedStock || false,
      tags: newProd.tags || []
    };
    setProducts(prev => [prodWithId, ...prev]);
    return prodWithId;
  };

  const deleteProduct = (prodId) => {
    setProducts(prev => prev.filter(p => p.id !== prodId));
  };

  // Settings & Plans operations
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updatePlan = (updatedPlan) => {
    setPlans(prev => prev.map(p => p.id === updatedPlan.id ? { ...p, ...updatedPlan } : p));
  };

  // Taxonomy operations (Rubros, Categorías, Subcategorías)
  const addCategory = (cat) => {
    const newCat = {
      ...cat,
      id: 'cat-' + Date.now(),
      slug: cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      subcategories: cat.subcategories || []
    };
    setCategories(prev => [...prev, newCat]);
  };

  const updateCategory = (updatedCat) => {
    setCategories(prev => prev.map(c => c.id === updatedCat.id ? { ...c, ...updatedCat } : c));
  };

  const deleteCategory = (catId) => {
    setCategories(prev => prev.filter(c => c.id !== catId));
  };

  const addSubcategory = (catId, subName) => {
    if (!subName.trim()) return;
    setCategories(prev => prev.map(c => {
      if (c.id === catId) {
        const currentSubs = c.subcategories || [];
        if (!currentSubs.includes(subName)) {
          return { ...c, subcategories: [...currentSubs, subName] };
        }
      }
      return c;
    }));
  };

  const deleteSubcategory = (catId, subName) => {
    setCategories(prev => prev.map(c => {
      if (c.id === catId) {
        return { ...c, subcategories: (c.subcategories || []).filter(s => s !== subName) };
      }
      return c;
    }));
  };

  // Tag operations
  const addTag = (tag) => {
    const newTag = { ...tag, id: 'tag-' + Date.now() };
    setTags(prev => [...prev, newTag]);
  };

  const deleteTag = (tagId) => {
    setTags(prev => prev.filter(t => t.id !== tagId));
  };

  // Order operations for POS / Kanban
  const updateOrderStatus = (orderId, nextStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
  };

  const addOrder = (newOrder) => {
    const orderWithId = {
      ...newOrder,
      id: 'ord-' + Date.now(),
      orderNumber: '#' + Math.floor(1000 + Math.random() * 9000),
      timeAgo: 'Recién',
      status: 'pending'
    };
    setOrders(prev => [orderWithId, ...prev]);
    return orderWithId;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        userRole,
        isAuthenticated: !!currentUser,
        isMerchant: userRole === 'merchant',
        isAdmin: userRole === 'admin',
        isUser: userRole === 'user' || userRole === 'guest',
        loginWithDemo,
        loginWithEmail,
        registerWithEmail,
        logout,
        locations,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        addSubcategory,
        deleteSubcategory,
        plans,
        updatePlan,
        settings,
        updateSettings,
        tags,
        addTag,
        deleteTag,
        businesses,
        addNewBusiness,
        updateBusiness,
        deleteBusiness,
        recordVisit,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        updateOrderStatus,
        addOrder,
        favorites,
        toggleFavorite,
        selectedLocation,
        setSelectedLocation,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        searchQuery,
        setSearchQuery,
        cart,
        cartBusiness,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartItemCount
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}

