const CHANGE_ACTIVE_PANEL = 'CHANGE_ACTIVE_PANEL';
function changeActivePanel(activePanel) {
  return {
    type: CHANGE_ACTIVE_PANEL,
    payload: {
      activePanel,
    },
  };
}

export {
  CHANGE_ACTIVE_PANEL,
  changeActivePanel,
};
