import styled from 'styled-components';
import {Button} from '@material-ui/core';

export const PopperContentWrapper = styled.div`
  max-width: 400px;
  min-width: 200px;
  overflow: auto;
  text-align: left;
  padding: 14px;
  user-select: none;
  background-color: ${(props) => props.theme.primary.dark};
  color: ${(props) => props.theme.primary.contrastText};
  border-radius: 8px;
`;

export const ContentTitle = styled.div`
  font-size: calc(8px + 1vmin);
  min-width: max-content;
`;

export const ContentText = styled.div`
  font-size: calc(10px + 0.6vmin) !important;
  line-height: 1.5em;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const ContentBody = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  max-height: 320px;
  min-height: 20px;
  overflow-y: auto;
`;

export const ContentFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const StyledPopperButton = styled(Button)`
  margin-left: 8px !important;
`;

export const DownloadLinksHolder = styled.div``;

export const StyledDownloadLink = styled.a`
  min-width: max-content;
  line-height: 1.5em;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: ${(props) => props.theme.secondary.light};
`;
