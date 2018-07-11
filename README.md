# SIMAR

Visualizador SIMAR de CONABIO para el proyecto de [Sistema de Información y Análisis de Ecosistemas Marinos de México](https://simar.conabio.gob.mx/) creado para la Subcoordinación de Monitoreo Marino. Esta aplicación es la plataforma de visualización del [Sistema Satelital de Monitoreo Oceánico (SATMO)](http://www.biodiversidad.gob.mx/pais/mares/satmo/index.html).

## Descarga e instalación de los repositorios

```
git clone https://github.com/SIMARCONABIO/SIMAR
```

## Instalación de dependencias

``` bash
npm install
```

## Ejecutar localmente en modo pruebas

``` bash
npm run dev
```

Una vez en ejecución se puede consultar la aplicación con `localhost:8080`.

## Compilar códigos

``` bash
npm run build
```

Una vez compilados los archivos resultantes serán colocados en el directorio `/dist` y pueden ser colocados o actualizados en un servidor HTTP (Ej. Apache).

## Compliar códigos con reporte detallado

``` bash
npm run build --report
```

## Ejecutar pruebas Unit

``` bash
npm run unit
```

## Ejecutar pruebas e2e

``` bash
npm run e2e
```

## Ejecutar todas las pruebas

``` bash
npm test
```

## Dependencias externas

El visualizador SIMAR depende de la funcionalidad de su API, para una consulta detallada de la documentación de la API favor de referirse a [https://simar.conabio.gob.mx/docs](https://simar.conabio.gob.mx/docs). Al momento de escribir este documento la API se encuentra funcionando en la siguiente URL [https://simar.conabio.gob.mx/api/v1/](https://simar.conabio.gob.mx/api/v1/).