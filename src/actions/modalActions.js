import {
  PUBLICATION_MODAL,
} from './types';

export const handlePublicationModal = (show_publication) => (
  {
    type: PUBLICATION_MODAL,
    payload: show_publication,
  }
);
