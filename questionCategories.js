// Categorías de preguntas para el juego Scrabble

// Preguntas de Teoría de Conjuntos
const CONJUNTOS_QUESTIONS = [
    {
        question: "¿Cuál de las siguientes notaciones representa el conjunto de los números enteros?",
        options: ["Q", "R", "N", "Z"],
        correct: 3
    },
    {
        question: "Dado el conjunto P={x∈N∣x<5}, ¿cuáles son los elementos de P?",
        options: ["{1,2,3,4}", "{0,1,2,3,4,5}", "{0,1,2,3,4}", "{1,2,3,4,5}"],
        correct: 0
    },
    {
        question: "Si el conjunto M={x∣x es una letra en la palabra matematicas} ¿cuántos elementos tiene M?",
        options: ["8", "7", "10", "11"],
        correct: 0
    },
    {
        question: "Se dice que la **unión** de conjuntos es **conmutativa**. ¿Qué significa esto?",
        options: [
            "La unión de un conjunto consigo mismo es el mismo conjunto.",
            "(A∪B)∪C=A∪(B∪C)",
            "A∪B=B∪A",
            "La unión de un conjunto con el conjunto vacío es el mismo conjunto."
        ],
        correct: 2
    },
    {
        question: "En el contexto de la \"unión\" de conjuntos, ¿cuál es el elemento neutro?",
        options: [
            "No existe elemento neutro.",
            "El conjunto universal (U)",
            "El conjunto vacío (∅)",
            "El mismo conjunto A (A)"
        ],
        correct: 2
    },
    {
        question: "Se define la operación a∗b=a+b+1 en el conjunto de los números enteros. ¿Es esta una ley de composición interna?",
        options: [
            "Sí, porque la suma de enteros siempre es un entero, y sumar 1 mantiene el resultado como un entero.",
            "No, porque el número 1 no está definido en la operación.",
            "No, porque el resultado puede ser un número fraccionario.",
            "Sí, solo si los números son positivos."
        ],
        correct: 0
    },
    {
        question: "¿Cuál es el elemento simétrico o inverso para la multiplicación de 3/4?",
        options: ["−3/4", "4/3", "3", "1"],
        correct: 1
    },
    {
        question: "En el conjunto de las matrices 2x2, ¿es la suma una ley de composición interna?",
        options: [
            "No, porque el resultado puede no ser una matriz.",
            "Solo si las matrices tienen números enteros.",
            "Sí, porque el resultado de sumar dos matrices 2x2 es otra matriz 2x2.",
            "No, porque la suma de matrices solo funciona para matrices cuadradas."
        ],
        correct: 2
    },
    {
        question: "Si una operación \"∗\" es asociativa, ¿qué significa esto?",
        options: [
            "a∗b=b∗a",
            "a∗a´=e. Donde \"a´\" es el elemento simetrico",
            "a∗e=a. Donde \"e\" es el elemento neutro",
            "(a∗b)∗c=a∗(b∗c)"
        ],
        correct: 3
    },
    {
        question: "En el conjunto de los números pares, ¿la operación de multiplicación es una ley de composición interna?",
        options: ["No", "Sí", "Solo si los números son positivos", "Solo si uno de los números es 0"],
        correct: 1
    },
    {
        question: "Si una operación es conmutativa, ¿necesariamente es asociativa?",
        options: [
            "No, Las propiedades son independientes",
            "Solo si se usa el elemento neutro",
            "Solo si los números son enteros",
            "Sí, siempre"
        ],
        correct: 0
    },
    {
        question: "En el conjunto de las matrices 2x2, ¿la operación de multiplicación es conmutativa?",
        options: [
            "Solo si las matrices son iguales",
            "Sí, siempre",
            "La multiplicación de matrices no es conmutativa para todas las matrices",
            "Solo si las matrices son singulares"
        ],
        correct: 2
    },
    {
        question: "En el conjunto de los números enteros. ¿La operación a∗b=a+b+a es asociativa?",
        options: ["No", "Solo si el resultado es cero", "Sí", "Solo si los números son positivos"],
        correct: 0
    },
    {
        question: "En el conjunto de las matrices 2x2, ¿la operación de multiplicación tiene un elemento neutro?",
        options: [
            "Sí, la matriz identidad",
            "No, en general",
            "Sí, la matriz nula",
            "Sí, pero solo para matrices no singulares"
        ],
        correct: 0
    },
    {
        question: "Considera el conjunto S={e,a,b} con la operación \"∗\" definida por la tabla de Cayley. Si (a∗b)∗a=e y a∗(b∗a)=b entonces la operación:",
        options: ["No es asociativa", "Es conmutativa", "No se puede resolver", "No tiene elemento neutro"],
        correct: 0
    }
];

