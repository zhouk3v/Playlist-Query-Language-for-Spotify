import React, { useEffect, useState } from "react";
import Parser from "../parser/parser";
import QueryResults from "./QueryResults";
import localforage from "localforage";
import "./css/Editor.css";

const Editor = ({ logout }) => {
  const [query, setQuery] = useState("");
  const [queryType, setQueryType] = useState("");
  const [result, setResult] = useState({
    items: [],
    url: null,
  });
  const [loading, setLoading] = useState("");

  const parser = new Parser();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading("Loading");
    const queryAST = parser.parseInput(query);
    const queryResult = await queryAST.execute();
    setLoading("");
    setQueryType(queryAST.type);
    setResult(queryResult);
  };

  useEffect(() => {
    const clearCache = async () => {
      await localforage.clear();
      console.log("cache reset");
    };
    clearCache();
  }, []);

  return (
    <div className="editor">
      <div className="header">
        <div>{loading}</div>
        <button onClick={logout}>Logout</button>
      </div>
      <QueryResults type={queryType} results={result}></QueryResults>
      <form className="form" onSubmit={handleSubmit}>
        <textarea className="query-textbox" onChange={handleChange} />
        <div>
          <button className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Editor;
