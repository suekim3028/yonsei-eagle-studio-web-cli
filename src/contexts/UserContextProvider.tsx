'use client';
import { photoApis, userApis } from '@apis';
import { TokenStorage } from '@storage';

import { PhotoTypes, UserTypes } from '@types';
import { commonHooks } from '@web-core';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

const UserContext = createContext<UserContextValue | null>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<
    | {
        user: UserTypes.Info | null;
        request: PhotoTypes.Request | null;
      }
    | 'loading'
  >('loading');

  const initialRef = useRef(false);

  const refreshUserInfo = useCallback(async () => {
    const { isError: userError, data: user } = await userApis.getUserInfo();
    if (userError) {
      setValue({ request: null, user: null });
      console.log('[UserContext] user error.');
      return;
    }

    if (user.requestStatus === 'NOT_REQUESTED') {
      setValue({ request: null, user });
      console.log('[UserContext] user found. no request.');

      return;
    }

    const { isError: requestError, data: request } =
      await photoApis.getPhotoRequest();
    if (requestError) {
      console.log('[UserContext] request error. set user only.');

      setValue({ request: null, user });
      return;
    }

    console.log('[UserContext] user and request found.');

    setValue({ user, request });
  }, []);

  commonHooks.useAsyncEffect(async () => {
    if (initialRef.current) return;
    initialRef.current = true;
    console.log('[UserContext] load initial user');

    const token = TokenStorage.get();
    if (!token?.accessToken) {
      console.log('[UserContext] No token. Do not get user.');
      setValue({ user: null, request: null });
      return;
    }
    await refreshUserInfo();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: value === 'loading' ? 'loading' : value.user,
        request: value === 'loading' ? 'loading' : value.request,
        refreshUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error();
  return context;
};

type UserContextValue = {
  user: 'loading' | UserTypes.Info | null;
  request: 'loading' | PhotoTypes.Request | null;
  refreshUserInfo: () => Promise<void>;
};

export default UserContextProvider;
