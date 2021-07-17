import styled from 'styled-components';
import {ToastContainer, ToastContainerProps} from 'react-toastify';

export const WrappedToastContainer = ({className, ...rest}: ToastContainerProps & {className?: string}) => (
  <div className={className}>
    <ToastContainer {...rest} />
  </div>
);

// https://fkhadra.github.io/react-toastify/how-to-style
export default styled(WrappedToastContainer).attrs({
  // custom props
})`
  .Toastify__toast-container {
    width: max-content;
    max-width: 80vw;
  }
  .Toastify__toast-body {
    font-family: 'Roboto', sans-serif;
    white-space: pre-line;
    min-width: 200px;
  }
`;
