import { BrowserRouter as Router, Route, Routes ,Link} from "react-router-dom";
import OnboardPage from "./pages/OnboardPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import SignUpPage from "./pages/SignUpPage";
import PostDoctorPage from "./pages/PostDoctorPage";



const App = () => {

  


  return(
    <Router>
    <Routes>
      <Route path="/" element={<OnboardPage />} />
      <Route path="/loginpage" element={<LoginPage />} />
      <Route path="/dashboardpage" element={<DashboardPage/>}/>
      <Route path="/signuppage" element={<SignUpPage/>}/>
      <Route path="/postdoctorpage" element={<PostDoctorPage/>}/>
      

    </Routes>
  </Router>
  )
};

export default App;
