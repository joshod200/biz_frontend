import React from "react";
import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw } from 'draft-js';

export default ({ name, onChange, ...others }) => {

  const [editorState, setEditorState] = React.useState();

  const handleSetEditorState = (state) => {
    setEditorState(state);
    var value = convertToRaw(state.getCurrentContent());
    value = JSON.stringify(value);
    console.log(value);
    onChange({ target: { name, value } })
  }

  return(
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={handleSetEditorState}
      toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'history'],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      {
        ...others
      }
    />
  )
}
