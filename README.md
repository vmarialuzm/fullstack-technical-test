# Proyecto de Adopción de Mascotas - FullStack

Este es un proyecto FullStack desarrollado para facilitar la gestión y el seguimiento de la adopción de mascotas. 
El frontend esta construido con **React** y **TypeScript**, junto con la librería de **Mantine UI**.
El backend está desarrollador con **Django REST Framework** y **JWT** para la autenticación.
El sistema soporta funcionalidades como creación, actualización, eliminación y visualización de usuarios, animales y adopciones, proporcionando una experiencia completa para la administración de un refugio de adopción de mascotas.


## Installation Backend

1. Clone the repository.

```git
git clone git@github.com:vmarialuzm/fullstack-technical-test.git
```

2. CD to the backend folder

```bash
cd backend/
```

3. Configure a virtual environment

```bash
virtualenv venv
.\venv\Scripts\activate
```

4. Install the project dependecies

```bash
pip install -r requirements.txt
```

5. Create a .env file to configure the environment variables and copy the contents of the .env.example file and replace the values ​​with your credentials.

6. Run migrations

```bash
python manage.py migrate
```

7. Start the development server

```bash
python manage.py runserver
```

## Installation Frontend

1. CD to the frontend folder

```bash
cd frontend/
```

2. Install project dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```