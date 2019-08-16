import React, { PureComponent } from 'react';

class Header extends PureComponent {

  static defaultProps = {
    text: 'TK Header',
  }

  render() {
    return (
      <h1>{this.props.text}</h1>
    );
  }

}

export default Header;
