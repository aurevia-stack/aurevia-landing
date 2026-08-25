# AUREVIA Salud — Proyecto completo

Sistema de inteligencia artificial para **reducir las listas de espera en Chile**, partiendo por recuperar las horas médicas que hoy se pierden. Documento maestro del proyecto: de aquí salen todas las respuestas del formulario, el guion del pitch y el presupuesto.

---

## 1. El problema (con cifras oficiales)

**Chile tiene una fila de 2,4 millones de personas esperando atención de salud** — y al mismo tiempo bota horas médicas todos los días.

- **2.419.098 personas** estaban en la lista de espera No GES al 31/12/2025; al 31/03/2026 seguían pendientes **2,51 millones de interconsultas** de especialidad y **458 mil solicitudes quirúrgicas** (Glosa 06, Minsal).
- La espera mediana es de **236 días para ver a un especialista** y **259 días para una cirugía** (marzo 2026).
- Solo en el primer semestre de 2025, **16.018 personas fallecieron mientras esperaban** una atención.
- Y la paradoja: **15,6% de las consultas de especialidad agendadas se pierde porque el paciente no llega** ("NSP: no se presenta"). Sobre 7,57 millones de consultas agendadas (2022), son **más de 1,1 millones de horas perdidas al año**, con un costo directo estimado de **~$15.000 millones** — sin contar que cada hora vacía es un paciente de la fila que pudo haberse atendido. Peor aún: **dos inasistencias sacan al paciente de la lista de espera** (73.690 personas egresadas por inasistencia solo entre enero y septiembre de 2025), muchas veces porque nunca se enteraron de su hora — el teléfono de contacto estaba desactualizado.

**En la Región del Biobío** el problema está en la puerta de la casa:

- Los 4 Servicios de Salud (Concepción, Talcahuano, Biobío, Arauco) acumulaban **más de 235.000 solicitudes de consulta de especialidad** al cierre de 2025; la provincia de Concepción sola tenía **145.600 personas en lista** (dic. 2024).
- El **Hospital de Los Ángeles pierde 21.000 horas de atención al año** por inasistencias.
- El problema no es solo público: el sector privado hace el **54% de las consultas médicas del país** (33,9 millones en 2024) y sufre inasistencias de 10–20%. Para un centro médico o dental mediano, **cada box vacío es facturación perdida directa**: un centro con 1.500 citas/mes y 12% de inasistencia pierde ~180 horas mensuales, que a $25.000–$35.000 el ticket son **$5–7 millones de pesos cada mes**.

**La causa raíz es operacional, no médica:** los centros confirman con llamadas manuales (o no confirman), no detectan a tiempo al paciente que no va a ir, y cuando una hora se libera a última ora, no existe ningún mecanismo para ofrecérsela a otro paciente. La hora simplemente se pierde.

## 2. La solución: AUREVIA Salud

Un **asistente con inteligencia artificial** que se conecta a la agenda del centro de salud y trabaja 24/7 por los canales que los pacientes chilenos sí usan: **WhatsApp y llamada telefónica automática**.

**Qué hace, en 4 movimientos:**

1. **Confirma cada cita** por WhatsApp (y por llamada automática para adultos mayores o quien no responde el chat), en lenguaje natural, días y horas antes de la cita. Resuelve dudas simples: dónde queda el centro, qué llevar, cómo prepararse.
2. **Detecta a tiempo la cita en riesgo**: si el paciente dice que no puede, cancela o simplemente no confirma, el sistema lo marca y libera la hora **antes** de que se pierda.
3. **Rescata la hora liberada**: en ese mismo momento ofrece el cupo, uno a uno y por orden de prioridad, a los pacientes de la **lista de espera del propio centro** que calzan con esa especialidad y horario. La hora que se iba a perder queda tomada por otro paciente. Este es el diferenciador: los competidores del segmento recuerdan; **AUREVIA Salud rellena**.
4. **Reporta y depura**: panel simple para el administrador con horas recuperadas, inasistencia por profesional y por día, y pacientes incontactables (teléfonos malos) para depurar la lista. En salud municipal, ese reporte es además el respaldo de rendición ante el concejo o el Servicio de Salud.

