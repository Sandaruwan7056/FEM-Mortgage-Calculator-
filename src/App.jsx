import Form from "./components/Form";
import Results from "./components/Results";
import ShowResults from "./components/ShowResults";
import { useState } from "react";

function App() {
  const [results, setResults] = useState("");
  const [term , setTerm] = useState("");
  const [total, setTotal]=useState("");
 


  return (
    <>
      <main className="flex justify-center items-center  md:px-4 min-h-[100vh] ">
        <section className="grid  max-sm:gap-8 md:grid-cols-2 max-w-[900px]  bg-Neutral-White shadow-md rounded-2xl ">
          <Form setResults={setResults}
                setTerm={setTerm}
                term={term}
                results={results}
                setTotal={setTotal} />
          <section className="bg-Neutral-900 px-8 flex flex-col justify-center items-center md:rounded-2xl py-8 md:rounded-l-none md:rounded-bl-6xl ">
            {results === '' ? <ShowResults /> : <Results results={results}  Total={total} />}
          </section>
        </section>
      </main>
    </>
  );
}

export default App;
