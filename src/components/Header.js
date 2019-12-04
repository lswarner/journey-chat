import React from 'react'
import {
  Container,
  Menu
} from 'semantic-ui-react'

const Header = (props) => (
  <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          {props.title}
        </Menu.Item>
      </Container>
    </Menu>
  </div>
)


export default Header;
