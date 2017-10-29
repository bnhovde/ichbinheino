/**
*
* Checkbox
*
*
*/
import React, { PropTypes } from 'react';
import styled from 'styled-components';
import settings from '../../utilities/settings';

const {
  colors,
} = settings;

const Input = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
`;

const Indicator = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  background-color: ${props => props.checked ? colors.secondary : colors.bg};
`;

function Checkbox(props) {
  return (
    <div>
      <Input
        type="checkbox"
        tabIndex="-1"
        {...props}
      />
      <Indicator checked={props.checked} />
    </div>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string,
  ]).isRequired,
};

export default Checkbox;
