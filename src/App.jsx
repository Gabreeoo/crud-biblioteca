import { useState, useEffect, useMemo } from "react";
import { loadBooks, saveBooks } from "./data/initialBooks";
import { BookCard } from "./components/BookCard";
import { BookModal } from "./components/BookModal";
import { BookDetailModal } from "./components/BookDetailModal";
import "./App.css";

function App() {
  const [books, setBooks] = useState(loadBooks);
  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    saveBooks(books);
  }, [books]);

  const filteredBooks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return books.filter((book) => {
      const matchesQuery =
        !query ||
        book.titulo.toLowerCase().includes(query) ||
        book.autor.toLowerCase().includes(query) ||
        (book.genero && book.genero.toLowerCase().includes(query));
      const matchesRating = book.nota >= minRating;
      return matchesQuery && matchesRating;
    });
  }, [books, search, minRating]);

  const averageRating = useMemo(() => {
    if (books.length === 0) return "0.0";
    const sum = books.reduce((acc, b) => acc + Number(b.nota || 0), 0);
    return (sum / books.length).toFixed(1);
  }, [books]);

  const handleOpenCreate = () => {
    setEditingBook(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (book) => {
    setSelectedBook(null);
    setEditingBook(book);
    setIsFormOpen(true);
  };

  const handleSaveBook = (bookData) => {
    if (editingBook) {
      setBooks((prev) =>
        prev.map((b) =>
          b.id === editingBook.id ? { ...bookData, id: editingBook.id } : b,
        ),
      );
    } else {
      const newBook = {
        ...bookData,
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      };
      setBooks((prev) => [newBook, ...prev]);
    }
    setIsFormOpen(false);
    setEditingBook(null);
  };

  const handleDeleteBook = (book) => {
    setBooks((prev) => prev.filter((b) => b.id !== book.id));
    if (selectedBook?.id === book.id) {
      setSelectedBook(null);
    }
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <div>
              <h1>Minha Biblioteca</h1>
              <p>Seus livros criados, capas e avaliações pessoais</p>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleOpenCreate}
          >
            + Adicionar Livro
          </button>
        </div>
      </header>

      <main className="main-content">
        <section className="toolbar" aria-label="Filtros e estatísticas">
          <div className="stats-pills">
            <div className="stat-pill">
              <strong>{books.length}</strong>
              <span>{books.length === 1 ? "livro" : "livros"}</span>
            </div>
            <div className="stat-pill">
              <strong>★ {averageRating}</strong>
              <span>média geral</span>
            </div>
          </div>

          <div className="filters">
            <input
              type="search"
              className="search-input"
              placeholder="Buscar por título, autor ou gênero..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar livros"
            />

            <select
              className="rating-filter"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              aria-label="Filtrar por nota mínima"
            >
              <option value={0}>Todas as notas</option>
              <option value={5}>★ 5 estrelas</option>
              <option value={4}>★ 4+ estrelas</option>
              <option value={3}>★ 3+ estrelas</option>
              <option value={2}>★ 2+ estrelas</option>
              <option value={1}>★ 1+ estrela</option>
            </select>
          </div>
        </section>

        {filteredBooks.length === 0 ? (
          <div className="empty-state">
            <p className="empty-icon" aria-hidden="true">
              📖
            </p>
            <h2>
              {books.length === 0
                ? "Sua biblioteca ainda está vazia"
                : "Nenhum livro encontrado"}
            </h2>
            <p>
              {books.length === 0
                ? "Adicione seu primeiro livro com capa e nota para começar sua coleção."
                : "Tente ajustar os termos de busca ou o filtro de estrelas."}
            </p>
            {books.length === 0 && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleOpenCreate}
              >
                + Adicionar Primeiro Livro
              </button>
            )}
          </div>
        ) : (
          <section className="books-grid" aria-label="Lista de livros">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onSelect={setSelectedBook}
                onEdit={handleOpenEdit}
                onDelete={handleDeleteBook}
              />
            ))}
          </section>
        )}
      </main>

      <BookModal
        key={editingBook ? editingBook.id : isFormOpen ? "new" : "closed"}
        isOpen={isFormOpen}
        initialBook={editingBook}
        onClose={() => {
          setIsFormOpen(false);
          setEditingBook(null);
        }}
        onSave={handleSaveBook}
      />

      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onEdit={handleOpenEdit}
        onDelete={handleDeleteBook}
      />
    </div>
  );
}

export default App;
