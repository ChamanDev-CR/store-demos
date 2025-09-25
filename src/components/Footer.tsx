// Simple footer displayed at the end of each page
export default function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-4 mt-4">
      <div className="container">
        <p className="mb-0">&copy; {new Date().getFullYear()} GPTestStore. Store simulation site for Grupo Pampa.</p>
      </div>
    </footer>
  );
}