**Por qué funciona (evidencia chilena):** los recordatorios inteligentes reducen las citas perdidas hasta 45% según pilotos difundidos por el Minsal; el estudio del CMM de la U. de Chile midió que las llamadas bajan el ausentismo de 20,3% a 12,5%; el CESFAM Salvador Bustos de Ñuñoa redujo 37% sus inasistencias priorizadas con IA en 2026. AUREVIA Salud combina ambos canales (chat + voz) y agrega el rescate del cupo, que es donde está la plata para el cliente.

**Qué es técnicamente:** un producto SaaS. Integración con la agenda del centro (API cuando existe; sincronización asistida cuando no), motor de conversación sobre la API oficial de WhatsApp Business y telefonía programable, modelo de lenguaje para la conversación y reglas de priorización configurables por el centro (sin decisiones clínicas: la priorización la definen los profesionales del centro). Cumplimiento de la Ley 19.628 de datos personales: datos mínimos (nombre, teléfono, cita), cifrados, con consentimiento del paciente gestionado por el centro.

## 3. A quién se le vende (2 segmentos, en orden)

**Segmento 1 — ancla comercial: centros médicos y dentales privados medianos del Gran Concepción (5 a 30 boxes).**
Decenas de centros solo entre Concepción, Talcahuano, San Pedro de la Paz, Hualpén y Chiguayante; cientos en la región. Deciden rápido (el dueño o el administrador), sienten la pérdida en la facturación de cada mes, y hoy solo tienen recordatorios pasivos de su software de agenda (Dentalink, AgendaPro, Reservo) o llamadas manuales. Ciclo de venta: semanas.

**Segmento 2 — expansión con impacto: salud municipal del Biobío (CESFAM y corporaciones/departamentos de salud).**
La región tiene del orden de 50–60 CESFAM en 33 comunas. Pierden miles de horas al año (los datos públicos de comunas comparables: San Carlos 44.290 horas/año; Antofagasta APS 271.000), confirman por teléfono con personal administrativo, y tienen presión política y presupuestaria por reducir listas. Se entra con **pilotos medibles de 3 meses** en 1–2 comunas, con el reporte de horas recuperadas como argumento de renovación. Ciclo de venta: meses (por eso es segundo).

## 4. Competencia y por qué hay espacio

| Actor | Dónde manda | Por qué no cubre este nicho |
|---|---|---|
| **Cero.ai** (YC S21) | 80% de los hospitales de alta complejidad; 2M+ citas/mes | Venta enterprise a instituciones grandes; el centro mediano regional no es su cliente objetivo |
| **Rayen Salud** (Suite IA/ANIS) | CESFAM con su sistema RAYEN (400+ establecimientos) | Su IA va amarrada al contrato SIDRA municipal; despliegue nuevo (2024–2026) y no llega al sector privado |
| **AgendaPro / Reservo / Dentalink** | Agenda low-cost para clínicas privadas | Recordatorios pasivos (plantillas SMS/WhatsApp); **ninguno rescata la hora liberada ni llama por voz** |
| **CGS SmartCall, Keirón, otros** | Hospitales/clínicas grandes, viaje del paciente | Mismo patrón: foco enterprise o foco agenda, no el mediano regional |

**Diferenciadores defendibles de AUREVIA Salud:** (1) rescate activo del cupo contra la lista de espera del centro — el único del segmento; (2) doble canal WhatsApp + llamada de voz automática (clave con adultos mayores, respaldado por la evidencia del CMM); (3) precio dimensionado para el centro mediano ($150–350 mil/mes vs. contratos enterprise); (4) implementación y soporte **presencial en el Biobío**, con reportería pensada para la rendición municipal. Riesgo competitivo principal (Cero.ai bajando de segmento o Rayen empaquetando su IA) mitigado por velocidad, cercanía y foco: el objetivo del año 1 es ser el estándar del Gran Concepción, no competir por el Sótero del Río.

## 5. Modelo de ingresos

Mismo modelo que la marca AUREVIA ya usa en automatización comercial: **implementación por pago único + suscripción mensual**.

