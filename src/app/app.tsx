import Logos from "components/atoms/logos";
import Card from "components/organisms/card";
import Button from "components/atoms/button";
import CopyButton from "components/molecules/copy-button";

function App() {
  return (
    <main>
      <header className="pt-16 z-10 relative max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <h3 className="text-2xl sm:text-4xl leading-none font-bold tracking-tight text-purple-200">
          <span className="text-[gold] opacity-75">Vital</span> @ Vite Template
        </h3>
        <h1 className="text-6xl lg:text-7xl leading-none font-extrabold tracking-tight mb-8 sm:mb-10 text-purple-400">
          React + TypeScript + Tailwind
        </h1>
        <p className="max-w-screen-lg text-lg sm:text-xl  text-gray-300 font-medium mb-10 sm:mb-11">
          Bootssdafasdfsdfaster than ever. Comes with:{" "}
          <code className="font-mono text-blue-500 font-bold">CSS-Modules</code>
          , <code className="font-mono text-blue-500 font-bold">Jest</code>,{" "}
          <code className="font-mono text-blue-500 font-bold">Husky</code>,{" "}
          <code className="font-mono text-blue-500 font-bold">Commit-lint</code>
          , <code className="font-mono text-blue-500 font-bold">ESLint</code>,{" "}
          and{" "}
          <code className="font-mono text-blue-500 font-bold">
            Atomic organization for components
          </code>
          . Configured and ready to go.
        </p>
        <div className="absolute top-12 right-12 opacity-10 lg:opacity-50">
          <Logos.Vite className="w-56 h-56" />
        </div>
      </header>
    </main>
  );
}

export default App;
