const fetchData = async ({
  before = null,
  send,
  after = null,
  onError = null,
} = {}) => {
  if (!send) return;
  let res;
  before && before();
  try {
    res = await send();
  } catch (e) {
    onError && onError(e);
  }
  after && after(res);
};
export default fetchData;
