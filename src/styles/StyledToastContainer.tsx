import React from 'react';
import styled from 'styled-components';
import {ToastContainer, ToastContainerProps} from 'react-toastify';

export const WrappedToastContainer = ({className, ...rest}: ToastContainerProps & {className?: string}) => (
  <div className={className}>
    <ToastContainer {...rest} />
  </div>
);

export default styled(WrappedToastContainer).attrs({
  // custom props
})`
  .Toastify__toast-container {
    width: max-content;
    max-width: 100vw;
  }
  /* .Toastify__toast {
  } */
  /* .Toastify__toast-body {
  } */
  /* .Toastify__toast--info {
  } */
  /* .Toastify__toast--success {
  }
  .Toastify__toast--error {
  }
  .Toastify__toast--warning {
  }
  .Toastify__progress-bar {
  } */
  /* .Toastify__close-button {
  } */
  /* .Toastify__toast-container--top-center {
  } */
`;
