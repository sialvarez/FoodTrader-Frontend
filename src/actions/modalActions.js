import {
  PUBLICATION_MODAL,
  SHOWED_PUBLICATION,
} from './types';

export const handlePublicationModal = (show_publication) => (
  {
    type: PUBLICATION_MODAL,
    payload: show_publication,
  }
);

export const showedPublicationAction = (showed_publication) => (
  {
    type: SHOWED_PUBLICATION,
    payload: showed_publication,
  }
);
