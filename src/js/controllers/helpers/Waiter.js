import WAITER_STATES from '../../constants/WaiterStates';

export default async function Waiter(state) {
  const spinner = document.getElementById('spinner');
  if (state === WAITER_STATES.HIDE) {
    return Promise.resolve(spinner.classList.add('hidden'));
  }
  return Promise.resolve(spinner.classList.remove('hidden'));
}
