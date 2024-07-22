import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'


const Blog = () => {
 const [value, setValue] = useState('');
 var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean']
 ];

 const modules = {
  toolbar: toolbarOptions
 }
 return (
  <>
   <div className='mx-0 my-0 my-md-5 mx-md-5'>

    <Form>
     <h5 className="mb-3">Create Post</h5>
     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Control type="text" placeholder="Enter Blog Title" />
     </Form.Group>
    </Form>


    <ReactQuill className='quill-edit' modules={modules} theme="snow" value={value} onChange={setValue} />
    <div className='mt-3 text-end'>
     <Button className="action-btn">Submit</Button>
    </div>
   </div>

  </>
 )


}

export default Blog