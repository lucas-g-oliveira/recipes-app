import React from 'react';
import { render } from '@testing-library/react';
import ContextProvider from '../context/ContextProvider';

export default function RenderWithProvider(children) {
  return (
    render(
      <ContextProvider>
        { children }
      </ContextProvider>,
    )
  );
}
