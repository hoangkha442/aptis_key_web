import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layouts from "./layouts";
import HomePage from "./pages";
import NotFoundPage from "./pages/NotFoundPage";
import Courses from "./pages/Courses";
import LoginForm from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Reading from "./pages/Reading";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TakeTestLayouts from "./layouts/TakeTestLayouts";
import ExamInfo from "./pages/Reading/_components/info";
import ReadingReview from "./pages/Reading/_components/review";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <PrivateRoute
              element={
                <Layouts>
                  <HomePage />
                </Layouts>
              }
            />
          }
        />
        <Route
          path="/courses"
          element={
            <PrivateRoute
              element={
                <Layouts>
                  <Courses />
                </Layouts>
              }
            />
          }
        />

        <Route
          path="/reading/take-test"
          element={
            <PrivateRoute
              element={
                <TakeTestLayouts>
                  <DndProvider backend={HTML5Backend}>
                    <Reading />
                  </DndProvider>
                </TakeTestLayouts>
              }
            />
          }
        />
        <Route
          path="/reading/take-test/intro"
          element={
            <PrivateRoute
              element={
                <TakeTestLayouts>
                  <ExamInfo />
                </TakeTestLayouts>
              }
            />
          }
        />
        <Route
          path="/reading/take-test/review"
          element={
            <PrivateRoute
              element={
                <TakeTestLayouts>
                  <ReadingReview />
                </TakeTestLayouts>
              }
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
