# VÍA Salud — Plataforma de inteligencia artificial para reducir las listas de espera en Chile

**La lista de espera chilena no es una fila: es un sistema con fugas.** Pacientes que entran mal derivados, horas que se pierden porque nadie confirma, cupos liberados que nadie rellena, enfermos que se agravan esperando y egresos administrativos sin trazabilidad. VÍA Salud ataca el sistema completo con tres motores de inteligencia artificial — **prevención, descompresión y seguimiento con precisión** — construidos sobre una misma plataforma de datos.

> El nombre lleva la idea dentro: **V-IA** — la vía inteligente del paciente. (Nombre propuesto, reemplazable sin afectar el resto del documento.)

---

## 1. Resumen ejecutivo

**El problema, en una línea:** 2,4 millones de personas esperan atención en Chile (mediana: 236 días para un especialista, 259 para una cirugía), mientras el propio sistema **bota más de 1,1 millones de horas médicas al año** por inasistencias (15,6% de las consultas de especialidad agendadas), con un costo directo del orden de **$15.000 millones anuales** — y 16.018 personas fallecieron esperando solo en el primer semestre de 2025.

**La tesis de VÍA Salud:** antes de pedir más médicos o más pabellones, hay que dejar de perder la capacidad que ya está pagada y ordenar la fila con criterio clínico, no por orden de llegada. Eso es un problema de **información y orquestación** — exactamente lo que la IA de 2026 resuelve bien — y ninguna solución existente en Chile lo ataca completo: unas confirman citas (Cero.ai, en hospitales grandes), otras agendan (AgendaPro, Reservo), pero **nadie orquesta el ciclo entero: prevenir la demanda evitable, descomprimir la lista y sostener al paciente después**.

**Qué es:** una plataforma SaaS con tres motores sobre un mismo núcleo de datos:

1. **VÍA Flujo (descompresión)** — predicción de inasistencia por paciente, confirmación conversacional multicanal (WhatsApp + llamada de voz con IA), **rescate de cupos en tiempo real** contra una cola de reemplazo priorizada, sobrecupo selectivo basado en riesgo de no-show, filtro de pertinencia de interconsultas y depuración auditable de listas.
2. **VÍA Prevención** — detección proactiva de pacientes en riesgo de descompensación (crónicos sin control) para atenderlos **antes** de que engrosen la lista, y orientación conversacional que dirige la demanda al nivel de atención correcto.
3. **VÍA Continuidad (seguimiento y precisión)** — score de riesgo dinámico por paciente que reordena la espera con criterio clínico explicable, preparación preoperatoria automatizada (menos cirugías suspendidas), adherencia a tratamiento y contrarreferencia cerrada.

**Por qué es creíble:** cada componente ya está demostrado por separado — en Chile o en la literatura — y la innovación de VÍA Salud está en integrarlos (sección 6). **Por qué ahora:** el Estado gasta $73.000 millones en planes de reducción, la Contraloría exige trazabilidad en los egresos, y la CNEP estima que solo la estrategia digital en APS permitiría atender 1,5 millones de personas más al año.

**Punto de entrada comercial (fase 1):** el motor de flujo, vendido a centros médicos y dentales medianos del Gran Concepción y a la salud municipal del Biobío — retorno medible en pesos y en horas desde el primer mes. Las fases 2 y 3 se construyen sobre los datos que la fase 1 acumula.

---

## 2. El sistema con fugas: dónde se pierde exactamente la capacidad

El recorrido real de un paciente chileno — CESFAM → interconsulta (SIC) → SIGTE → hospital → atención → contrarreferencia — pierde capacidad en seis puntos documentados. VÍA Salud tiene un componente para cada uno:

