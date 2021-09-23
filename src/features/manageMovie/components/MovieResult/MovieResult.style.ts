import styled from '@emotion/styled';

export const MovieResult = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;
export const MovieSearch = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0 10px;
  border: 1px solid #ccc;
  padding: 4px;
  background-color: #fff;
  border-radius: 20px;
  min-width: 400px;

  @media (max-width: 768px) {
    min-width: 300px;
  }
`;
export const MovieSearchInput = styled.input`
  width: 100%;
  padding: 4px 16px 4px 4px;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
`;
export const MovieSearchBtn = styled.button`
  padding: 8px 0px 8px 8px;
  border-radius: 50%;
  img {
    width: 20px;
    height: 20px;
  }
`;
export const MovieAdd = styled.button`
  display: flex;
  align-items: center;
  gap: 0 10px;
  background-color: #000;
  color: #fff;
  border-radius: 10px;
  padding: 4px 24px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.5s ease;

  @media (max-width: 768px) {
    padding: 4px 10px;
  }

  svg {
    width: 16px;
    height: 16px;
    fill: #fff;
    transition: all 0.5s ease;
  }

  &:hover {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;

    svg {
      fill: #000;
      transition: all 0.5s ease;
    }

    transition: all 0.5s ease;
  }
`;
export const MovieFormAdd = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;
export const MovieForm = styled.form`
  position: absolute;
  padding: 16px 24px;
  border-radius: 6px;
  left: 50%;
  top: 50%;
  width: 500px;
  transform: translate(-50%, -50%);
  background-color: #fff;
`;
export const MovieFormTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 20px;

  svg {
    cursor: pointer;
    width: 14px;
    height: 14px;
  }
`;
export const MovieFormListBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0 10px;
  margin-top: 40px;
`;
export const MovieFormBtn = styled.button`
  background-color: #edf2f7;
  border-radius: 6px;
  color: #1a202c;
  font-weight: 500;
  line-height: 19.2px;
  padding: 12px 16px;
  opacity: 0.8;

  &:last-child {
    color: #fff;
    background-color: #0bc5ea;
  }

  &:hover {
    opacity: 1;
  }
`;
