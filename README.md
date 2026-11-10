# Pickup App

Aplicación web desarrollada con React para simular la compra de productos de supermercado bajo la modalidad **Pickup** (compra en línea y recogida en tienda).

## Funcionalidades

- Selección de sucursal mediante un mapa interactivo.
- Visualización de productos disponibles según la tienda seleccionada.
- Carrito de compras con controles para agregar, incrementar, disminuir y eliminar productos.
- Cálculo automático del subtotal y total del pedido.
- Confirmación al cambiar de sucursal cuando existen productos en el carrito.
- Formulario de checkout con validación de nombre, teléfono y correo electrónico opcional.
- Generación de un número de pedido y tiempo estimado de preparación.
- Persistencia del carrito mediante `localStorage`.
- Interfaz adaptable a diferentes tamaños de pantalla.

## Tecnologías

- React y TypeScript.
- Vite.
- Tailwind CSS.
- React Router.
- Leaflet y React Leaflet.

## Requisitos

- Node.js compatible con las dependencias del proyecto.
- npm.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/cpinedae001/pickup-app.git
cd pickup-app
```

Instalar dependencias:

```bash
npm install
```

Iniciar la aplicación:

```bash
npm run dev
```

## Validación técnica

Ejecutar el análisis estático:

```bash
npm run lint
```

Verificar la compilación de producción:

```bash
npm run build
```

## Flujo de uso

1. Seleccionar una sucursal en el mapa.
2. Consultar el catálogo de productos disponibles.
3. Agregar productos al carrito y ajustar las cantidades.
4. Revisar el total y continuar al checkout.
5. Completar los datos del cliente.
6. Confirmar el pedido y consultar su número de referencia.

## Reglas de negocio

- Cada carrito pertenece a una única tienda.
- Para comprar en otra sucursal con artículos existentes, el usuario debe confirmar que desea vaciar el carrito.
- El pedido requiere al menos un producto.
- El nombre y el teléfono son obligatorios; el correo electrónico es opcional.
- Al confirmar el pedido, el carrito se vacía.

## Alcance y limitaciones

Esta versión es un MVP frontend con datos simulados.

- No requiere autenticación ni procesamiento de pagos.
- Los productos, las sucursales y la disponibilidad son datos locales.
- Los pedidos se generan y mantienen en memoria durante la sesión actual de la aplicación.
- Los artículos del carrito se conservan en `localStorage` del navegador.
- Al actualizar la página, se pierde la confirmación almacenada únicamente en memoria.
- El tiempo estimado de preparación es ilustrativo.

## Autor

Proyecto desarrollado como prueba técnica de React.
