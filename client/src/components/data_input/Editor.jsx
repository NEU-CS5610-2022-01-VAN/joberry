import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const editorOptions = {
  buttonList: [
    ["print"],
    ["undo", "redo", "fontSize", "formatBlock"],
    ["bold", "underline", "italic", "strike"],
    ["subscript", "superscript", "removeFormat"],
    ["fontColor", "hiliteColor", "lineHeight", "align"],
    ["outdent", "indent", "list", "table"],
    ["horizontalRule", "codeView", "showBlocks"],
    ["link", "image", "video"],
    ["fullScreen", "preview"],
  ],
  //   imageAccept: ".jpg, .png",
  //   imageUploadSizeLimit: "5000000",
  //   videoFileInput: true,
};

const Editor = (props) => {
  return (
    <SunEditor
      setOptions={editorOptions}
      {...props}
      placeholder="Please enter your content here"
      height="59vh"
    />
  );
};

export default Editor;
