
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen p-10">
        <h1 className="text-4xl font-black">
          Welcome to StyleFit AI
        </h1>

        <p className="mt-3 text-gray-500">
          Discover your style. Try it with AI.
        </p>
      </main>
    </>
  );
}

export default App;
