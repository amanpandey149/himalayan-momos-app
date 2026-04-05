export const menuData = {
  vegMomos: [
      { id: 'v1a', name: 'Veg Momos (5 pcs)', price: 40, desc: 'Classic steamed momos with fresh minced veggies.', veg: true, bestSeller: true, img: '/veg_momos.png' },
      { id: 'v1b', name: 'Veg Momos (8 pcs)', price: 60, desc: 'Classic steamed momos with fresh minced veggies.', veg: true, bestSeller: false, img: '/veg_momos.png' },
      { id: 'v1c', name: 'Veg Momos (10 pcs)', price: 80, desc: 'Classic steamed momos with fresh minced veggies.', veg: true, bestSeller: false, img: '/veg_momos.png' },
      { id: 'v2a', name: 'Paneer Momos (5 pcs)', price: 60, desc: 'Stuffed with fresh paneer and spices.', veg: true, bestSeller: false, img: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800' },
      { id: 'v2b', name: 'Paneer Momos (8 pcs)', price: 80, desc: 'Stuffed with fresh paneer and spices.', veg: true, bestSeller: true, img: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800' },
      { id: 'v2c', name: 'Paneer Momos (10 pcs)', price: 90, desc: 'Stuffed with fresh paneer and spices.', veg: true, bestSeller: false, img: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800' },
      { id: 'v3a', name: 'Mushroom Momos (5 pcs)', price: 50, desc: 'Deliciously earthy mushroom filling.', veg: true, bestSeller: false, img: 'https://images.unsplash.com/photo-1541696432-82c668ce7012?w=800' },
      { id: 'v3b', name: 'Mushroom Momos (8 pcs)', price: 60, desc: 'Deliciously earthy mushroom filling.', veg: true, bestSeller: false, img: 'https://images.unsplash.com/photo-1541696432-82c668ce7012?w=800' },
      { id: 'v3c', name: 'Mushroom Momos (10 pcs)', price: 80, desc: 'Deliciously earthy mushroom filling.', veg: true, bestSeller: false, img: 'https://images.unsplash.com/photo-1541696432-82c668ce7012?w=800' }
  ],
  nonVegMomos: [
      { id: 'nv1', name: 'Darjeeling Chicken Momos', price: 90, desc: 'Authentic Darjeeling style juicy chicken momos.', veg: false, bestSeller: true, img: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&q=80&w=800' },
      { id: 'nv2', name: 'Chilli Chicken Momos', price: 110, desc: 'Spicy and tangy chilli chicken filling.', veg: false, bestSeller: false, img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=800' },
      { id: 'nv3', name: 'Chicken Crispy Momos', price: 120, desc: 'Golden-fried crispy exterior with juicy chicken inside.', veg: false, bestSeller: false, img: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800' }
  ],
  chinese: [
      { id: 'c1a', name: 'Fried Rice (Half)', price: 60, desc: 'Wok-tossed rice with fresh seasonal vegetables.', veg: true, popular: true, img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800' },
      { id: 'c1b', name: 'Fried Rice (Full)', price: 110, desc: 'Wok-tossed rice with fresh seasonal vegetables.', veg: true, popular: false, img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800' },
      { id: 'c2a', name: 'Schezwan Rice (Half)', price: 70, desc: 'Spicy noodles tossed in hot schezwan sauce.', veg: true, popular: false, img: 'https://images.unsplash.com/photo-1512058460205-c4912ddccc11?w=800' },
      { id: 'c2b', name: 'Schezwan Rice (Full)', price: 120, desc: 'Spicy noodles tossed in hot schezwan sauce.', veg: true, popular: false, img: 'https://images.unsplash.com/photo-1512058460205-c4912ddccc11?w=800' },
      { id: 'c3', name: 'Rice Manchurian', price: 130, desc: 'Veg manchurian balls served with flavorful rice.', veg: true, popular: true, img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800' },
      { id: 'c4', name: 'Triple Rice', price: 150, desc: 'Unique blend of fried rice, noodles, and manchurian gravy.', veg: true, popular: true, img: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800' },
      { id: 'c5a', name: 'Hakka Noodles (Half)', price: 70, desc: 'Classic stir-fried noodles with crisp veggies.', veg: true, popular: false, img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800' },
      { id: 'c5b', name: 'Hakka Noodles (Full)', price: 120, desc: 'Classic stir-fried noodles with crisp veggies.', veg: true, popular: false, img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800' },
      { id: 'c6a', name: 'Schezwan Noodles (Half)', price: 85, desc: 'Zesty noodles with a spicy schezwan kick.', veg: true, popular: false, img: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&q=80&w=800' },
      { id: 'c6b', name: 'Schezwan Noodles (Full)', price: 150, desc: 'Zesty noodles with a spicy schezwan kick.', veg: true, popular: false, img: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&q=80&w=800' },
      { id: 'c7a', name: 'Chawmining Noodles (Half)', price: 60, desc: 'Traditional chowmein style street noodles.', veg: true, popular: false, img: 'https://images.unsplash.com/photo-1552611052-d59a0d9741bc?auto=format&fit=crop&q=80&w=800' },
      { id: 'c7b', name: 'Chawmining Noodles (Full)', price: 110, desc: 'Traditional chowmein style street noodles.', veg: true, popular: false, img: 'https://images.unsplash.com/photo-1552611052-d59a0d9741bc?auto=format&fit=crop&q=80&w=800' },
      { id: 'c8', name: 'Ramen Noodles', price: 90, desc: 'Savory Japanese-style noodles in rich broth.', veg: true, popular: false, img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800' },
      { id: 'c9', name: 'Veg Thupka', price: 80, desc: 'Himalayan noodle soup with fresh veggies.', veg: true, popular: false, img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800' },
      { id: 'c10', name: 'Korean Kimchi Noodles', price: 100, desc: 'Spicy and sour kimchi flavored noodles.', veg: true, popular: false, img: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=800' },
      { id: 'c11', name: 'Chinese Platter', price: 200, desc: 'A grand feast featuring all our best Chinese starters.', veg: true, popular: true, img: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=800' },
      { id: 'c12', name: 'Burger Combo', price: 70, desc: 'Juicy veg burger served with a side of fries.', veg: true, popular: false, img: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=800' }
  ]
};
