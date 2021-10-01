import styled from '@emotion/styled';

export const FormModal = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;
export const Form = styled.form`
  position: absolute;
  padding: 16px 24px;
  border-radius: 6px;
  left: 50%;
  top: 50%;
  width: 1200px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 1;
`;