| # | Fuga documentada | Magnitud | Motor de VÍA Salud que la ataca |
|---|---|---|---|
| 1 | Demanda evitable: crónicos que se descompensan por falta de control y terminan en especialidad | La CNEP estima 1,5 millones de atenciones adicionales posibles con estrategia digital en APS | **Prevención** — radar de crónicos |
| 2 | Interconsultas no pertinentes o mal formuladas que entran a la lista | Alta no-pertinencia documentada (p. ej. estudio de otorrinolaringología, Hospital Sótero del Río); 19.557 egresos por error de registro y 16.078 duplicados en 9 meses de 2025 | **Flujo** — filtro de pertinencia + depuración |
| 3 | Pacientes incontactables: teléfonos malos, citas que nunca se enteraron | 73.690 egresos por inasistencia en 9 meses de 2025; dos ausencias sacan al paciente de la lista | **Flujo** — verificación de contactabilidad |
| 4 | No-show: la hora agendada que se pierde | 15,6% de 7,57 millones de consultas de especialidad al año; ~$15.000 millones | **Flujo** — predicción + confirmación + rescate |
| 5 | Fila sin criterio clínico: se atiende por orden de llegada, no por riesgo | 16.018 fallecidos en espera en el 1er semestre 2025 | **Continuidad** — score dinámico de riesgo |
| 6 | Egresos administrativos sin respaldo | Contraloría: 39.082 egresos como "atención otorgada" sin respaldo clínico y 49.539 por "inasistencia" sin cumplir la norma | **Núcleo** — bitácora auditable de cada evento |

En la Región del Biobío, donde parte el proyecto: más de 235.000 solicitudes de especialidad en espera en los 4 Servicios de Salud, 145.600 personas en lista solo en la provincia de Concepción, y 21.000 horas perdidas por inasistencia en el Hospital de Los Ángeles.

---

## 3. Arquitectura de la plataforma

Cuatro capas, todas construibles con tecnología disponible y probada en 2026:

**Capa 1 — Datos e interoperabilidad.** Calendario espejo del centro: se alimenta por API o estándar **HL7 FHIR** cuando el software del centro lo permite (la dirección que impulsa el propio Minsal), y por exportación diaria CSV/Excel cuando no — **el sistema funciona completo sin depender del permiso de ningún tercero**. Datos mínimos (identificación, contacto, cita, motivo de derivación), cifrados en reposo y tránsito. Cada evento del ciclo (citación, confirmación, liberación, rescate, egreso) queda en una **bitácora inmutable con fecha, canal y evidencia**: la trazabilidad que la Contraloría exigió y que hoy no existe.

**Capa 2 — Inteligencia.** Cuatro modelos:
- **Predicción de inasistencia por cita** (gradient boosting sobre historial de asistencia, antigüedad de la cita, distancia, día/hora, edad): probado en Chile por el CMM de la U. de Chile en tres hospitales. Alimenta la intensidad de confirmación y el sobrecupo selectivo.
- **Score dinámico de priorización** por paciente: combina reglas clínicas configurables por el centro (edad, diagnóstico/sospecha, tiempo ya esperado, GES) con el riesgo estimado — **explicable**: cada posición en la cola muestra sus razones, y el orden final siempre lo valida un profesional. La IA propone; el clínico dispone.
- **Filtro de pertinencia de interconsultas**: un modelo de lenguaje lee la SIC contra los protocolos de derivación del propio servicio y la clasifica (pertinente / falta información / no pertinente con sugerencia de manejo en APS) **como apoyo al contralor humano**, no en su reemplazo.
- **Depuración y deduplicación** (record linkage probabilístico): detecta solicitudes duplicadas, registros inconsistentes y contactos inválidos, y genera la lista de verificación para el personal.

**Capa 3 — Acción conversacional.** Agentes con modelo de lenguaje en los canales que los chilenos sí usan: **WhatsApp** (API oficial de Meta vía partner autorizado: 98% de entrega y 85–90% de respuesta demostrados en salud chilena) y **llamada telefónica automática con voz natural** para adultos mayores y quien no responde el chat — el canal que más reduce ausentismo según la evidencia chilena (de 20,3% a 12,5%). El agente confirma, reagenda, resuelve dudas de preparación, verifica datos de contacto y, cuando una hora se libera, **ofrece el cupo en minutos, uno a uno y en orden de prioridad, a la cola de reemplazo** — pacientes que aceptaron adelantar su hora, personas que pidieron hora sin cupo, o la lista de espera formal del establecimiento. Si el centro no tiene esa cola, el sistema la construye desde la primera semana.

