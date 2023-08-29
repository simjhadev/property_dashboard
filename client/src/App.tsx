import {
  AuthBindings,
  Authenticated,
  Refine,
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
 
} from "@refinedev/mui";

import { ThemedLayoutV2 } from "./components/themedLayout";

//import { ThemedTitleV2 } from "./components/themedLayout/title";

import { ThemedHeaderV2 } from "./components/themedLayout/header";

import { ThemedSiderV2 } from "./components/themedLayout/sider";

import {
  DashboardOutlined,
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
} from '@mui/icons-material';

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios, { AxiosRequestConfig } from "axios";
import { CredentialResponse } from "./interfaces/google";

import {
  AgentProfile,
    Agents,
    AllProperties,
    CreateProperty,
    PropertyDetails,
    EditProperty,
    Home,
    MyProfile,
    EditMyProfile,
} from "pages/pages_index";

import { Login } from "pages/login";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { parseJwt } from "utils/parse-jwt";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      //Save user to mongoDB
      //development - http://localhost:8080/api/v1/users
      //production - 'https://property-dashboard-h4t0.onrender.com/api/v1/users'
      if(profileObj){
        const response = await fetch('https://property-dashboard-h4t0.onrender.com/api/v1/users',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
          })
        })
        const data = await response.json();

        if(response.status === 200){
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id,
            })
          );

          localStorage.setItem("token", `${credential}`);

          return {
            success: true,
            redirectTo: "/",
          };
        }
        else{
          return {
            success: false,
          }
        }

      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      {/*<GitHubBanner />*/}
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            {/** https://api.fake-rest.refine.dev 
             *  development - http://localhost:8080/api/v1
             *  production - https://property-dashboard-h4t0.onrender.com/api/v1
            */}
            <Refine
              dataProvider={{
                default: dataProvider("https://property-dashboard-h4t0.onrender.com/api/v1"),
                
              }}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              
              resources={[
                {
                  name: "dashboard",
                  list: "/",
                  meta: {
                    icon: <DashboardOutlined />
                  },
                },
                {
                  name: "property",
                  list: "/property",
                  show: "/property/show/:id",
                  create: "/property/create",
                  edit: "/property/edit/:id",
                  meta: {
                    canDelete: true,
                    icon: <VillaOutlined />
                  },
                },
                {
                  name: "agents",
                  list: "/agents",
                  show: "/agents/show/:id",
                  meta: {
                    icon: <PeopleAltOutlined />
                  },
                },
                {
                  name: "my-profile",
                  
                  list: "/my-profile",
                  edit: "/my-profile/edit/:id",
                  meta: {
                    label: "My Profile",
                    icon: <AccountCircleOutlined />,
                  }
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "D8Zg2A-0BUKvb-kmpveY",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2 
                        Header={() => <ThemedHeaderV2 />}
                        
                        Sider={() => <ThemedSiderV2 />}
                        >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<Home />}
                  />
                  <Route path="/property">
                    <Route index element={<AllProperties />} />
                    <Route path="create" element={<CreateProperty />} />
                    <Route path="edit/:id" element={<EditProperty />} />
                    <Route path="show/:id" element={<PropertyDetails />} />
                  </Route>
                  <Route path="/agents">
                    <Route index element={<Agents />} />
                    <Route path="show/:id" element={<AgentProfile />} />
                  </Route>
                  <Route path="/home">
                    <Route index element={<Home />} />
                  </Route>
                
                  <Route path="/my-profile">
                    <Route index element={<MyProfile />} />
                    <Route path="edit/:id" element={<EditMyProfile />} />
                  </Route>
                  
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
