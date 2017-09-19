import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import localStorage from '../services/localStorage';

const loadState = () => localStorage.get('state') || undefined;
const saveState = (stateData) => localStorage.set('state', stateData);

const getMiddlewares = (appHistory) => {
  const routingMiddleware = routerMiddleware(appHistory);

  if (process.env.NODE_ENV !== 'production') {
    const reduxLoggerMiddleware = createLogger();
    let getDebugSessionKey = function () {
      // By default we try to read the key from ?debug_session=<key> in the address bar
      const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
      return (matches && matches.length) ? matches[1] : null;
    };

    return compose(
      applyMiddleware(thunkMiddleware, routingMiddleware, reduxLoggerMiddleware),

      window.devToolsExtension ?
        window.devToolsExtension() :
        require('../helpers/DevTools').default.instrument(),

      // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
      persistState(getDebugSessionKey())
    );
  }

  return compose(applyMiddleware(thunkMiddleware, routingMiddleware));
};

export default function configureStore(appHistory) {
  const persistedState = loadState();

  const store = createStore(
    rootReducer,
    persistedState,
    getMiddlewares(appHistory));

  store.subscribe(() => {
    saveState({
      users: store.getState().users,
    });
  });

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}