**Capa 4 — Gestión y simulación.** Panel para el gestor con horas recuperadas (en horas y en pesos), inasistencia por profesional/día/especialidad, y estado de la lista. Incluye el **simulador de escenarios** (modelo de simulación de eventos discretos sobre los datos reales del centro): "¿qué pasa con la mediana de espera si abro 4 horas de oftalmología los martes, o si el no-show baja al 8%?" — la herramienta de decisión que hoy ningún gestor de la red tiene sobre su propia lista.

---

## 4. Los tres motores, vertical por vertical

### 4.1 VÍA Flujo — descomprimir la lista (fase 1, el punto de entrada)

**Qué hace, en ciclo cerrado:** (1) predice qué citas están en riesgo de perderse; (2) confirma con intensidad proporcional al riesgo — WhatsApp primero, llamada de voz si no responde, con anticipación escalonada; (3) al detectar una liberación, **rescata el cupo en tiempo real** contra la cola priorizada; (4) aplica **sobrecupo selectivo** solo en los bloques donde el modelo predice ausencias con alta confianza (la práctica de las aerolíneas, con validación del centro); (5) filtra pertinencia y depura la lista para que no siga entrando ruido; (6) reporta todo en la bitácora auditable.

**Resultado esperado y medible** (conservador, sobre la evidencia chilena): reducir el no-show del rango 15–20% al rango 5–10% y rellenar la mayoría de las horas liberadas. Para un centro mediano de 1.500 citas/mes (12–15% de inasistencia, ticket $25.000–$35.000) son **$2 a $3 millones mensuales recuperados** de los $4,5–7 que hoy pierde; para un CESFAM, miles de horas clínicas al año que hoy se rinden como perdidas.

### 4.2 VÍA Prevención — que menos gente llegue a la fila

Sobre los datos del propio centro, el **radar de crónicos**: identifica pacientes hipertensos, diabéticos, EPOC sin control dentro del plazo de su protocolo, los prioriza por riesgo de descompensación y el agente conversacional los trae proactivamente a control — usando precisamente las **horas rescatadas** del motor de flujo. Cada descompensación evitada es una interconsulta y una urgencia menos. El mismo canal ejecuta campañas preventivas medibles (PAP, mamografías, vacunación: en Chiloé la contactabilidad con IA aumentó 175% los exámenes de PAP). Y la **orientación conversacional de demanda** ayuda al paciente a llegar al nivel correcto (¿SAPU, CESFAM o urgencia?), descargando demanda mal dirigida.

### 4.3 VÍA Continuidad — seguimiento y precisión mientras se espera y después

La espera de 236 días no tiene por qué ser tiempo muerto ni ciego: el **score dinámico** re-prioriza la cola cuando el riesgo del paciente cambia (síntomas reportados por el propio canal conversacional, tiempo acumulado, edad), con explicación visible y validación clínica — "medicina de precisión operacional": el orden de atención se ajusta a la persona, no al número de folio. Antes de una cirugía, el agente ejecuta la **lista de preparación preoperatoria** (ayuno, exámenes, suspensión de fármacos, acompañante): cada suspensión evitada es un pabellón que no se pierde. Después de la atención, seguimiento de adherencia y **contrarreferencia cerrada** hacia la APS, para que el paciente no vuelva a entrar a la lista por abandono de tratamiento.

**La secuencia importa:** Flujo genera los datos y la caja; Prevención y Continuidad se entrenan con esos datos y se venden sobre la misma base instalada. Por eso la fase 1 es el motor de flujo — no porque la ambición sea chica, sino porque así se construye la grande.

---

## 5. Ética, datos y cumplimiento — diseñado para un dominio sensible

