import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
  )
    token
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

export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    _id: ID!
    $quantity: Int!
  ) {
    updateProduct(
      _id: $_id
      quantity: $$quantity
    ) {
      product {
        name
        description
        thumbnail
        quantity
        price
        category {
          name
        }
        reviews {
            _id
            user
            reviewText
          }
        modelImage
      }
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation removeProduct($_id: ID!) {
    removeProduct(_id: $_id){
      product {
        name
        description
      }
    }
  }
`;

export const REMOVE_REVIEW = gql`
  mutation removeReview($_id: ID!){
    removeReview(_id: $_id){
      product {
        name
        description
      }
    }
  }
`;
