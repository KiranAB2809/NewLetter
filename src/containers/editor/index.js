import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

class CreateBlog extends Component {

    andleEditorChange = (e) => {
        console.log('Content was updated:', e.target.getContent());
      }

    render() {
        return (
            <div>
                <form>
                    <Editor
                        initialValue="<p>This is the initial content of the editor</p>"
                        init={{
                            plugins: 'link image code',
                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                        }}
                        onChange={this.handleEditorChange}
                    />
                </form>
            </div>
        )
    }
}

export default CreateBlog;