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

export const MovieFormTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 20px;

  img {
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
  margin-top: 20px;
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
export const MovieForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px 10px;
`;
export const MovieFormController = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: calc(100% / 4 - 10px);
  :last-child {
    width: 50%;
  }
`;
export const MovieFormController2 = styled.div`
  width: calc(50% - 10px);
`;
export const MovieListVideo = styled.div`
  height: 450px;
  overflow-x: hidden;
  border-radius: 6px;

  iframe {
    width: 100%;
    height: 350px;
    border-radius: 6px;
    margin-top: 8px;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #eec0c6;
    background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #fad0c4;
    background-image: linear-gradient(315deg, #fad0c4 0%, #f1a7f1 74%);
    border-radius: 6px;
  }
`;
export const Iframe = styled.iframe``;
export const MovieGetVideo = styled.button`
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
  margin: 0 auto;
  width: 100%;
`;
export const FormVideo = styled.div`
  position: relative;
`;
export const VideoBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  color: #fff;
  background-color: #ff5c58;
  padding: 8px 12px;
  border-radius: 6px;
  margin-top: 8px;
`;
export const VideoBtn2 = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  background-color: #9d9d9d;
`;
