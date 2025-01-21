import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../../pages/types";

type Props = {
  notes: Note[];
};
const Layout = ({ notes }: Props) => {
  //url'deki İD'yi al
  const { id } = useParams();
  // notes dizisindeki elemanı al
  const found = notes.find((i) => i.id === id);

  // bulamazsak anasayfaya yönlendir
  if (!found) return <Navigate to="/" />;

  // parent route içerisinde alt route'u renderla
  // note verisini alt route'a gönder

  return <Outlet context={found} />;
};

export default Layout;
