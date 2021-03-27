# Repositorio semilla: aplicación React :seedling:

> Este es uno de los repositorios que utilizamos en la serie **Tu primera aplicación full stack: NodeJS + React**, [disponible en YouTube](https://www.youtube.com/playlist?list=PL7q-McYJyHlgVGQIRYVKl381twyJ4XM_h). Te recomendamos que mires la serie para entender un poco más sobre las tecnologías que elegimos. :smiley:

¡Bienvenida/o! En este repositorio encontrarás una plantilla (de las infinitas posibles) para crear una aplicación web con React. Las principales tecnologías que utilizamos son:

- [React](https://reactjs.org/): framework para construir interfaces de usuario.
- [Recoil](https://recoiljs.org/): biblioteca para manejar estado en React.
- [Material UI](https://material-ui.com/): sistema de componentes visuales para React.
- [Jest](https://jestjs.io/): framework para escribir tests.

Para crear un proyecto siguiendo esta plantilla, lo único que tenés que hacer es clickear en el botón que dice `Use this template`. ¡Y no te olvides de cambiarle el nombre en el `package.json`!

:information_source: Este proyecto fue creado con [Create React App](https://create-react-app.dev/), y por lo tanto toda la documentación del sitio oficial también puede consultarse para saber más.

## :point_up: Prerrequisitos - para instalar antes de empezar

Vas a necesitar un IDE o al menos un editor de texto que coloree la sintaxis. Recomendamos utilizar [Visual Studio Code](https://code.visualstudio.com/) - que se lleva muy bien con proyectos JavaScript - enriquecido con los siguientes plugins:

- [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Test Explorer UI](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-test-explorer)
- [Jest Test Explorer](https://marketplace.visualstudio.com/items?itemName=kavod-io.vscode-jest-test-adapter)

Para ejecutar el código es necesario tener NodeJS en su versión 14 (`lts/fermium`). Para instalarlo recomendamos utilizar el manejador de versiones [`nvm`](https://github.com/nvm-sh/nvm), aunque también podés hacerlo manualmente siguiendo las instrucciones adecuadas para tu sistema operativo.

El ejemplo viene preparado para ser ejecutado junto a una API, que puede crearse desde [este repositorio](https://github.com/unahur-desapp/nodejs-api-seed).

## :ballot_box_with_check: Configuración inicial del proyecto

Asumiendo que ya configuraste todos los prerrequisitos y que vas a utilizar Docker, estos son los comandos que deberías ejecutar la primera vez que trabajes en el proyecto:

```shell
# Copia las variables de entorno necesarias para interactuar con la API.
cp .env.example .env

# Instala las dependencias Node del proyecto.
npm install
```

## :file_folder: Estructura de directorios

Breve descripción de qué se puede encontrar en cada uno de los directorios del proyecto:

```shell
├── public                  # Index, favicon y otros archivos comunes
└── src
    ├── components          # Componentes de React
    └── state               # Selectores y átomos de Recoil
```

## :woman_technologist: :man_technologist: Comandos útiles para el día a día

A continuación, algunos comandos necesarios para el desarrollo diario en este proyecto.

### Código

```shell
# Levanta el proyecto y recarga automáticamente si hay cambios.
npm start

# Ejecuta los tests y se queda esperando por cambios.
npm test
```

## :rocket: Despliegue

Para publicar en Heroku, seguir esta guía: https://blog.heroku.com/deploying-react-with-zero-configuration.
