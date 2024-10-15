const cache = {};

// Almacenar preguntas y respuestas en cache
exports.store = (id, preguntas) => {
  cache[id] = preguntas;
};

// Recuperar preguntas del cache
exports.retrieve = (id) => {
  return cache[id];
};

// Eliminar preguntas del cache
exports.remove = (id) => {
  delete cache[id];
};