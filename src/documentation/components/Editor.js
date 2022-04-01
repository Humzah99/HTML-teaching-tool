import React, { useState } from "react";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import { Controlled as ControlledEditor } from "react-codemirror2";
require("../../shared/components/CodeMirror/autorefresh.ext");
const Editor = props => {
  // var beautify_html = require('js-beautify').html
  const { language, displayName, value, onChange } = props;

  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  // var formattedHtml = beautify_html(value, { indent_size: 2 });
  
  return (
    <div className="editor-container">
      <div className="editor-title">{displayName}</div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: "material",
          lineNumbers: true,
          autofocus: true,
          autoRefresh: { force: true }
        }}
      />
    </div>
  );
};

export default Editor;
