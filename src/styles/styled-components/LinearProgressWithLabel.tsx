import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1em;
`;

const ProgressWrapper = styled.div`
  width: 100%;
  margin-right: 1em;
  flex-grow: 1;
  --progress-color: ${(props) => props.theme.secondary.light};
  progress {
    width: 100%;
    color: var(--progress-color);
  }
  progress[value] {
    /* Reset the default progress */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    height: 12px;
  }
  progress[value]::-moz-progress-bar {
    background-color: var(--progress-color);
  }
  progress::-webkit-progress-value {
    border-radius: 4px;
    background-color: var(--progress-color);
  }
  progress::-webkit-progress-bar {
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
  }
`;

const LabelWrapper = styled.div`
  width: 44px;
  color: ${(props) => props.theme.secondary.light};
`;

const LinearProgressWithLabel = (props: {progress: number}) => {
  return (
    <Wrapper>
      <ProgressWrapper>
        <progress max="100" value={props.progress} />
      </ProgressWrapper>
      <LabelWrapper>{`${props.progress}%`}</LabelWrapper>
    </Wrapper>
  );
};

export default LinearProgressWithLabel;
