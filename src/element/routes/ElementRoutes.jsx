import { Navigate, Route, Routes } from "react-router-dom";
import { ListPage } from "../pages/ListPage";

export const ElementRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={ <ListPage /> } />
      <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )

}
