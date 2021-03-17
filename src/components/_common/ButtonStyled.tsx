import styled from "styled-components";
import {Button} from "@material-ui/core";

export const ButtonStyled = styled(Button)<any>`
  box-shadow: ${({theme}) => theme.effect.shadow};
  border: none;
  
  &.MuiButton-label {
    color: #fff;
  }

  &.MuiButton-outlined {
    color: ${({theme}) => theme.color.secondary};

    &:hover {
      color: #fff;
      background-color: ${({theme}) => theme.color.main};
    }
  }

  &.MuiButton-contained {
    color: #fff;
    background-color: ${({theme}) => theme.color.main};

    &:hover {
      background-color: ${({theme}) => theme.color.mainAlt};
    }
  }`