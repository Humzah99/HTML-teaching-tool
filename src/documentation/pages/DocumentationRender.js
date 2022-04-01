import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneForest } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../../shared/components/Style.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Codepen from "./Codepen";

const DocumentationRender = () => {
  var beautify_html = require("js-beautify").html;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDocumentation, setLoadedDocumentation] = useState();
  const [showCodePenModal, setShowCodePenModal] = useState(false);
  const [currentCodeString, setCurrentCodeString] = useState("");
  const documentationId = useParams().docId;

  useEffect(() => {
    const fetchDocumentation = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/documentation/${documentationId}`
        );
        setLoadedDocumentation(responseData.documentation);
      } catch (err) {}
    };
    fetchDocumentation();
  }, [sendRequest, documentationId]);

  const showCodePenHandler = codeString => {
    setShowCodePenModal(true);
    setCurrentCodeString(codeString);
  };

  const cancelCodePenHandler = () => {
    setShowCodePenModal(false);
  };

  return (
    <>
      <Modal show={!!error} onClear={clearError}>
        <Modal.Header className="modal-header">
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">{error}</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={clearError}>
            Ok
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showCodePenModal}
        onCancel={cancelCodePenHandler}
        className="codepen"
      >
        <Modal.Body className="modal-body codepen-modal">
          <Codepen givenHtml={`${currentCodeString}`} />
        </Modal.Body>
        <Modal.Footer className="modal-footer codepen-modal">
          <button className="btn btn-secondary" onClick={cancelCodePenHandler}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      {isLoading && (
        <div className="overlay">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}

      {!isLoading && loadedDocumentation && (
        <div className="container mb-5">
          <div className="documentation-title mt-4">
            <h2>HTML {loadedDocumentation.title}</h2>
          </div>
          <div className="hr-line mb-2"></div>
          {loadedDocumentation.content.map((information, index) => {
            return (
              <div className="tutorial-section" key={index}>
                <h3 className="mb-4">{information.subTitle}</h3>
                {loadedDocumentation.content[index].information.map(
                  (information, index) => {
                    return (
                      <p
                        className="content h6 mb-3"
                        key={index}
                        style={{ fontSize: "15px" }}
                      >
                        {information}
                      </p>
                    );
                  }
                )}
                {loadedDocumentation.content[index].codeString != null && (
                  <>
                    <SyntaxHighlighter
                      language="javascript"
                      style={duotoneForest}
                      key={index}
                      className="mt-4"
                    >
                      {beautify_html(information.codeString, {
                        indent_size: 2
                      })}
                    </SyntaxHighlighter>
                    <button
                      className="btn try-it-yourself-btn mb-2"
                      onClick={() => showCodePenHandler(information.codeString)}
                    >
                      Try it yourself
                    </button>
                  </>
                )}
                <div className="hr-line mt-3 mb-5"></div>
              </div>
            );
          })}
          {loadedDocumentation.chapterSummary.length > 0 && (
            <>
              <div className="chapter-summary-title mb-3">
                <h4>Chapter Summary</h4>
              </div>
              {loadedDocumentation.chapterSummary.map((summary, index) => {
                return (
                  <p
                    className="content h6"
                    key={index}
                    style={{ fontSize: "15px" }}
                  >
                    {summary}
                  </p>
                );
              })}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default DocumentationRender;
