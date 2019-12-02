import React from 'react'
import {
  Button,
  Form,
  TextArea
} from 'semantic-ui-react'

const ComposeMessage = () => {
  const [text, setText]= React.useState('');

  const handleTextChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setText(value);
  }

  return (
    <>
      <Form>
        <TextArea
          rows={4}
          onChange={handleTextChange}
          value={text}
        />
      </Form>
      <Button onClick={()=>{}} secondary>Post Message</Button>
    </>
  )
}

export default React.memo(ComposeMessage)