- **Datos mínimos y finalidad única**: identificación, contacto, cita y motivo de derivación; sin ficha clínica completa. El centro es responsable del tratamiento; VÍA Salud, encargado — conforme a la **Ley 19.628** y preparado para la **Ley 21.719** (vigente diciembre 2026), tratando el estado "en lista de espera" como dato sensible de salud.
- **Humano en el circuito, siempre**: la IA predice, propone y redacta; las decisiones con efecto clínico (orden final de la cola, pertinencia, sobrecupo) las valida un profesional. Ninguna decisión clínica autónoma.
- **Explicabilidad**: cada priorización muestra sus factores; nada de cajas negras ordenando pacientes.
- **Equidad activa**: el doble canal con llamada de voz existe precisamente para no dejar fuera al adulto mayor sin smartphone — el grupo que concentra la espera y la mortalidad en lista.
- **Auditabilidad**: la bitácora inmutable convierte en verificable lo que la Contraloría encontró inverificable (egresos sin respaldo). Es una funcionalidad de confianza pública, no solo de gestión.

---

## 6. Por qué es totalmente creíble: cada pieza ya está demostrada

La innovación de VÍA Salud no es apostar a tecnología inexistente: es **integrar en un solo ciclo componentes que ya probaron funcionar por separado** — la integración es lo que nadie ha hecho.

| Componente de VÍA Salud | Evidencia que lo respalda |
|---|---|
| Confirmación conversacional por WhatsApp | Cero.ai en Chile: 98% de entrega, 85–90% de respuesta, +2 millones de citas/mes coordinadas |
| Llamada telefónica para reducir ausentismo | CMM U. de Chile (3 hospitales): ausentismo de 20,3% → 12,5% |
| IA aplicada a inasistencia en APS chilena | CESFAM Salvador Bustos (Ñuñoa, 2026): −37% en inasistencias priorizadas; SS Chiloé: 1.686 horas recuperadas y +175% PAP |
| Recordatorios inteligentes a escala | Pilotos difundidos por el Minsal: hasta −45% de citas perdidas |
| Predicción de no-show con ML | Modelo del CMM U. de Chile probado en hospitales públicos chilenos |
| Rescate de cupos contra lista | CGS SmartCall en Chile: +400.000 horas gestionadas en 6 meses (segmento enterprise) |
| Sobrecupo selectivo por predicción | Práctica estándar en industrias de reserva; aplicada con validación del centro |
| Pertinencia de derivaciones como cuello real | Estudios chilenos (Sótero del Río, otorrino) y 91% de profesionales APS pidiendo apoyo en derivación |
| Interoperabilidad FHIR | Estándar impulsado por el propio Minsal en la red |
| Necesidad de trazabilidad auditable | Auditorías de la Contraloría 2024–2025 sobre egresos irregulares |

**Y el hueco de mercado es real:** Cero.ai domina el hospital de alta complejidad (venta enterprise); Rayen Salud empaqueta su IA dentro de sus contratos SIDRA municipales; AgendaPro/Reservo/Dentalink venden agenda con recordatorios pasivos. **Nadie integra predicción + conversación + rescate + priorización explicable + auditabilidad para el centro mediano y la salud municipal de regiones.** Ese es el espacio de VÍA Salud, partiendo desde el Biobío.

---

## 7. Hoja de ruta, negocio y métricas

**Fase 1 (meses 1–12) — motor de flujo en el Biobío.** MVP en 90 días: confirmación WhatsApp + rescate de cupos + panel + bitácora, operando en 2 centros piloto del Gran Concepción; versión 2 (meses 4–6) agrega la llamada de voz y la predicción de no-show entrenada con los datos de los pilotos. Meta año 1: 8–12 centros privados medianos activos (suscripción $150.000–$350.000/mes según tamaño, implementación $350.000) y un piloto municipal firmado; equilibrio operativo entre 4 y 6 centros. **Escenario piso: con 5 centros el negocio se sostiene solo.**

**Fase 2 (año 2) — Prevención + Continuidad sobre la base instalada.** Radar de crónicos y preparación preoperatoria como módulos; convenios con salud municipal (pilotos de 3 meses con reporte de rendición) y primer Servicio de Salud regional. **Fase 3 (año 3) — plataforma de red**: simulador de escenarios para gestores, filtro de pertinencia en convenio con la red, expansión a otras regiones.

