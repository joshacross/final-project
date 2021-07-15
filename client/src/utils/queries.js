import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
    query getProducts($category: ID, $name: String) {
      products(category: $category, name: $name) {
        _id
        name
        description
        price
        quantity
        thumbnail
        modelImage
        category {
          _id
        }
        reviews {
          _id
          user
          reviewText
        }
      }
    }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      thumbnail
      modelImage
      category {
        _id
      }
      reviews {
        _id
        user
        reviewText
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          thumbnail
          modelImage
          reviews {
            _id
            user
            reviewText
          }
        }
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
    query getCheckout($products: [ID]!) {
      checkout(products: $products) {
        session
      }
    }
`;