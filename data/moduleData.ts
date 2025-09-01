import { Module } from '../types';

export const modules: Module[] = [
  {
    id: 'log-func-01',
    title: 'La Función Logarítmica',
    description: 'Aprende las propiedades y aplicaciones de los logaritmos.',
    activities: [
      {
        id: 'act-01',
        title: '¿Qué es un Logaritmo?',
        type: 'explanation',
        topic: 'definición de logaritmo',
        content: `Un logaritmo es básicamente la operación inversa de la exponenciación.
      
Cuando vemos una expresión como log_b(x) = y, nos estamos preguntando: "¿A qué potencia 'y' debo elevar la base 'b' para obtener el número 'x'?"

Por ejemplo, en log₂(8) = 3, la base es 2, el número es 8. La pregunta es: ¿2 elevado a qué potencia da 8? La respuesta es 3, porque 2³ = 8.

Los logaritmos son increíblemente útiles para manejar números muy grandes o muy pequeños, y aparecen en campos como la química (escala de pH), sismología (escala de Richter) y finanzas (interés compuesto).`,
      },
      {
        id: 'act-02',
        title: 'Prueba Rápida: Conceptos Básicos',
        type: 'quiz',
        topic: 'definición y conversión de logaritmos',
        content: 'Demuestra que entendiste lo básico de los logaritmos.',
        questions: [
          {
            id: 'q-01',
            question: '¿Cuál es la forma exponencial equivalente a log₃(9) = 2?',
            options: [
              { text: '2³ = 9', isCorrect: false },
              { text: '9³ = 2', isCorrect: false },
              { text: '3² = 9', isCorrect: true },
              { text: '3⁹ = 2', isCorrect: false },
            ],
            explanation: 'La base del logaritmo (3) se convierte en la base de la potencia. El resultado del logaritmo (2) es el exponente, y el argumento (9) es el resultado de la potencia.',
          },
        ],
      },
      {
        id: 'act-03',
        title: 'Propiedades de los Logaritmos',
        type: 'explanation',
        topic: 'propiedades de los logaritmos (producto, cociente, potencia)',
        content: `Existen 3 propiedades principales que simplifican el trabajo con logaritmos:

1.  **Logaritmo de un Producto:** El logaritmo de una multiplicación es la suma de los logaritmos.
    log_b(M * N) = log_b(M) + log_b(N)

2.  **Logaritmo de un Cociente:** El logaritmo de una división es la resta de los logaritmos.
    log_b(M / N) = log_b(M) - log_b(N)
    
3.  **Logaritmo de una Potencia:** El logaritmo de un número elevado a una potencia es el exponente multiplicado por el logaritmo del número.
    log_b(M^p) = p * log_b(M)
    
Estas reglas son fundamentales para resolver ecuaciones logarítmicas complejas.`,
      },
      {
        id: 'act-04',
        title: 'Prueba Rápida: Aplicando Propiedades',
        type: 'quiz',
        topic: 'simplificación de logaritmos usando propiedades',
        content: 'Usa las propiedades de los logaritmos para resolver los siguientes ejercicios.',
        questions: [
          {
            id: 'q-02',
            question: 'Usando las propiedades, ¿a qué es igual log(5) + log(2)?',
            options: [
              { text: 'log(7)', isCorrect: false },
              { text: 'log(10)', isCorrect: true },
              { text: 'log(2.5)', isCorrect: false },
              { text: 'log(3)', isCorrect: false },
            ],
            explanation: 'La suma de logaritmos es igual al logaritmo del producto. Por lo tanto, log(5) + log(2) = log(5 * 2) = log(10). Como el logaritmo base 10 de 10 es 1, la respuesta simplificada es 1, pero log(10) es la aplicación directa de la propiedad.',
          },
          {
            id: 'q-03',
            question: 'Expresa 2 * log(x) como un único logaritmo.',
            options: [
              { text: 'log(2x)', isCorrect: false },
              { text: 'log(x+2)', isCorrect: false },
              { text: 'log(x²)', isCorrect: true },
              { text: 'log(2/x)', isCorrect: false },
            ],
            explanation: 'Según la propiedad del logaritmo de una potencia, un número que multiplica a un logaritmo puede pasar a ser el exponente de su argumento. Entonces, 2 * log(x) = log(x²).',
          }
        ],
      },
      {
        id: 'act-05',
        title: 'Bases Comunes: 10 y "e"',
        type: 'explanation',
        topic: 'logaritmos comunes (base 10) y naturales (base e)',
        content: `Aunque un logaritmo puede tener cualquier base positiva (distinta de 1), hay dos bases que son tan comunes que tienen su propia notación:

1.  **Logaritmo Común (Base 10):** Se escribe como **log(x)**, sin indicar la base. Se asume que la base es 10. Es muy útil en ciencia e ingeniería porque nuestro sistema numérico es de base 10.
    Ejemplo: log(100) = 2, porque 10² = 100.

2.  **Logaritmo Natural (Base e):** Se escribe como **ln(x)**. Su base es el número irracional **e ≈ 2.71828...**. Este logaritmo es fundamental en cálculo, finanzas y ciencias naturales, ya que describe el crecimiento y decaimiento continuo.
    Ejemplo: ln(e) = 1, porque e¹ = e.`,
      },
      {
        id: 'act-06',
        title: 'Prueba Rápida: Bases 10 y "e"',
        type: 'quiz',
        topic: 'evaluación de logaritmos comunes y naturales',
        content: 'Calcula el valor de los siguientes logaritmos comunes y naturales.',
        questions: [
          {
            id: 'q-04',
            question: '¿Cuál es el valor de log(1000)?',
            options: [
              { text: '100', isCorrect: false },
              { text: '3', isCorrect: true },
              { text: '10', isCorrect: false },
              { text: '0.1', isCorrect: false },
            ],
            explanation: 'El logaritmo común (base 10) de 1000 se pregunta: ¿10 elevado a qué potencia da 1000? La respuesta es 3, ya que 10³ = 1000.',
          },
          {
            id: 'q-05',
            question: '¿A qué es igual ln(1)?',
            options: [
              { text: 'e', isCorrect: false },
              { text: '1', isCorrect: false },
              { text: '0', isCorrect: true },
              { text: 'No existe', isCorrect: false },
            ],
            explanation: 'Cualquier logaritmo con argumento 1 es igual a 0, porque cualquier base (b) elevada a la potencia 0 es igual a 1 (b⁰ = 1).',
          },
          {
            id: 'q-06',
            question: '¿A qué es igual log(0.01)?',
            options: [
              { text: '2', isCorrect: false },
              { text: '-2', isCorrect: true },
              { text: '0.1', isCorrect: false },
              { text: '100', isCorrect: false },
            ],
            explanation: 'Buscamos el exponente al que debemos elevar 10 para obtener 0.01. Como 0.01 = 1/100 = 1/10² = 10⁻², la respuesta es -2.',
          },
        ],
      },
      {
        id: 'act-07',
        title: 'Cambio de Base',
        type: 'explanation',
        topic: 'fórmula de cambio de base para logaritmos',
        content: `¿Qué pasa si necesitas calcular un logaritmo con una base que no está en tu calculadora (como log₃(7))? Para eso usamos la fórmula de cambio de base.

Puedes convertir un logaritmo de cualquier base 'b' a una nueva base 'c' (generalmente 10 o 'e') de la siguiente manera:

**log_b(x) = log_c(x) / log_c(b)**

Por ejemplo, para calcular log₃(7) usando una calculadora estándar:
log₃(7) = log(7) / log(3) ≈ 0.845 / 0.477 ≈ 1.77

Esta fórmula es una herramienta poderosa para evaluar cualquier logaritmo.`
      },
      {
        id: 'act-08',
        title: 'Prueba Rápida: Cambio de Base',
        type: 'quiz',
        topic: 'aplicación de la fórmula de cambio de base',
        content: 'Usa la fórmula de cambio de base para reescribir y evaluar logaritmos.',
        questions: [
          {
            id: 'q-07',
            question: '¿Cómo se expresaría log₅(15) usando logaritmos naturales (ln)?',
            options: [
              { text: 'ln(5) / ln(15)', isCorrect: false },
              { text: 'ln(15) / ln(5)', isCorrect: true },
              { text: 'ln(15 - 5)', isCorrect: false },
              { text: 'ln(15 * 5)', isCorrect: false },
            ],
            explanation: 'La fórmula es log_b(x) = log_c(x) / log_c(b). En este caso, x=15, b=5 y la nueva base c es "e". Por lo tanto, es ln(15) / ln(5).',
          },
          {
            id: 'q-08',
            question: 'Calcula el valor de log₂(16) usando el cambio de base a base 10.',
            options: [
              { text: '2', isCorrect: false },
              { text: '8', isCorrect: false },
              { text: '4', isCorrect: true },
              { text: '1.2', isCorrect: false },
            ],
            explanation: 'Aplicando el cambio de base: log₂(16) = log(16) / log(2). Aunque se puede calcular con calculadora, sabemos que 2⁴ = 16, por lo que el resultado debe ser 4.',
          },
        ],
      },
      {
          id: 'act-09',
          title: 'Resolviendo Ecuaciones Logarítmicas',
          type: 'explanation',
          topic: 'técnicas para resolver ecuaciones logarítmicas',
          content: `Resolver ecuaciones con logaritmos a menudo implica usar la definición de logaritmo o sus propiedades para despejar la incógnita 'x'.

Estrategias comunes:

1.  **Convertir a forma exponencial:** Si tienes log_b(expresión) = y, puedes reescribirlo como expresión = b^y.
    Ejemplo: log₃(x-1) = 2  →  x-1 = 3²  →  x-1 = 9  →  x = 10.

2.  **Usar la propiedad de igualdad:** Si log_b(M) = log_b(N), entonces M = N. Para esto, primero debes usar las propiedades para combinar los logaritmos en un solo término a cada lado.
    Ejemplo: log(x) + log(3) = log(12)  →  log(3x) = log(12)  →  3x = 12  →  x = 4.

**¡Importante!** Siempre debes verificar tu solución en la ecuación original, ya que el argumento de un logaritmo no puede ser negativo ni cero.`
      },
      {
        id: 'act-10',
        title: 'Prueba Final: Ecuaciones Logarítmicas',
        type: 'quiz',
        topic: 'resolución de ecuaciones logarítmicas',
        content: 'Aplica todo lo aprendido para resolver las siguientes ecuaciones.',
        questions: [
          {
            id: 'q-09',
            question: 'Resuelve para x: log₄(x) = 3',
            options: [
              { text: 'x = 12', isCorrect: false },
              { text: 'x = 81', isCorrect: false },
              { text: 'x = 64', isCorrect: true },
              { text: 'x = 1.33', isCorrect: false },
            ],
            explanation: 'Convirtiendo a forma exponencial: si log₄(x) = 3, entonces x = 4³. Calculando 4 * 4 * 4, obtenemos 64.',
          },
          {
            id: 'q-10',
            question: 'Encuentra el valor de x en: log(2x) - log(5) = log(4)',
            options: [
              { text: 'x = 10', isCorrect: true },
              { text: 'x = 20', isCorrect: false },
              { text: 'x = 2.5', isCorrect: false },
              { text: 'x = 5', isCorrect: false },
            ],
            explanation: 'Usando la propiedad del cociente: log(2x/5) = log(4). Por la propiedad de igualdad, 2x/5 = 4. Despejando x: 2x = 20, por lo tanto x = 10.',
          },
          {
            id: 'q-11',
            question: 'Resuelve para x: ln(x + 1) = 0',
            options: [
              { text: 'x = 1', isCorrect: false },
              { text: 'x = -1', isCorrect: false },
              { text: 'x = e', isCorrect: false },
              { text: 'x = 0', isCorrect: true },
            ],
            explanation: 'Convirtiendo a forma exponencial (recordando que ln tiene base e): x + 1 = e⁰. Como cualquier número elevado a 0 es 1, tenemos x + 1 = 1, lo que significa que x = 0.',
          },
          {
            id: 'q-12',
            question: '¿Cuál es la solución de 3 * log₂(x) = 6?',
            options: [
              { text: 'x = 2', isCorrect: false },
              { text: 'x = 4', isCorrect: true },
              { text: 'x = 8', isCorrect: false },
              { text: 'x = 1', isCorrect: false },
            ],
            explanation: 'Primero, divide ambos lados por 3: log₂(x) = 2. Luego, convierte a forma exponencial: x = 2². Por lo tanto, x = 4.',
          },
          {
            id: 'q-13',
            question: 'Resuelve la ecuación log₃(2x - 1) = 2.',
            options: [
              { text: 'x = 9', isCorrect: false },
              { text: 'x = 3.5', isCorrect: false },
              { text: 'x = 5', isCorrect: true },
              { text: 'x = 2', isCorrect: false },
            ],
            explanation: 'Convierte a forma exponencial: 2x - 1 = 3². Esto simplifica a 2x - 1 = 9. Sumando 1 a ambos lados: 2x = 10. Finalmente, dividiendo por 2, obtenemos x = 5.',
          },
          {
              id: 'q-14',
              question: 'Usando propiedades, simplifica: log₂(40) - log₂(5)',
              options: [
                { text: 'log₂(35)', isCorrect: false },
                { text: '3', isCorrect: true },
                { text: 'log₂(8)', isCorrect: false },
                { text: '8', isCorrect: false },
              ],
              explanation: 'La resta de logaritmos de igual base es el logaritmo del cociente: log₂(40/5) = log₂(8). Ahora nos preguntamos, ¿2 a qué potencia es 8? La respuesta es 3.',
          },
          {
              id: 'q-15',
              question: 'Si log(a) = 2 y log(b) = 3, ¿cuál es el valor de log(a*b)?',
              options: [
                  { text: '6', isCorrect: false },
                  { text: '5', isCorrect: true },
                  { text: '100000', isCorrect: false },
                  { text: 'No se puede determinar', isCorrect: false },
              ],
              explanation: 'Usando la propiedad del producto, log(a*b) = log(a) + log(b). Sustituyendo los valores dados: 2 + 3 = 5.',
          }
        ],
      },
    ],
  },
  {
    id: 'paes-log-01',
    title: 'Ensayo Tipo PAES: Logaritmos',
    description: '20 ejercicios de práctica para prepararte para la prueba.',
    activities: [
      {
        id: 'paes-quiz-full',
        title: 'Prueba Completa de Logaritmos',
        type: 'quiz',
        topic: 'Prueba PAES de logaritmos',
        content: 'Responde las siguientes 20 preguntas que cubren todo el contenido de logaritmos, con un formato similar al de la prueba PAES.',
        questions: [
          // 20 questions will be added here
          {
            id: 'paes-q01',
            question: 'El valor de la expresión log₂(32) + log₃(81) - log₅(25) es:',
            options: [
                { text: '5', isCorrect: false },
                { text: '6', isCorrect: false },
                { text: '7', isCorrect: true },
                { text: '8', isCorrect: false },
                { text: '9', isCorrect: false },
            ],
            explanation: 'Se calcula cada logaritmo por separado: log₂(32) = 5 (porque 2⁵=32), log₃(81) = 4 (porque 3⁴=81), y log₅(25) = 2 (porque 5²=25). Luego se resuelve la operación: 5 + 4 - 2 = 7.'
          },
          {
            id: 'paes-q02',
            question: 'Si log(x) = 2, ¿cuál es el valor de log(100x)?',
            options: [
                { text: '200', isCorrect: false },
                { text: '102', isCorrect: false },
                { text: '20', isCorrect: false },
                { text: '4', isCorrect: true },
                { text: '2', isCorrect: false },
            ],
            explanation: 'Usando la propiedad del producto: log(100x) = log(100) + log(x). Sabemos que log(100) = 2 (porque 10²=100) y el enunciado nos dice que log(x) = 2. Entonces, 2 + 2 = 4.'
          },
          {
            id: 'paes-q03',
            question: 'La expresión 3log(a) - 2log(b) es equivalente a:',
            options: [
                { text: 'log(3a - 2b)', isCorrect: false },
                { text: 'log(a³ / b²)', isCorrect: true },
                { text: 'log((a/b)⁶)', isCorrect: false },
                { text: 'log(a³b²)', isCorrect: false },
                { text: 'log(6ab)', isCorrect: false },
            ],
            explanation: 'Por la propiedad de la potencia, 3log(a) = log(a³) y 2log(b) = log(b²). Luego, por la propiedad del cociente, log(a³) - log(b²) = log(a³ / b²).'
          },
          {
            id: 'paes-q04',
            question: '¿Cuál es la solución de la ecuación log₃(x + 5) = 2?',
            options: [
                { text: 'x = 1', isCorrect: false },
                { text: 'x = 3', isCorrect: false },
                { text: 'x = 4', isCorrect: true },
                { text: 'x = 9', isCorrect: false },
                { text: 'x = 11', isCorrect: false },
            ],
            explanation: 'Convirtiendo la ecuación a su forma exponencial: x + 5 = 3². Esto es x + 5 = 9. Despejando x, obtenemos x = 4.'
          },
          {
            id: 'paes-q05',
            question: 'Si log_b(2) = 0.3 y log_b(3) = 0.4, ¿cuál es el valor de log_b(6)?',
            options: [
                { text: '0.12', isCorrect: false },
                { text: '1.2', isCorrect: false },
                { text: '0.7', isCorrect: true },
                { text: '0.1', isCorrect: false },
                { text: 'No se puede determinar', isCorrect: false },
            ],
            explanation: 'Usamos la propiedad del producto: log_b(6) = log_b(2 * 3) = log_b(2) + log_b(3). Reemplazando los valores dados: 0.3 + 0.4 = 0.7.'
          },
          {
            id: 'paes-q06',
            question: 'El valor de log_4(1/64) es:',
            options: [
                { text: '-3', isCorrect: true },
                { text: '3', isCorrect: false },
                { text: '-4', isCorrect: false },
                { text: '1/3', isCorrect: false },
                { text: '16', isCorrect: false },
            ],
            explanation: 'Nos preguntamos a qué potencia debemos elevar 4 para obtener 1/64. Sabemos que 4³ = 64. Por la propiedad de los exponentes negativos, 4⁻³ = 1/4³ = 1/64. Por lo tanto, el resultado es -3.'
          },
          {
            id: 'paes-q07',
            question: '¿Cuál de las siguientes afirmaciones es FALSA?',
            options: [
                { text: 'log₅(1) = 0', isCorrect: false },
                { text: 'log(a) + log(b) = log(ab)', isCorrect: false },
                { text: 'log₇(7) = 1', isCorrect: false },
                { text: 'log(a) - log(b) = log(a/b)', isCorrect: false },
                { text: 'log(a+b) = log(a) + log(b)', isCorrect: true },
            ],
            explanation: 'El logaritmo de una suma NO es igual a la suma de los logaritmos. Esta es una confusión común con la propiedad del producto. Todas las demás afirmaciones son propiedades verdaderas de los logaritmos.'
          },
          {
            id: 'paes-q08',
            question: 'La solución de la ecuación ln(x) = 3 es:',
            options: [
                { text: 'x = 3e', isCorrect: false },
                { text: 'x = e/3', isCorrect: false },
                { text: 'x = 10³', isCorrect: false },
                { text: 'x = 3/e', isCorrect: false },
                { text: 'x = e³', isCorrect: true },
            ],
            explanation: 'El logaritmo natural (ln) tiene base e. Al convertir la ecuación a su forma exponencial, obtenemos x = e³.'
          },
          {
            id: 'paes-q09',
            question: '¿Cuál es el valor de x en la ecuación log(x) + log(5) = 2?',
            options: [
                { text: '10', isCorrect: false },
                { text: '15', isCorrect: false },
                { text: '20', isCorrect: true },
                { text: '50', isCorrect: false },
                { text: '100', isCorrect: false },
            ],
            explanation: 'Usando la propiedad del producto: log(5x) = 2. Recordando que log tiene base 10, convertimos a forma exponencial: 5x = 10². Esto es 5x = 100. Dividiendo por 5, obtenemos x = 20.'
          },
          {
            id: 'paes-q10',
            question: 'La expresión log₄(9) se puede escribir usando el cambio de base a base 10 como:',
            options: [
                { text: 'log(4) / log(9)', isCorrect: false },
                { text: 'log(9) / log(4)', isCorrect: true },
                { text: 'log(9 - 4)', isCorrect: false },
                { text: 'log(9 * 4)', isCorrect: false },
                { text: 'log(9) - log(4)', isCorrect: false },
            ],
            explanation: 'La fórmula de cambio de base es log_b(x) = log_c(x) / log_c(b). En este caso, x=9, b=4 y la nueva base c es 10. Por lo tanto, la expresión correcta es log(9) / log(4).'
          },
          {
            id: 'paes-q11',
            question: 'Si f(x) = log₂(x), ¿cuál es el valor de f(16) - f(4)?',
            options: [
                { text: '1', isCorrect: false },
                { text: '2', isCorrect: true },
                { text: '3', isCorrect: false },
                { text: '4', isCorrect: false },
                { text: '12', isCorrect: false },
            ],
            explanation: 'Calculamos cada valor: f(16) = log₂(16) = 4, y f(4) = log₂(4) = 2. La resta es 4 - 2 = 2. Alternativamente, usando propiedades: log₂(16) - log₂(4) = log₂(16/4) = log₂(4) = 2.'
          },
          {
            id: 'paes-q12',
            question: '¿Para qué valor de x se cumple que log_x(49) = 2?',
            options: [
                { text: '2', isCorrect: false },
                { text: '5', isCorrect: false },
                { text: '7', isCorrect: true },
                { text: '24.5', isCorrect: false },
                { text: '98', isCorrect: false },
            ],
            explanation: 'En forma exponencial, la ecuación es x² = 49. La solución positiva para x es √49 = 7. La base de un logaritmo debe ser positiva y distinta de 1.'
          },
          {
            id: 'paes-q13',
            question: 'Si log₃(m) = 2, entonces log₃(9m) es igual a:',
            options: [
                { text: '2', isCorrect: false },
                { text: '3', isCorrect: false },
                { text: '4', isCorrect: true },
                { text: '6', isCorrect: false },
                { text: '18', isCorrect: false },
            ],
            explanation: 'Aplicamos la propiedad del producto: log₃(9m) = log₃(9) + log₃(m). Sabemos que log₃(9) = 2 y el enunciado dice que log₃(m) = 2. Por lo tanto, el resultado es 2 + 2 = 4.'
          },
          {
            id: 'paes-q14',
            question: 'El orden creciente de los números p = log₂(3), q = log₂(5), r = log₂(2) es:',
            options: [
                { text: 'p, q, r', isCorrect: false },
                { text: 'q, p, r', isCorrect: false },
                { text: 'r, q, p', isCorrect: false },
                { text: 'r, p, q', isCorrect: true },
                { text: 'p, r, q', isCorrect: false },
            ],
            explanation: 'Como la base del logaritmo (2) es mayor que 1, la función log₂(x) es creciente. Esto significa que a mayor argumento, mayor es el valor del logaritmo. Como 2 < 3 < 5, entonces log₂(2) < log₂(3) < log₂(5). El valor de r = log₂(2) = 1. Por lo tanto, el orden es r, p, q.'
          },
          {
            id: 'paes-q15',
            question: '¿Cuál es el dominio de la función f(x) = log(x - 3)?',
            options: [
                { text: 'Todos los números reales', isCorrect: false },
                { text: 'x > 0', isCorrect: false },
                { text: 'x < 3', isCorrect: false },
                { text: 'x > 3', isCorrect: true },
                { text: 'x ≠ 3', isCorrect: false },
            ],
            explanation: 'El argumento de una función logarítmica debe ser estrictamente positivo. Por lo tanto, necesitamos que x - 3 > 0. Resolviendo la inecuación, obtenemos x > 3. El dominio son todos los reales mayores que 3.'
          },
          {
            id: 'paes-q16',
            question: 'El valor de la expresión log₅(√5) es:',
            options: [
                { text: '1/2', isCorrect: true },
                { text: '2', isCorrect: false },
                { text: '-1/2', isCorrect: false },
                { text: '5', isCorrect: false },
                { text: '25', isCorrect: false },
            ],
            explanation: 'Recordemos que √5 es lo mismo que 5^(1/2). Usando la propiedad de la potencia del logaritmo: log₅(5^(1/2)) = (1/2) * log₅(5). Como log₅(5) = 1, el resultado es (1/2) * 1 = 1/2.'
          },
          {
            id: 'paes-q17',
            question: 'Si log₂(x² - 3) = log₂(x - 1), entonces el valor de x es:',
            options: [
                { text: '2', isCorrect: false },
                { text: '-1', isCorrect: false },
                { text: '2 y -1', isCorrect: false },
                { text: 'Solamente -1', isCorrect: false },
                { text: 'Solamente 2', isCorrect: true },
            ],
            explanation: 'Si los logaritmos son iguales y tienen la misma base, sus argumentos deben ser iguales: x² - 3 = x - 1. Reordenando, obtenemos la ecuación cuadrática x² - x - 2 = 0. Factorizando: (x - 2)(x + 1) = 0. Las posibles soluciones son x = 2 y x = -1. Debemos verificar si son válidas en la ecuación original. Si x = -1, el argumento (x - 1) sería -2, lo cual es inválido (el argumento no puede ser negativo). Si x = 2, los argumentos son (2² - 3) = 1 y (2 - 1) = 1, ambos válidos. Por lo tanto, la única solución es x = 2.'
          },
          {
            id: 'paes-q18',
            question: 'La escala de Richter mide la magnitud M de un sismo con la fórmula M = log(A/A₀), donde A es la amplitud registrada. Un sismo de magnitud 7 es ¿cuántas veces más intenso (en amplitud) que uno de magnitud 5?',
            options: [
                { text: '2 veces', isCorrect: false },
                { text: '1.4 veces', isCorrect: false },
                { text: '20 veces', isCorrect: false },
                { text: '100 veces', isCorrect: true },
                { text: '1000 veces', isCorrect: false },
            ],
            explanation: 'Para M=7, 7=log(A₇/A₀) => A₇ = A₀ * 10⁷. Para M=5, 5=log(A₅/A₀) => A₅ = A₀ * 10⁵. Para encontrar cuántas veces es más intenso, dividimos las amplitudes: A₇ / A₅ = (A₀ * 10⁷) / (A₀ * 10⁵) = 10⁽⁷⁻⁵⁾ = 10² = 100. Es 100 veces más intenso.'
          },
          {
            id: 'paes-q19',
            question: 'Si log_b(5) = a, entonces log_b(125) es:',
            options: [
                { text: 'a³', isCorrect: false },
                { text: 'a + 3', isCorrect: false },
                { text: '3a', isCorrect: true },
                { text: 'a/3', isCorrect: false },
                { text: '125a', isCorrect: false },
            ],
            explanation: 'Podemos escribir 125 como 5³. Entonces, log_b(125) = log_b(5³). Usando la propiedad de la potencia, esto es igual a 3 * log_b(5). Como sabemos que log_b(5) = a, el resultado es 3a.'
          },
          {
            id: 'paes-q20',
            question: '¿Qué valor resulta de la expresión (log₃(27) * log(100)) / (log₂(8))?',
            options: [
                { text: '1', isCorrect: false },
                { text: '2', isCorrect: true },
                { text: '3', isCorrect: false },
                { text: '4', isCorrect: false },
                { text: '6', isCorrect: false },
            ],
            explanation: 'Calculamos cada logaritmo: log₃(27) = 3. log(100) = 2. log₂(8) = 3. Sustituyendo los valores en la expresión: (3 * 2) / 3 = 6 / 3 = 2.'
          }
        ]
      }
    ]
  }
];
