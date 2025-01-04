import React from 'react';
import { FlatList } from 'react-native';
import ProductCard from './ProductCard';

const products = [
  { id: '1', name: 'Product 1', price: '$10', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Product 2', price: '$20', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Product 3', price: '$30', image: 'https://via.placeholder.com/150' },
  // Add more products as needed
];

const ProductList = () => {
  const renderItem = ({ item }) => <ProductCard product={item} />;

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      className="bg-gray-100"
    />
  );
};

export default ProductList; 