// Preguntas de Estructuras Algebraicas y Homomorfismos
const GRUPOS_QUESTIONS = [
    {
        question: "¿Qué es un homomorfismo?",
        options: [
            "Una función entre dos estructuras algebraicas que preserva la operación.",
            "Una función que asocia elementos entre dos conjuntos diferentes.",
            "Una función que tiene un elemento neutro.",
            "Una operación que es asociativa y conmutativa."
        ],
        correct: 0
    },
    {
        question: "Si una operación \"∗\" en un conjunto G tiene un elemento neutro y cada elemento tiene un simétrico, ¿es (G,∗) necesariamente un grupo?",
        options: [
            "Sí, siempre.",
            "No, se necesita que el elemento neutro sea 0.",
            "No, se necesita también que sea una ley de composición interna y asociativa.",
            "Sí, además es conmutativa."
        ],
        correct: 2
    },
    {
        question: "¿Qué es un semigrupo?",
        options: [
            "Un conjunto con una operación interna que es conmutativa.",
            "Un conjunto con una operación interna que tiene un elemento neutro.",
            "Un conjunto con una operación interna donde cada elemento tiene un simétrico.",
            "Un conjunto con una operación interna que es asociativa."
        ],
        correct: 3
    },
    {
        question: "El conjunto de los números naturales incluyendo el 0, con la operación de suma (+), ¿es un monoide?",
        options: ["No", "Tal vez", "Sí", "Ni idea"],
        correct: 2
    },
    {
        question: "Si una función es un homomorfismo y es biyectiva, se le llama:",
        options: ["Endomorfismo", "Monomorfismo", "Epimorfismo", "Isomorfismo"],
        correct: 3
    },
    {
        question: "Si el núcleo (kernel) de un homomorfismo f es el elemento neutro del conjunto de partida, ¿qué se puede decir de la función?",
        options: [
            "Es inyectiva",
            "La imagen es el conjunto de partida",
            "No es un homomorfismo",
            "Es sobreyectiva"
        ],
        correct: 0
    },
    {
        question: "Una función f es un \"epimorfismo\" si es un homomorfismo y es:",
        options: ["Biyectiva", "Inyectiva", "Discreta", "Sobreyectiva"],
        correct: 3
    },
    {
        question: "La imagen (image) de un homomorfismo es:",
        options: [
            "El conjunto de partida.",
            "El conjunto de llegada.",
            "Es el conjunto de todos los valores de salida posibles",
            "El conjunto de todos los elementos del dominio que se mapean al neutro del codominio."
        ],
        correct: 2
    },
    {
        question: "¿Cuál es la propiedad que distingue a un **monoide** de un **semigrupo**?",
        options: [
            "La existencia de un elemento simétrico para cada elemento.",
            "La asociatividad de la operación.",
            "La conmutatividad de la operación.",
            "La existencia de un elemento neutro."
        ],
        correct: 3
    },
    {
        question: "En el contexto de las estructuras algebraicas, ¿cuál es la propiedad que diferencia a un **grupo abeliano** de un **grupo**?",
        options: [
            "La asociatividad de la operación.",
            "La existencia del elemento neutro.",
            "La existencia de un elemento simétrico para cada elemento.",
            "La conmutatividad de la operación."
        ],
        correct: 3
    },
    {
        question: "Si una función f:G→H es un homomorfismo y su núcleo (kernel) es el elemento neutro del grupo G, entonces la función es:",
        options: [
            "Sobreyectiva (epimorfismo).",
            "Un endomorfismo.",
            "Inyectiva (monomorfismo).",
            "Biyectiva (isomorfismo)."
        ],
        correct: 2
    },
    {
        question: "¿Qué diferencia a la estructura algebraica (Z,+) de un grupo abeliano?",
        options: [
            "No todos los elementos tienen un elemento simétrico.",
            "Ninguna. La estructura es un grupo abeliano.",
            "La operación no es asociativa.",
            "La operación no es conmutativa."
        ],
        correct: 1
    },
    {
        question: "¿Qué tipo de homomorfismo es una función que tiene un núcleo trivial y su imagen es igual al codominio?",
        options: ["Isomorfismo", "Endomorfismo", "Monomorfismo", "Epimorfismo"],
        correct: 0
    },
    {
        question: "Una función que es un homomorfismo de un grupo en sí mismo (f:G→G) se conoce como:",
        options: ["Isomorfismo", "Monomorfismo", "Endomorfismo", "Epimorfismo"],
        correct: 2
    },
    {
        question: "Si una función f:G→H es un homomorfismo **inyectivo**, ¿qué se puede decir de su núcleo?",
        options: [
            "Es un subgrupo de G",
            "Es el conjunto vacío",
            "Es el elemento neutro del grupo G",
            "Es el conjunto completo G"
        ],
        correct: 2
    }
];

