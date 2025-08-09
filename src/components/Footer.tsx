// Simple footer shown at the bottom of every page
export default function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-4 mt-4">
      <div className="container">
        <p className="mb-0">&copy; {new Date().getFullYear()} GPTestStore. Sitio de simulacion de una store para Grupo Pampa.</p>
      </div>
    </footer>
  );
}
