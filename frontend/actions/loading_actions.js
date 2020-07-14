export const START_LOADING = "START_LOADING";
export const STOP_LOADING = "STOP_LOADING";

export const displayLoading = loading => ({
  type: START_LOADING,
  loading,
});

export const stopLoading = () => ({
  type: STOP_LOADING
});