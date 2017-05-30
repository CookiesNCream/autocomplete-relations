/* By Linda Lim | Autocomplete Widget | BSD 3-Clause License | https://github.com/CookiesNCream/autocomplete-widget */
import 'draft-js/dist/Draft.css'; /* For editor and placeholder text styling */
import './App.css'; /* For customized styles */
import 'draft-js-mention-plugin/lib/plugin.css'; // eslint-disable-line import/no-unresolved

import React from 'react'; /* Imports the React component */
import { EditorState } from 'draft-js'; /* To display content created, selection done, and any other action taken in the Editor */
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor'; // eslint-disable-line import/no-unresolved /* To render snapshots of data, accepts placeholder text, enables spell check, and allows the use of editor plugins amongst many other types of data */

import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'; // eslint-disable-line import/no-unresolved
import editorStyles from './editorStyles.css';
import relations from './relations';

const text = '<>relation I am having a blast! This is so awesome and cool! :D';

export default class App extends React.Component { /* The App React component is rendered via index.js */
  
  constructor(props) {
    super(props);

    this.mentionPlugin = createMentionPlugin({
      entityMutability: 'IMMUTABLE',
      mentionTrigger: '<',
      mentionPrefix: '<>', 
    });

  }

  state = {
    editorState: createEditorStateWithText(text), /* To create an editorState object to contain the Editor data */
    suggestions: relations,
  };
  
  onChange = (editorState) => { /* To enable new data to be updated in the editorState object as typing occurs */
    this.setState({
      editorState,
    });
  };

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, relations), /* Triggers a match string */
    });
  };

  onAddMention = () => { /* Obtains the selected item */
    
  };

  focus = () => { /* To place the cursor in the Editor */
    this.editor.focus();
  };

  render() { /* To render the Editor as a React div component to HTML */
    const { MentionSuggestions } = this.mentionPlugin;
    const plugins = [this.mentionPlugin];

    return (
      <div className="App">
        
        <div className="App-header">
                    
          <h2>Autocomplete using Draft.js</h2>
        
        </div>
        
        <p className="App-intro">
          
          I can help you type less. All you need to do is to type &#60; and select the rest from a list.
        
        </p>
    
        <div className="editor" onClick={this.focus}>
          <Editor
            editorState={this.state.editorState} /* Snapshots of data */ 
            onChange={this.onChange} /* Updates of snapshots of data */ 
            plugins={plugins} /* Parses plugins to the Editor */
            ref={(element) => { this.editor = element; }} /* To refer to the Editor in order to implement methods for it */
            placeholder="Start typing" /* To display initial text when the Editor is empty */
            spellCheck = { true } /* To show that spell check is enabled and spelling mistakes are highlighted */
          />
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.state.suggestions}
            onAddMention={this.onAddMention}
          />
        </div>
      </div>
    );
  }
}