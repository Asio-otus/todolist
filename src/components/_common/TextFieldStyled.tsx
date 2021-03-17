import styled from "styled-components";
import {TextField} from "@material-ui/core";

export const TextFieldStyled = styled(TextField)<any>`
  border-radius: 4px;
  background-color: #fff;
  box-shadow: ${({theme}) => theme.effect.shadow};

  & label.Mui-focused {
    color: ${({theme}) => theme.color.main};
  }

  & .MuiOutlinedInput-root {

    &:hover fieldset {
      border-color: ${({theme}) => theme.color.main};
    }

    &.Mui-focused fieldset {
      border-color: ${({theme}) => theme.color.main};
    }
  }

  & .MuiInput-underline:before {
    &:hover {
      border-bottom-color: ${({theme}) => theme.color.main};
    }
  }

  & .MuiInput-underline:after {
    border-bottom-color: ${({theme}) => theme.color.main};
  }
`