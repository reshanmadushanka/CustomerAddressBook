

## Customer Address Book
" 

# Getting started

## Installation

Clone the repository

    git clone git@github.com:reshanmadushanka/CustomerAddressBook.git

Switch to the repo folder

    cd CustomerAddressBook

Install all the dependencies using composer

    composer install

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

Generate a new application key

    php artisan key:generate

Install JS dependancies:

    npm install

Runs the react in the development mode.

    npm run dev

Run the database migrations (**Set the database connection in .env before migrating**)

    php artisan migrate

Start the local development server

    php artisan serve

You can now access the server at http://localhost:8000


## Database seeding

    php artisan db:seed


## API Specification

- `customers` - GET / all customers
- `/customers/create` - POST / add customer - {
     "name": "Tharusha Nalin",
    "nic": "21548795664",
    "address": "Galle, Sri Lanka",
    "item_list": [
       "mobile": "0714807733",
       "mobile": "0748523399",
       "mobile": "0748523399"
    ]
}
- `/customers/update/{id}` - POST / update customer
- `/customers/delete` - POST / delete customer
- `/customers/search` - POST / seacr by customer name 


Route::get('/customers', 'Api\CustomerController@index');
Route::post('/customers/create', 'Api\CustomerController@store');
Route::post('/customers/update/{id}', 'Api\CustomerController@update');
Route::post('/customers/delete', 'Api\CustomerController@destroy');
Route::post('/customers/search','Api\CustomerController@search');

# Testing API

Run the laravel development server

    php artisan serve

The api can now be accessed at

    http://localhost:8000/api

Request headers

| **Required** 	| **Key**              	| **Value**            	|
|----------	|------------------	|------------------	|
| Yes      	| Content-Type     	| application/json 	|


----------