- **Implementación**: $350.000 netos por centro (configuración de agenda, carga de lista de espera, capacitación del personal).
- **Suscripción**: $150.000/mes (hasta 10 boxes) · $250.000/mes (11–20) · $350.000/mes (21–30). Incluye WhatsApp + voz, panel, soporte local.
- **Sector municipal**: piloto de 3 meses a precio fijo ($1,2–1,8M según comunas/CESFAM) y luego convenio anual.

**El argumento de venta cabe en una frase:** "te devuelvo $3–5 millones al mes en horas que hoy pierdes, por $250 mil". Retorno >10x para el cliente, medible en su propio panel.

**Proyección año 1 (conservadora):** mes 1–3 construcción del MVP y 2 pilotos con descuento; mes 4–6 primeros 4 clientes pagando; mes 12: **8–12 centros activos → MRR $1,5–2,5 millones**, ingresos año 1 en torno a $12–18 millones. Punto de equilibrio operativo (~costos cloud + APIs + un soporte part-time) bajo los $1,5M/mes: se cruza dentro del año 1.

## 6. Impacto en empleo (el corazón del "Modo Empleo")

- **Inmediato**: la formalización de la empresa (1ª categoría, SII) y el empleo de su fundador a dedicación completa.
- **Año 1**: contratación de 1 persona en soporte/éxito de clientes (media jornada → jornada completa).
- **Año 2**: 2–3 empleos adicionales (ventas regional + soporte) al escalar a salud municipal y a otras regiones.
- **Indirecto**: cada hora médica recuperada es producción para el centro (que sostiene sus propios empleos) y una atención que un paciente de la fila recibe antes.

## 7. Hoja de ruta — las 3 verticales de la idea original

| Fase | Vertical | Qué se hace | Cuándo |
|---|---|---|---|
| **1 (este proyecto)** | **Descompresión de la lista de espera** | Confirmación IA + rescate de cupos + depuración de contactabilidad, en privados medianos y CESFAM del Biobío | Año 1 |
| 2 | **Seguimiento** | Recordatorio de controles de crónicos, preparación preoperatoria, contrarreferencia — sobre la misma base instalada de centros | Año 2 |
| 3 | **Prevención y precisión** | Priorización por riesgo (predicción de no-show y de agravamiento con los datos acumulados), campañas preventivas segmentadas (PAP, mamografías, crónicos descompensados) | Año 2–3 |

La secuencia importa: cada vertical usa la base de clientes y los datos de la anterior. Se empieza donde el dolor es más medible y la venta más corta, y se termina en el objetivo grande de la idea original: **que la lista de espera se gestione con inteligencia, no por orden de llegada**.

## 8. Quién está detrás

**Lucas Orellana** (segmento jóvenes 18–29, Región del Biobío) — creador de la marca **AUREVIA** (aureviasystem.cl), con experiencia práctica implementando CRM y automatización de WhatsApp, seguimiento de clientes y recordatorios para negocios locales: exactamente la tecnología que AUREVIA Salud aplica al problema de las horas médicas. El proyecto formaliza esa experiencia en una empresa nueva, con foco exclusivo en salud.

**Alianzas y apoyo (en construcción, se declaran como plan):** Centro de Negocios Sercotec Concepción (asesoría de gestión), Centro Regional de Telemedicina y Telesalud del Biobío (llega a las 33 comunas — canal natural para el segmento municipal), incubadoras universitarias locales (IncubaUdeC), y proveedores tecnológicos formales (partner oficial de la API de WhatsApp Business, proveedor cloud).

## 9. Qué financia el Capital Semilla (resumen; detalle en [05-estructura-de-costos.md](05-estructura-de-costos.md))

$3.000.000 = equipo de desarrollo y trabajo ($1.400.000 en activos) + plataforma tecnológica del primer año: API oficial de WhatsApp Business, cloud, servicios de IA, telefonía programable y registro de marca ($1.200.000 en intangibles) + marketing de lanzamiento, formalización y capacitación ($400.000 en gestión). Con eso el proyecto llega a MVP operando en 2 centros piloto dentro de 90 días desde la firma.