**Métricas norte (se publican a cada cliente, cada mes):** horas recuperadas (y su valor en pesos), tasa de no-show antes/después, tiempo mediano de espera de la cola local, cupos rescatados en <24 horas, y controles de crónicos al día. El producto se renueva porque el número es visible — no por contrato.

**Impacto en empleo (espíritu del fondo):** empresa tecnológica formal en el Biobío, dedicación completa del fundador, 1 contratación el año 1 y 2–3 el año 2 — más la capacidad clínica que cada hora rescatada devuelve al sistema.

---

## 8. Mapa a la postulación Sercotec (Capital Semilla Modo Empleo, Jóvenes 2026)

La postulación ya preparada (formulario de 7 secciones, presupuesto de $3.000.000 y guion de video) **sigue siendo válida tal cual**: lo que financia el Capital Semilla es exactamente la fase 1 (equipos $1.400.000 + plataforma tecnológica del primer año $1.200.000 + marketing y formalización $400.000). Solo cambian los textos de identidad, que quedan así:

**1.2 Nombre del proyecto** (≤200 caracteres):
> VÍA Salud: plataforma de inteligencia artificial que previene, descomprime y da seguimiento a las listas de espera — confirma horas por WhatsApp y teléfono y rescata en minutos cada cupo que se libera.

**1.3 Descripción — párrafo de apertura:**
> En Chile 2,4 millones de personas esperan atención mientras el sistema pierde más de un millón de horas médicas al año por inasistencias. VÍA Salud es una plataforma con tres motores de IA: predice qué citas se van a perder y las confirma por WhatsApp y llamada automática; rescata cada hora liberada ofreciéndola en minutos a una cola priorizada con criterio clínico explicable; y sobre los mismos datos previene (trae a control a los crónicos antes de que se descompensen) y da seguimiento (preparación preoperatoria, adherencia). Parte en el Biobío con centros médicos y dentales medianos y salud municipal, con resultados auditables mes a mes.

**Cierre del video pitch (reemplaza al actual, mismo largo):**
> "Hoy parto rescatando horas perdidas; con esos mismos datos, mañana la lista se ordena por riesgo y no por orden de llegada. Con el Capital Semilla formalizo mi empresa, construyo la plataforma y contrato a mi primera persona aquí en la región. Menos horas perdidas, menos espera, más salud. Esto es VÍA Salud."

Reglas que no cambian: enviar entre el **01 y el 02/09** (empates se resuelven por orden de envío), video ≤90 s con el postulante en cámara y sin música, curso Canvas de Sercotec terminado antes de enviar, presupuesto dentro de topes con cotizaciones línea a línea.

---

## 9. Fuentes de las cifras

Glosa 06 Minsal (IV trim. 2025 y I trim. 2026): 2.419.098 personas en espera, medianas 236/259 días, 73.690 egresos por inasistencia, duplicados y errores de registro · Tesis U. de Chile 2022: 15,6% NSP sobre 7,57 millones de consultas, ~$14.872 millones de pérdida · The Clinic (09/2025): 16.018 fallecidos en espera 1S2025 · CMM U. de Chile: predicción de no-show y llamadas 20,3%→12,5% · Trendtic/Municipalidad de Ñuñoa (2026): −37% inasistencias priorizadas · Prosalud (Chiloé): 1.686 horas y +175% PAP · DF/Salud Digital: Cero.ai 98% entrega, 2M citas/mes · Diario Estrategia: CGS 400.000 horas en 6 meses · CNEP: 1,5 millones de atenciones adicionales con estrategia digital · BCN/Contraloría: 39.082 y 49.539 egresos irregulares · TVU/Diario Concepción: 235.000 solicitudes Biobío, 145.600 provincia de Concepción · Duplos (2026): 21.000 horas Hospital de Los Ángeles · Revista Médica de Chile: no-pertinencia en derivaciones de otorrino · Sercotec: bases y montos del Capital Semilla Modo Empleo 2026. (URLs completas en el documento "fuentes" del dossier del repositorio.)
