import store from "../redux/store";

import { resetServer } from "../redux/reducers/serverSlice";
import { resetPlayer } from "../redux/reducers/playerSlice";
import { history } from "../components/routing";

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
 * Deodes the object players in a server
 * and returns an array of the players
 * @param {*} array object in server
 */

export function decodeFirebaseArray(array) {
	return Object.entries(array).map(entry => entry[1])
}

export function resetAndLeave() {
  /* const navigate = useNavigate() */
  store.dispatch(resetServer())
  store.dispatch(resetPlayer())
  history.push("/")
}