export const STORAGE_KEY = 'biblioteca_virtual_livros_v1';

export const initialBooks = [
  {
    id: '1',
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    genero: 'Romance Clássico',
    nota: 5,
    capa: 'https://covers.openlibrary.org/b/isbn/9788535910663-L.jpg',
    sinopse:
      'Bentinho narra suas memórias da juventude e o ciúme avassalador por Capitu, deixando no ar o maior enigma da literatura brasileira.',
  },
  {
    id: '2',
    titulo: 'O Pequeno Príncipe',
    autor: 'Antoine de Saint-Exupéry',
    genero: 'Fábula',
    nota: 5,
    capa: 'https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg',
    sinopse:
      'Um piloto perdido no deserto encontra um jovem príncipe vindo de um pequeno asteroide, revelando lições sobre amizade, amor e essência.',
  },
  {
    id: '3',
    titulo: '1984',
    autor: 'George Orwell',
    genero: 'Ficção Distópica',
    nota: 4,
    capa: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
    sinopse:
      'Em um regime totalitário onde o Grande Irmão tudo vê, Winston Smith tenta preservar sua memória e liberdade de pensamento.',
  },
  {
    id: '4',
    titulo: 'A Hora da Estrela',
    autor: 'Clarice Lispector',
    genero: 'Ficção Literária',
    nota: 4,
    capa: 'https://covers.openlibrary.org/b/isbn/9788520933343-L.jpg',
    sinopse:
      'A história de Macabéa, uma datilógrafa alagoana no Rio de Janeiro, contada pelo narrador Rodrigo S.M. com profunda sensibilidade.',
  },
];

export function loadBooks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialBooks;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : initialBooks;
  } catch {
    return initialBooks;
  }
}

export function saveBooks(books) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch {
    // Ignore storage quota errors
  }
}
