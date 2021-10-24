export const OPEN_MODAL = 'OPEN_MODAL';

export const setOpenModal = openModal => dispatch => {
  dispatch({
    type: OPEN_MODAL,
    payload: openModal,
  });
};
