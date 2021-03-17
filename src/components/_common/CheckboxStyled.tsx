import styled from "styled-components";
import {Checkbox} from "@material-ui/core";

export const CheckboxStyled = styled(Checkbox)<any>`
  &.MuiCheckbox-root {
    color: ${({theme}) => theme.color.main};
  }
  &.MuiCheckbox-colorSecondary.Mui-checked {
    color: ${({theme}) => theme.color.main};
  }
`