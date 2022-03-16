# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

### 1. Endpoints documentation:
## Users Endpoints:
- Login:'/login' [GET]. Body must be as follows:
{
    "user_name":"user_name",
    "password":"user_password"
}
- Register : '/register' [Post] . Body must be as follows:
{
    "user_name":"user_name",
    "password": "user_passowrd",
    "first_name":"first_name",
    "last_name":"last_name" 
}
- Get All users: index route :'/allUsers' [GET] 
- Get single user: show route :'/singleUser?id=1' [GET] 

## Products Endpoints:
- Get All Products:'/allProducts' [GET] 
- Get single product: show route :'/singleProduct?id=1' [GET] 
- Add Product : '/addProduct' [Post] . Body must be as follows: 
{
    "product_name":"shirt",
    "category":"clothes",
    "price":"100"
}


## Orders Endpoints:
- Get All Orders:'/allOrders' [GET] 
- Get Orders By User: show route :'/orderByUser?id=1' [GET] 
- Add Order : '/addOrder' [Post] . Body must be as follows: 
{
    "order_status":"open",
    "user_id":1
}
- Add Product To Order : '/orders/1/products' [Post] . Body must be as follows: 
{
    "productId": "1",
    "quantity": "20"
}
## Data Shapes
#### Table Product
(id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)
- id : SERIAL PRIMARY  KEY
- product_name : VARCHAR(150)
- price : DOUBLE PRECISION 
- category : VARCHAR(150)

#### User Table
- id : SERIAL PRIMARY  KEY
- user_name :VARCHAR(150)
- first_name :VARCHAR(150)
- last_name VARCHAR(150)
-  password VARCHAR(150)
#### Orders Table
- id : SERIAL PRIMARY  KEY
- order_status : VARCHAR(150)
- user_id : integer REFERENCES users(id)

#### order_products Table
- id : SERIAL PRIMARY  KEY
- quantity : integer
- order_id : integer REFERENCES orders(id)
- product_id : integer REFERENCES products(id)


