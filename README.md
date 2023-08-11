# Pet Travel Requirements API Service

API service to provide country-specific pet travel requirements. 

## Table of Contents

- [Features](#features)
- [Directory Structure](#directory-structure)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [EndPoints](#endpoints)
- [Contribution](#contribution)
- [License](#license)

## Features

1. List supported countries
2. Retrieve country-specific requirements for pet travel.
3. Dynamic pet and breed-specific requirements.
4. Real-time updates on requirements as policies change.


## Directory Structure

```
|--assets
|--dist
|--seed
    |-- seeder.ts
|-- src/
    |-- config/
    |   |-- cloudinary.ts
    |   |-- mailgun.ts
    |   |-- nodemailer.ts
    |   |-- database.ts
    |
    |-- application/
    |   |-- auth/
    |       |-- AuthController.ts
    |       |-- AuthRoutes.ts
    |
    |-- domain/
    |   |-- pets/
    |       |-- controllers/
    |           |-- PetRequirementController.ts
    |       |-- models/
    |           |-- Country.ts
    |           |-- PetRequirements.ts
    |       |-- routes/
    |           |-- PetRequirementRoutes.ts
    |       |-- services/
    |           |-- PetRequirementService.ts
    |    |-- country/
    |       |-- controllers/
    |           |-- CountryController.ts
    |       |-- models/
    |           |-- Country.ts
    |       |-- routes/
    |           |-- CountryRoutes.ts
    |       |-- services/
    |           |-- CountryService.ts
    |   |-- user/
    |       |-- controllers/
    |           |-- UserController.ts
    |           |-- UserPetController.ts
    |           |-- DocumentController.ts
    |       |-- models/
    |           |-- User.ts
    |           |-- UserPets.ts
    |           |-- DocumentUploads.ts
    |       |-- routes/
    |           |-- UserRoutes.ts
    |       |-- services/
    |           |-- UserService.ts
    |           |-- DocumentService.ts
    |
    |-- middlewares/
    |   |-- auth.ts
    |
    |
    |-- index.ts

```

## Setup and Installation

1. **Clone the Repository**

    ```bash
    git clone [repository_url]
    cd path_to_directory
    ```

2. **Install Dependencies**

    Using npm:

    ```bash
    npm install
    ```

    Using yarn:

    ```bash
    yarn
    ```

3. **Set Up Environment Variables**

    Rename `.env.example` to `.env` and fill out required fields like database URI, API keys, etc.

4. **Run the Server**

    ```bash
    npm run dev
    ```

## Usage

To fetch country-specific requirements:

```javascript
axios.get(`http://localhost:3000/requirements/:countryId`)
```

## EndPoints

- **GET /countries**: Fetch countries list.

- **GET /requirements/:countryId**: Fetch pet travel requirements for a specific country.

- **POST /requirements/**: Add new requirements for a country.

- **GET /requirement/:countryCode/:species/:breed?**: Fetch pet travel requirements for a specific country, species and/or breed.

- **GET /list-all-routes**: List all app routes.
---

If you need more specific details in certain areas or any other sections added, please let me know.