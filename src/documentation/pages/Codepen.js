import React, { useEffect, useState } from "react";
import Editor from "../components/Editor";
import "../../shared/components/Style.css";
import useLocalStorage from "../../shared/hooks/useLocalStorage";
const Codepen = () => {
    const [html, setHtml] = useLocalStorage("html", );
    const[srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
      const timeout = setTimeout(() => {
        setSrcDoc( `
            <html>
                <body>${html}</body>
            <html>`)
      }, 250)

      return () => clearTimeout(timeout)
  }, [html])

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100"
        />
      </div>
    </>
  );
};

export default Codepen;
