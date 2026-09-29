# DIRECTRIZ OBLIGATORIA: PROTECCIÓN DE DATOS LOCALES, CORREOS Y ADJUNTOS

> [!IMPORTANT]
> **POLÍTICA DE NO ALTERACIÓN (STRICT READ-ONLY EN ORIGEN)**
> Todos los datos locales del Mac (archivos, hojas de cálculo, PDFs, documentos) así como los correos electrónicos y sus adjuntos son de **SÓLO LECTURA** y no deben ser modificados, alterados ni eliminados bajo ningún concepto.

---

## 1. Archivos Locales en el Mac
- **Prohibición de Alteración**: Ninguna operación debe modificar, sobreescribir, renombrar ni eliminar archivos originales ubicados en el sistema (`Desktop`, `Downloads`, `Documents`, `BEA TRABAJO`, carpetas de trabajo, Excels de producción, nóminas, cuadrantes, actas de inventario, etc.).
- **Modo de Acceso**: Exclusivamente lectura e inspección de datos.

## 2. Correos Electrónicos y Adjuntos (Gmail / Ionos / IMAP)
- **Integridad de Bandejas**: Prohibido eliminar correos (`EXPUNGE`, `STORE +FLAGS \Deleted`), mover mensajes a papelera o alterar mensajes en los servidores o clientes de correo.
- **Descargas de Adjuntos**: Los adjuntos se leen y descargan únicamente como copias temporales de trabajo. Los correos y adjuntos originales en los servidores de correo permanecen intactos.

## 3. Trabajo Exclusivo sobre Copias Alojadas en Supabase
- **Persistencia y Modificaciones**: Cualquier operación de escritura, actualización, enriquecimiento, cálculo o persistencia de datos operativos (ventas, cuadrantes, inventarios, incidencias, gastos, comisiones) debe realizarse **exclusivamente sobre las tablas y réplicas alojadas en Supabase** (`xgybtymacwjbhdndbhkp.supabase.co`).
- **Aislamiento de Entornos**: Toda transformación o ETL se ejecuta en memoria y se almacena en Supabase, garantizando que los datos maestros locales nunca sufran alteraciones.