// Preguntas de Permutación y Combinatoria (las originales)
const PERMUTACIONES_QUESTIONS = [
    {
        question: "¿Cuál es la principal diferencia entre una permutación y una combinación?",
        options: [
            "La permutación se calcula con factoriales y la combinación con logaritmos.",
            "En una permutación, el orden de los elementos importa, mientras que en una combinación, el orden no importa.",
            "La permutación se aplica a conjuntos de números y la combinación a conjuntos de letras.",
            "La permutación se usa para eventos independientes y la combinación para eventos dependientes."
        ],
        correct: 1
    },
    {
        question: "¿Cuántos números de 4 dígitos se pueden formar con los dígitos 1, 2, 3, 4, 5, 6, si no se permite la repetición de los dígitos?",
        options: ["24", "1296", "15", "360"],
        correct: 3
    },
    {
        question: "En una caja hay 5 canicas rojas y 4 azules. ¿De cuántas maneras se pueden elegir 3 canicas de la caja?",
        options: ["3!=6", "53×43=8000", "C(9,3)= 84", "504"],
        correct: 2
    },
    {
        question: "¿De cuántas maneras se pueden sentar 5 personas en una fila de 5 asientos?",
        options: ["C(5,5)=1", "P(5,5)=120", "55=3125", "5×4=20"],
        correct: 1
    },
    {
        question: "Una moneda se lanza 3 veces. ¿Cuántos resultados posibles hay si el orden de los resultados importa?",
        options: ["P(3,3)=6", "C(3,2)=3", "3!=6", "2^3=8"],
        correct: 3
    },
    {
        question: "¿Cuál es el valor del término C(n,0)?",
        options: ["C(n,n)", "0", "1", "n"],
        correct: 2
    },
    {
        question: "Un estudiante puede elegir un deporte de una lista de 5 deportes de equipo o un deporte de una lista de 3 deportes individuales. ¿Cuántos deportes distintos puede elegir en total?",
        options: ["5×3=15", "5+3=8", "P(8,2)=56", "C(8,2)=28"],
        correct: 1
    },
    {
        question: "En una carrera hay 8 corredores. ¿De cuántas maneras se pueden otorgar los tres primeros lugares (oro, plata y bronce)?",
        options: ["83=512", "P(8,3)=336", "C(8,3)=56", "3!=6"],
        correct: 1
    },
    {
        question: "Se lanza un dado de 6 caras y se lanza una moneda al aire. ¿Cuántos resultados posibles se pueden obtener?",
        options: ["C(6,2)=15", "6×2=12", "P(8,2)=56", "6+2=8"],
        correct: 1
    },
    {
        question: "¿Cuál es la diferencia entre el Principio de la Suma y el Principio de la Multiplicación?",
        options: [
            "El Principio de la Suma se usa solo con números enteros, y la multiplicación con números racionales.",
            "La suma se relaciona con combinaciones, y la multiplicación con permutaciones.",
            "La suma se aplica a eventos mutuamente excluyentes ('o'), y la multiplicación a eventos consecutivos e independientes ('y').",
            "La suma se usa para ordenar elementos, y la multiplicación para seleccionarlos."
        ],
        correct: 2
    },
    {
        question: "Se desea formar un comité de 4 personas de un grupo de 10 hombres y 8 mujeres. ¿De cuántas maneras se puede formar el comité si debe haber exactamente 2 hombres y 2 mujeres?",
        options: ["P(10,2)×P(8,2)=90×56=5040", "C(18,4)=3060", "C(10,2)+C(8,2)=45+28=73", "C(10,2)×C(8,2)=45×28=1260"],
        correct: 3
    },
    {
        question: "En una caja hay 5 libros de matemáticas y 4 de física. ¿De cuántas maneras se puede elegir un libro de matemáticas o un libro de física?",
        options: ["P(9,2)=72", "5+4=9", "C(9,2)=36", "5×4=20"],
        correct: 1
    },
    {
        question: "¿De cuántas maneras pueden 6 personas sentarse alrededor de una mesa circular?",
        options: ["P(6,6)=720", "6×5=30", "C(6,6)=1", "(6−1)!=5!=120"],
        correct: 3
    },
    {
        question: "¿Qué propiedad define a un problema como una **permutación**?",
        options: [
            "Se seleccionan todos los elementos del conjunto y el orden no importa.",
            "El orden de los elementos seleccionados es crucial.",
            "Se seleccionan subconjuntos de elementos sin considerar su posición.",
            "Los elementos se pueden repetir infinitamente en cada selección."
        ],
        correct: 1
    },
    {
        question: "En la fórmula de la permutación P(n,k), ¿qué representa 'n' y qué representa 'k'?",
        options: [
            "n es el total de elementos y k es el número de elementos repetidos.",
            "n es el número de elementos seleccionados y k es el total de elementos.",
            "n es el total de elementos y k es el número de elementos que se toman para formar el arreglo.",
            "n es el número de combinaciones y k es el número de permutaciones."
        ],
        correct: 2
    },
    {
        question: "¿Cuál es la interpretación de C(n,n)?",
        options: [
            "El número de arreglos posibles de los elementos de un conjunto de 'n'.",
            "Cero, porque no tiene sentido elegir 'n' de 'n' elementos.",
            "El número de maneras de elegir 'n' elementos de un conjunto de 'n', sin que el orden importe.",
            "El número de maneras de elegir 'n' elementos de un conjunto de 'n', donde el orden importa."
        ],
        correct: 2
    },
    {
        question: "¿Qué representa la expresión Pk​(n) en el contexto de las permutaciones con repetición?",
        options: [
            "El número de formas de elegir 'k' elementos de un conjunto de 'n' elementos con repetición, donde el orden no importa.",
            "El número de permutaciones con elementos idénticos.",
            "El número de permutaciones de 'n' elementos de un conjunto de 'k' elementos.",
            "El número de arreglos ordenados de 'k' elementos tomados de un conjunto de 'n' elementos, donde la repetición está permitida."
        ],
        correct: 3
    },
    {
        question: "¿Cómo se define conceptualmente el **Principio de la Multiplicación**?",
        options: [
            "Como el producto de las opciones de una secuencia de eventos que ocurren de forma consecutiva o conjunta.",
            "Como la suma de las opciones de eventos que no pueden ocurrir al mismo tiempo.",
            "Como un método para encontrar la probabilidad de un evento.",
            "Como una manera de encontrar las permutaciones de un conjunto de elementos."
        ],
        correct: 0
    },
    {
        question: "Una **permutación circular** se diferencia de una lineal porque:",
        options: [
            "El punto de partida o de referencia no importa, lo que reduce las posibles ordenaciones.",
            "Se utiliza una fórmula diferente que no incluye factoriales.",
            "El número de permutaciones es mayor en la forma circular.",
            "En las circulares, se permite la repetición de elementos."
        ],
        correct: 0
    },
    {
        question: "¿Qué es la 'selección con reemplazo' en un problema de conteo?",
        options: [
            "Una selección donde se extraen todos los elementos del conjunto.",
            "Una vez que un elemento es seleccionado, no puede ser seleccionado de nuevo.",
            "Una selección donde el orden de los elementos no importa.",
            "El elemento seleccionado se devuelve al conjunto original antes de la siguiente selección."
        ],
        correct: 3
    },
    {
        question: "¿De cuántas maneras se puede elegir un equipo de 3 jugadores de un total de 10, si hay un capitán predeterminado?",
        options: ["C(10,3)", "P(9,2)", "C(9,2)", "P(10,3)"],
        correct: 2
    }
];

// Exportar las categorías
window.QUESTION_CATEGORIES = {
    'conjuntos': {
        name: 'Teoría de Conjuntos',
        questions: CONJUNTOS_QUESTIONS
    },
    'grupos': {
        name: 'Estructuras Algebraicas y Homomorfismos',
        questions: GRUPOS_QUESTIONS
    },
    'permutaciones': {
        name: 'Permutación y Combinatoria',
        questions: PERMUTACIONES_QUESTIONS
    }
};
