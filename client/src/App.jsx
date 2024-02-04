import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthLayout from "./layouts/AuthLayout";
import RegisterComponent from "./components/auth/RegisterComponent";
import LoginComponent from "./components/auth/LoginComponent";
import PrivateRoute from "./middleware/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import SnackbarComponent from "./components/helper/SnackbarComponent";
import DashboardComponent from "./components/home/dashboard/DashboardComponent";
import ProfileComponent from "./components/home/profile/ProfileComponent";
import ProfileDetailComponent from "./components/home/profile/ProfileDetailComponent";
import ContentComponent from "./components/home/contents/ContentComponent";
import ContentListComponent from "./components/home/contents/ContentListComponent";
import ContentDetailComponent from "./components/home/contents/ContentDetailComponent";
import AddContentComponent from "./components/home/contents/AddContentComponent";
import DialogComponent from "./components/helper/DialogComponent";
import EditContentComponent from "./components/home/contents/EditContentComponent";

function App() {
  return (
    <>
      <Router>
        <DialogComponent />
        <SnackbarComponent />
        <Routes>
          {/* Auth routes */}
          <Route exact path="/" element={<PrivateRoute />}>
            {/* dashboard */}
            <Route path="/" element={<DashboardLayout />}>
              <Route path="" element={<DashboardComponent />} />

              {/* profile */}
              <Route path="profile" element={<ProfileComponent />}>
                <Route path="" element={<ProfileDetailComponent />} />
              </Route>

              {/* contents */}
              {/* profile */}
              <Route path="content" element={<ContentComponent />}>
                <Route path="" element={<ContentListComponent />} />
                <Route path=":contentId" element={<ContentDetailComponent />} />
                <Route path="add" element={<AddContentComponent />} />
                <Route
                  path=":contentId/edit"
                  element={<EditContentComponent />}
                />
              </Route>
            </Route>
          </Route>

          {/* Non Auth routes */}
          <Route path="/" element={<AuthLayout />}>
            <Route path="register" element={<RegisterComponent />} />
            <Route path="login" element={<LoginComponent />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
