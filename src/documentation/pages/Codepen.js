import React, { useEffect, useState } from "react";
import Editor from "../components/Editor";
import "../../shared/components/Style.css";
const Codepen = ({ givenHtml }) => {
  var beautify_html = require('js-beautify').html
  const [html, setHtml] = useState(`${beautify_html(givenHtml, { indent_size: 2 })}`);
  const [srcDoc, setSrcDoc] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
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
