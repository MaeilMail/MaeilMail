import styled from 'styled-components';

const LetterWrapper = styled.ul`
  overflow: hidden;
  position: relative;
  margin: 200px 1rem 2rem 1rem;
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  gap: 1.5rem;
`;

const Letter = styled.li`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 1rem;
  box-sizing: border-box;
  padding: 1rem;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LetterHeader = styled.div`
  display: flex;
  justify-content: flex-end;

  & > img {
    width: 3rem;
  }
`;

const LetterContent = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.25rem;
  height: 6.25rem;
  color: #4f4f4f;
`;

const LetterFooter = styled.div`
  display: flex;
  flex-direction: column;
`;

const Writer = styled.p`
  font-size: 1.25rem;
  margin: 0.75rem 0;
  font-weight: bold;
`;

const Date = styled.p`
  font-size: 1rem;
  color: #828282;
`;
export {
  LetterWrapper,
  Letter,
  LetterHeader,
  LetterContent,
  LetterFooter,
  Writer,
  Date,
};
