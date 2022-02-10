import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneForest } from "react-syntax-highlighter/dist/esm/styles/prism";
import Codepen from "../pages/Codepen";
//import TutorialModal from "../TutorialModal/TutorialModal.jsx";

const DocumentationContent = ({ content, language }) => {
  const [showCodePen, setShowCodePen] = useState(false);
  return (

    <div className="tutorial-section">
      <p className="content">{content.content}</p>
        <SyntaxHighlighter language="javascript" style={duotoneForest}>
          {content.codeString}
        </SyntaxHighlighter>
        <button
          className="btn"
          onClick={() => setShowCodePen((prevShowCodePen) => !prevShowCodePen)}
        >
          Try it yourself
        </button>
    </div>
  );
};

export default DocumentationContent;
