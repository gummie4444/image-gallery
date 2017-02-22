import * as types from '../types';

/*
 * Message store for global messages, i.e. Network messages / Redirect messages
 * that need to be communicated on the page itself. Ideally
 * messages/notifications should appear within the component to give the user
 * more context. - My 2 cents.
 */
export default function isCreateImageModalOpen(state = false, action = {}) {
  switch (action.type) {
    case types.OPEN_CREATE_IMAGE_MODAL:
      return true;
    case types.CLOSE_CREATE_IMAGE_MODAL:
      return false;
    default:
      return state;
  }
}
