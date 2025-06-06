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
import TakeListeningLayout from "./layouts/TakeListeningLayout";
import Listening from "./pages/listening";
import ListeningExamInfo from "./pages/listening/_components/info";
import MyInfo from "./pages/MyInfo";
import SchedulePage from "./pages/schedulePage";
import Introduction from "./pages/Introduction";
import Writing from "./pages/Writing";
import LayoutTestFourSkills from "./layouts/LayoutTestFourSkills";
import SimulatedExamRoom from "./pages/SimulatedExamRoom";
import SpeakingPage from "./pages/Speaking";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/introduction" element={<Introduction />} />
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
        <Route
          path="/listening/take-test"
          element={
            <PrivateRoute
              element={
                <TakeListeningLayout>
                  <Listening />
                </TakeListeningLayout>
              }
            />
          }
        />
        <Route
          path="/listening/take-test/intro"
          element={
            <PrivateRoute
              element={
                <TakeListeningLayout>
                  <ListeningExamInfo />
                </TakeListeningLayout>
              }
            />
          }
        />
        <Route
          path="/my-info"
          element={
            <PrivateRoute
              element={
                <Layouts>
                  <MyInfo />
                </Layouts>
              }
            />
          }
        />
        <Route
          path="/video"
          element={
            <PrivateRoute
              element={
                <Layouts>
                  <SchedulePage />
                </Layouts>
              }
            />
          }
        />
        {/* PHÒNG THI THỰC TẾ ẢO */}
        <Route
          path="/simulated-exam-room/writing"
          element={
            <PrivateRoute
              element={
                <LayoutTestFourSkills>
                  <Writing />
                </LayoutTestFourSkills>
              }
            />
          }
        />
        <Route
          path="/simulated-exam-room/speaking"
          element={<PrivateRoute element={<SpeakingPage />} />}
        />
        <Route
          path="/simulated-exam-room/listening/take-test/intro"
          element={
            <PrivateRoute
              element={
                <TakeListeningLayout>
                  <ListeningExamInfo />
                </TakeListeningLayout>
              }
            />
          }
        />
        <Route
          path="/simulated-exam-room/listening"
          element={
            <PrivateRoute
              element={
                <TakeListeningLayout>
                  <Listening />
                </TakeListeningLayout>
              }
            />
          }
        />
        <Route
          path="/simulated-exam-room/reading"
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
          path="/simulated-exam-room/reading/intro"
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
          path="/simulated-exam-room"
          element={
            <PrivateRoute
              element={
                <Layouts>
                  <SimulatedExamRoom />
                </Layouts>
              }
            />
          }
        />
        {/* <Route
          path="/simulated-exam-room/review-listening"
          element={
            <PrivateRoute
              element={
                <TakeListeningLayout>
                  <Listening />
                </TakeListeningLayout>
              }
            />
          }
        /> */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
