import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "./authCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  SetUser: "[Set User] Action",

  SetCompanyData: "[Set Company Data] Action",
  SetCommercialReferences: "[Set Comercial References] Action",
  SetAgentResidentDetails: "[Set Agent Resident Details] Action",
  SetShareholderData: "[Set Shareholder Data] Action",
  SetAgentDocument: "[Set Agent Document] Action",
  SetAgentRegulatory: "[Set Agent Regulatory] Action",

  SetUserInfo: "[Set User Info] Action",
  SetLaborData: "[Set Labor Data] Action",
  SetPersonalReference: "[Set Personal Reference] Action",
  SetConsumerRegulatory: "[Set Consumer Regulatory] Action",
  SetConsumerDocument: "[Set Consumer Document] Action",
};

const initialAuthState = {
  user: undefined,
  authToken: undefined,

  company_data: undefined,
  commercial_references_data: undefined,
  agent_resident_details: undefined,
  shareholder_data: undefined,
  agent_document: undefined,
  agent_regulatory: undefined,

  user_info: undefined,
  labor_data: undefined,
  personal_reference: undefined,
  consumer_regulatory: undefined,
  consumer_document: undefined
};

export const reducer = persistReducer(
  { storage, key: "v713-demo1-auth", whitelist: ["user", "authToken", "company_data", "commercial_references_data", "shareholder_data", "agent_resident_details", "agent_regulatory", "user_info", "labor_data", "personal_reference"]  },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken, user } = action.payload;
        return { authToken, user };
      }
      case actionTypes.Register: {
        const { authToken, user } = action.payload;
        return { authToken, user };
      }
      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }
      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user };
      }
      case actionTypes.SetUser: {
        const { user } = action.payload;
        return { ...state, user };
      }
      case actionTypes.SetCompanyData: {
        const { company_data } = action.payload;
        return { ...state, company_data };
      }
      case actionTypes.SetCommercialReferences: {
        const { commercial_references_data } = action.payload;
        return { ...state, commercial_references_data };
      }
      case actionTypes.SetAgentResidentDetails: {
        const { agent_resident_details } = action.payload;
        return { ...state, agent_resident_details };
      }
      case actionTypes.SetShareholderData: {
        const { shareholder_data } = action.payload;
        return { ...state, shareholder_data };
      }
      case actionTypes.SetAgentDocument: {
        const { agent_document } = action.payload;
        return { ...state, agent_document };
      }
      case actionTypes.SetAgentRegulatory: {
        const { agent_regulatory } = action.payload;
        return { ...state, agent_regulatory };
      }
      case actionTypes.SetUserInfo: {
        const { user_info } = action.payload;
        return { ...state, user_info };
      }
      case actionTypes.SetLaborData: {
        const { labor_data } = action.payload;
        return { ...state, labor_data };
      }
      case actionTypes.SetPersonalReference: {
        const { personal_reference } = action.payload;
        return { ...state, personal_reference };
      }
      case actionTypes.SetConsumerDocument: {
        const { consumer_document } = action.payload;
        return { ...state, consumer_document };
      }
      case actionTypes.SetConsumerRegulatory: {
        const { consumer_regulatory } = action.payload;
        return { ...state, consumer_regulatory };
      }
      default:
        return state;
    }
  }
);

export const actions = {
  login: (authToken, user) => ({ type: actionTypes.Login, payload: { authToken, user } }),
  register: (authToken, user) => ({
    type: actionTypes.Register,
    payload: { authToken, user }
  }),
  logout: () => ({ type: actionTypes.Logout }),
  // requestUser: (user) => ({
  //   type: actionTypes.UserRequested,
  //   payload: { user },
  // }),
  fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),
  setUser: (user) => ({ type: actionTypes.SetUser, payload: { user } }),
  setCompanyData: (company_data) => ({ type: actionTypes.SetCompanyData, payload: { company_data } }),
  setCommercialReferences: (commercial_references_data) => ({ type: actionTypes.SetCommercialReferences, payload: { commercial_references_data } }),
  setAgentResidentDetails: (agent_resident_details) => ({ type: actionTypes.SetAgentResidentDetails, payload: { agent_resident_details } }),
  setShareholderData: (shareholder_data) => ({ type: actionTypes.SetShareholderData, payload: { shareholder_data } }),
  setAgentDocument: (agent_document) => ({ type: actionTypes.SetAgentDocument, payload: { agent_document } }),
  setAgentRegulatory: (agent_regulatory) => ({ type: actionTypes.SetAgentRegulatory, payload: { agent_regulatory } }),

  setUserInfo: (user_info) => ({ type: actionTypes.SetUserInfo, payload: { user_info } }),
  setLaborData: (labor_data) => ({ type: actionTypes.SetLaborData, payload: { labor_data } }),
  setConsumerDocument: (consumer_document) => ({ type: actionTypes.SetConsumerDocument, payload: { consumer_document } }),
  setPersonalReference: (personal_reference) => ({ type: actionTypes.SetPersonalReference, payload: { personal_reference } }),
  setConsumerRegulatory: (consumer_regulatory) => ({ type: actionTypes.SetConsumerRegulatory, payload: { consumer_regulatory } }),

};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    // yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    console.log('register');
    // yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    console.log('getUserByToken')
    const { data: user } = yield getUserByToken();

    yield put(actions.fulfillUser(user));
  });
}
