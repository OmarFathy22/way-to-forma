/* eslint-disable no-undef */
import Root from "./components/Root";
import Exercises from "./components/Exercises/index";
import Home from "./components/Home/index";
import NotFound from './components/Error404'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import ONE from './components/exerciseDetails/ONE'
// import Omar from './components/Omar.tsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
       <Route path="exercises" element={<Exercises />} />
       <Route path="/" element={<Home />} />
       <Route path="*"  element={<NotFound/>} />
    </Route>
  )
);



function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;