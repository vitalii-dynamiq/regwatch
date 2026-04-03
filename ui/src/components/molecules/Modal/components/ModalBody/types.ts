import type { ModalProps } from '../../types';

export interface ModalBodyProps extends Pick<ModalProps, 'title' | 'description' | 'children' | 'actions'> {}
