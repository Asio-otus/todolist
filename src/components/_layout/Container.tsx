import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  // The margin left is negative to compensate for the positive margin of the ToDoListCard... 
  margin-left: -25px;
  
  padding: 0 60px;
  
  height: 100%;
`