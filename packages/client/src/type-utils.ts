import type { StyledComponentProps as StyledProps } from 'styled-components';

export type StyledComponentProps<
  ElementName extends string, PropTypes extends object
> = StyledProps<ElementName, any, PropTypes, never >;
