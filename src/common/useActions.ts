import { actions as ChatActions } from "../redux_toolkit/reducers/ChatSlice";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { bindActionCreators } from "redux";
import { actions as AppActions } from "../redux_toolkit/reducers/AppSlice";
const rootActions = {
    ...ChatActions,
    ...AppActions,
}
export const useActions = () => {
    let dispath = useDispatch()
    return useMemo(() => {
    return bindActionCreators(rootActions,dispath)
    },[dispath])
}