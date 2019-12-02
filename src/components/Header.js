import React from 'react'
import {
  Container,
  Menu
} from 'semantic-ui-react'

const Header = (props) => (
  <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header onClick={()=>console.log('home')}>
          {props.title}
        </Menu.Item>
      </Container>
    </Menu>
  </div>
)


export default Header;
