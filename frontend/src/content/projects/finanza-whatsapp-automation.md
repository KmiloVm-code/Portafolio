---
title: Finanza WhatsApp Automation
technologies: ["N8N", "WhatsApp Business API", "Finanza AI API (Custom)", "Groq", "Gemini", "Node.js"]
repository_url: https://github.com/KmiloVm-code/finanza-ai/tree/dev/automation
project_url: https://finaix-app.vercel.app/
description: |
  Extensión conversacional para el ecosistema Finanza AI que permite la gestión financiera omnicanal mediante WhatsApp. El flujo actúa como un cliente inteligente que se conecta a las APIs desarrolladas en el proyecto principal para registrar transacciones automáticamente. El sistema implementa una capa de seguridad personalizada: antes de procesar cualquier dato, el flujo valida la identidad del usuario mediante un sistema de tokens vinculados a su número de WhatsApp registrado en la plataforma web. Una vez autenticado, utiliza un motor híbrido para procesar imágenes de recibos (OCR) o texto, enviando la información estructurada a la base de datos centralizada de Finanza AI.

images: ["/projects/finanza-whatsapp-automation1.webp", "/projects/finanza-whatsapp-automation2.webp", "/projects/finanza-whatsapp-automation3.webp", "/projects/finanza-whatsapp-automation4.webp"]
challenges: |
  Autenticación y Seguridad: Se implementó un sistema de validación de sesión donde el flujo de n8n consume el endpoint de la App Web para verificar el estado y la expiración del token vinculado al número de WhatsApp, garantizando que solo usuarios registrados puedan afectar su balance financiero.

  Integración de Ecosistemas: El mayor reto fue conectar una herramienta de automatización externa (n8n) con una arquitectura moderna de Next.js 15, asegurando que los datos extraídos por la IA (monto, comercio, categoría) mantuvieran el mismo formato y precisión que el registro manual en la web.

  Normalización de Datos Híbridos: Se logró unificar la entrada de datos provenientes de dos fuentes distintas —la API de visión para fotos y la API de procesamiento de texto— en un solo objeto JSON estandarizado compatible con la API de transacciones existente.

result: |
  Sincronización Total: Los gastos registrados por texto o foto en WhatsApp se reflejan instantáneamente en el Dashboard interactivo de la App Web.

  Reducción de Fricción: Los usuarios pueden gestionar sus finanzas sin salir de su aplicación de mensajería, manteniendo la seguridad de una sesión web activa.

  Arquitectura Robusta: Un flujo capaz de manejar fallos de red o tokens expirados, notificando al usuario la necesidad de re-autenticarse en la plataforma principal.
---