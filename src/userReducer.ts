interface IUserProps {
  message: string;
  name: string;
  avatar_url: string;
  login: string;
  bio: string;
  created_at: Date;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  twitter_username: string;
  blog: string;
  html_url: string;
}

interface IStateProps {
  loading: Boolean;
  user: IUserProps | null;
  error: Boolean;
}

interface IActionProps {
  type: string;
  payload: IUserProps | null;
}

const INITIAL_STATE = {
  loading: false,
  user: null,
  error: false,
};

const userReducer = (state: IStateProps, action: IActionProps) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        loading: true,
        error: false,
        user: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case "FETCH_FAIL":
      return {
        loading: false,
        error: true,
        user: null,
      };
    case "RESET_USER":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { INITIAL_STATE, userReducer };
